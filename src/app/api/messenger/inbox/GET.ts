import { getServerUser } from '@/lib/getServerUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';

export interface MessageListItem {
  id: number;
  createdAt: number;
  subject: string;
  body: string;
  read?: boolean;
  receiver: { id: string; username: string | null };
  sender: { id: string; username: string | null };
}

export async function GET() {
  const [user] = await getServerUser();
  if (!user) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  const receivedMessages = (
    await prisma.message.findMany({
      where: { receiverUserId: user.id },
      select: {
        id: true,
        createdAt: true,
        body: true,
        subject: true,
        read: true,
        sender: { select: { id: true, username: true } },
        receiver: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  ).map((m) => ({ ...m, createdAt: m.createdAt.getTime() }));
  return NextResponse.json<MessageListItem[]>(receivedMessages);
}
