import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma/prisma';
import { credentialsAuth } from '@/lib/CredentialsAuthProvider';
import { createUsageEntry, getTodayUsageDuration, updateUsageEntrySignOut } from '@/lib/UsageCap';
import * as page from './pageTypes';

declare module 'next-auth' {
  interface Session {
    user: { id: string; name: string; loginTime: number; usageToday: number; entryId?: number };
  }
}

export default {
  providers: [
    /* GitHub,
                            Facebook,
                            Google, */
    CredentialsProvider({
      name: 'Login with Email And Password',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'myemail@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials /* , _req */) {
        if (typeof credentials.email === 'string') {
          const user = await credentialsAuth(credentials.email);
          if (user) {
            // add signin time to usage and get usage for today until this signin
            const durationToday = await getTodayUsageDuration(user.id);
            if (durationToday < Number(process.env.NEXT_PUBLIC_PER_DAY_USAGE_QUOTA_MS)) {
              const entry = await createUsageEntry(user.id);
              return {
                ...user,
                entryId: entry.id,
                loginTime: entry.loginTime.getTime(),
                usageToday: durationToday,
              };
            }
            return { ...user, loginTime: Date.now(), usageToday: durationToday };
          }
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname, search } = nextUrl;
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = page.isOnAuthPage(pathname);
      const isOnUnprotectedPage = page.isOnUnprotectedPage(pathname);
      const isProtectedPage = !isOnUnprotectedPage;

      if (isOnAuthPage) {
        // Redirect to /feed, if logged in and is on an auth page
        if (isLoggedIn) return NextResponse.redirect(new URL('/feed', nextUrl));
      } else if (isProtectedPage) {
        // Redirect to /login, if not logged in but is on a protected page
        if (!isLoggedIn) {
          const from = encodeURIComponent(pathname + search); // The /login page shall then use this `from` param as a `callbackUrl` upon successful sign in
          return NextResponse.redirect(new URL(`/login?from=${from}`, nextUrl));
        }
      }

      // Don't redirect if on an unprotected page, or if logged in and is on a protected page
      return true;
    },
    session({ token, user, ...rest }) {
      return {
        /**
         * We need to explicitly return the `id` here to make it available to the client
         * when calling `useSession()` as NextAuth does not include the user's id.
         *
         * If you only need to get the `id` of the user in the client, use NextAuth's
         * `useSession()`, but if you need more of user's data, use the `useSessionUserData()`
         * custom hook instead.
         */
        user: {
          id: token.sub!,
          loginTime: token.loginTime,
          usageToday: token.usageToday,
          entryId: token.entryId,
        },
        expires: rest.session.expires,
      };
    },
    async jwt({ token, user }) {
      if (user && 'loginTime' in user && 'usageToday' in user) {
        return {
          ...token,
          loginTime: user.loginTime,
          usageToday: user.usageToday,
          entryId: 'entryId' in user ? user.entryId : undefined,
        };
      }

      return token;
    },
  },
  events: {
    async signOut(message) {
      if (
        'token' in message &&
        message.token &&
        'entryId' in message.token &&
        typeof message.token.entryId === 'number'
      ) {
        await updateUsageEntrySignOut(message.token.entryId);
      }
    },
  },
} satisfies NextAuthConfig;
