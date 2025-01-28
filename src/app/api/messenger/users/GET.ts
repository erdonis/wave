import { getServerUser } from '@/lib/getServerUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { GetUser } from '@/types/definitions';

export type MessageRecipientUser = Pick<GetUser, 'id' | 'username'>;

export async function GET() {
  const [user] = await getServerUser();
  if (!user) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const res = await prisma.user.findMany({
    select: { id: true, username: true },
    where: { username: { not: null } },
    orderBy: [{ username: 'asc' }],
  });

  // @ts-expect-error already filtering out null usernames at the DB level
  return NextResponse.json<MessageRecipientUser[]>(res);
}
