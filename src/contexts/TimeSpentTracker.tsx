'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UsageCapDisplay from '@/components/UsageCapDisplay';

const TimeSpentTrackerContext = createContext(0);
export const useTimeSpentTracker = () => useContext(TimeSpentTrackerContext);

export function TimeSpentTrackerProvider({ children }: { children: ReactNode }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showUsageGuard, setShowUsageGuard] = useState(false);
  const MAX_TIME_ALLOWED = Number(process.env.NEXT_PUBLIC_PER_DAY_USAGE_QUOTA_MS ?? (2 * 60 * 60 * 1000).toString()); // defaults to 2 hours
  const { data: session } = useSession();
  useEffect(() => {
    const getTimeSpent = () => {
      if (session) {
        const currentTime = Date.now();
        return currentTime - session.user.loginTime + session.user.usageToday;
      }
      return 0;
    };

    const timeSpent = getTimeSpent();
    if (timeSpent >= MAX_TIME_ALLOWED) {
      setElapsedTime(timeSpent);
      setShowUsageGuard(true);
    } else {
      const interval = setInterval(async () => {
        const timeSpentNow = getTimeSpent();
        if (timeSpentNow >= MAX_TIME_ALLOWED) {
          setElapsedTime(timeSpentNow);
          setShowUsageGuard(true);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, []);
  /* if (showUsageGuard) {
                            router.push('/usage-guard');
                          } */
  return (
    <TimeSpentTrackerContext.Provider value={elapsedTime}>
      <>
        {!showUsageGuard && children}
        {showUsageGuard && <UsageCapDisplay />}
      </>
    </TimeSpentTrackerContext.Provider>
  );
}
