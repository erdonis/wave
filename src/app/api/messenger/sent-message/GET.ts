import { getServerUser } from '@/lib/getServerUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { MessageListItem } from '@/app/api/messenger/inbox/GET';

export async function GET() {
  const [user] = await getServerUser();
  if (!user) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  const sentMessages = (
    await prisma.message.findMany({
      where: { senderUserId: user.id },
      select: {
        id: true,
        createdAt: true,
        subject: true,
        body: true,
        read: true,
        sender: { select: { id: true, username: true } },
        receiver: {
          select: { id: true, username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  ).map((m) => ({ ...m, createdAt: m.createdAt.getTime() }));

  return NextResponse.json<MessageListItem[]>(sentMessages);
}
