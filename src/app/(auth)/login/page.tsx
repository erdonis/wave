import LoginPage from '@/app/(auth)/login/LoginPage';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Login`,
};

export default function Page() {
  return <LoginPage />;
}
