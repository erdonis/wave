import prisma from '@/lib/prisma/prisma';

export async function credentialsAuth(email: string) {
  return prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      username: true,
    },
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });
}
