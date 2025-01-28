'use client';

import { ThemeSwitch } from '@/components/ui/ThemeSwitch';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MAX_TIME_ALLOWED = Number(process.env.NEXT_PUBLIC_PER_DAY_USAGE_QUOTA_MS ?? (2 * 60 * 60 * 1000).toString()); // defaults to 2 hours

export default function PageHeader({ heading }: { heading: string }) {
  const [timeLeft, setTimeLeft] = useState<number>();
  const { data: session } = useSession();
  useEffect(() => {
    const getTimeLeft = () => {
      if (session) {
        const currentTime = Date.now();
        const spent = currentTime - session.user.loginTime + session.user.usageToday;
        return Math.floor((MAX_TIME_ALLOWED - spent) / 1000);
      }
      return 0;
    };
    const interval = setInterval(() => {
      const timeRemaining = getTimeLeft();
      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
      setTimeLeft(() => getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number | undefined) => {
    if (!seconds) return '00:00:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    // Pad with leading zeroes for consistency
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secs).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-4xl font-bold">{heading}</h1>
      <div className="flex items-center">
        <div className="me-2">{formatTime(timeLeft)}</div>
        <ThemeSwitch />
      </div>
    </div>
  );
}
