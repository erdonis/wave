import { getServerUser } from '@/lib/getServerUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';

export async function GET(request: Request, { params }: { params: { messageid: string } }) {
  const [user] = await getServerUser();
  if (!user) return new NextResponse('Unauthorized', { status: 403 });

  const message = await prisma.message.findFirst({
    where: { id: { equals: parseInt(params.messageid, 10) || -1 } },
  });
  if (!message) return new NextResponse('Message not found', { status: 400 });

  if (message.receiverUserId !== user.id) return new NextResponse('Unauthorized', { status: 403 });

  await prisma.message.update({ data: { read: true }, where: { id: message.id } });
  return new NextResponse(null, { status: 200 });
}
