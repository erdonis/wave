import { z } from 'zod';
import prisma from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';

const emailSchema = z.string().trim().email();

export async function POST(request: Request) {
  const params = await request.json();
  const validateEmail = emailSchema.safeParse(params.email);
  if (validateEmail.success) {
    const existingUser = await prisma.user.findFirst({ where: { email: params.email.trim().toLowerCase() } });
    if (existingUser)
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          msg: 'User already exists!',
        }),
        { status: 400 },
      );
    await prisma.user.create({ data: { email: params.email.trim().toLowerCase() } });
    return new NextResponse(undefined, { status: 200 });
  }
  return new NextResponse('Error', { status: 400 });
}
