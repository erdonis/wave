-- CreateTable
CREATE TABLE "UsageLogs" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "loginTime" TIMESTAMP(3) NOT NULL,
    "logoutTime" TIMESTAMP(3),
    "durationMs" INTEGER,

    CONSTRAINT "UsageLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsageLogs" ADD CONSTRAINT "UsageLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
