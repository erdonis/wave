import { getServerUser } from '@/lib/getServerUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';

export interface SendMessagePostParams {
  to: string;
  subject: string;
  body: string;
}

export async function POST(request: Request) {
  const [user] = await getServerUser();

  if (!user) return new NextResponse('Unauthorized', { status: 403 });
  const messageObj: SendMessagePostParams = await request.json();
  const { subject, body, to } = messageObj;

  if (!to) return new NextResponse('Bad Request: to user is required', { status: 400 });
  if (!subject) return new NextResponse('Bad Request: subject is required', { status: 400 });
  if (!body) return new NextResponse('Bad Request: body is required', { status: 400 });

  const toUser = await prisma.user.findFirst({ where: { id: { equals: to } } });
  if (!toUser) return new NextResponse('Bad Request: to user not found', { status: 400 });

  const newMessage = await prisma.message.create({
    data: { senderUserId: user.id, receiverUserId: toUser.id, subject, body },
  });

  await prisma.activity.create({
    data: { type: 'MESSAGE_RECEIVED', sourceId: newMessage.id, sourceUserId: user.id, targetUserId: toUser.id },
  });

  return new NextResponse('Message Sent', { status: 200 });
}
