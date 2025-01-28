// defaults to 2 hours
import prisma from '@/lib/prisma/prisma';

const capMs = Number(process.env.NEXT_PUBLIC_PER_DAY_USAGE_QUOTA_MS ?? (2 * 60 * 60 * 1000).toString());

export async function getTodayUsageDuration(userId: string) {
  const timeNow = new Date();
  const todayDurationRes = await prisma.usageLogs.aggregate({
    _sum: {
      durationMs: true,
    },
    where: {
      userId,
      loginTime: {
        gte: new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate()),
      },
    },
  });

  return todayDurationRes._sum.durationMs ?? 0;
}

export function isWithinUsageCap(loginTime: number, usageToday: number) {
  const usageUntilNow = Date.now() - loginTime + usageToday;
  return usageUntilNow < capMs;
}

export async function createUsageEntry(userId: string) {
  return prisma.usageLogs.create({
    data: {
      userId,
      loginTime: new Date(),
    },
  });
}

export async function updateUsageEntrySignOut(entryId: number) {
  const logoutTime = new Date();
  // get last entry
  const lastEntry = await prisma.usageLogs.findFirst({
    where: { id: entryId },
    orderBy: [{ id: 'desc' }],
  });
  if (lastEntry) {
    await prisma.usageLogs.update({
      data: {
        logoutTime,
        durationMs: logoutTime.getTime() - lastEntry.loginTime.getTime(),
      },
      where: { id: entryId },
    });
  }
}
