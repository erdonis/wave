import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

export default function UsageCapDisplay() {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) return;

    // Set up the interval to decrement the timer
    const timer = setInterval(async () => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          signOut();
          return 0;
        }
        return prevTime - 1;
      });
      // clear timer on complete
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center pt-[25%]">
      <div className="mb-4 rounded-2xl bg-card px-4 shadow sm:px-8">
        <div className="mb-4 flex items-center justify-center pt-4 sm:pt-5">
          <div className="w-full text-2xl">You have reached the usage cap for today!</div>
        </div>
        <div className="mb-2 flex items-center justify-center pt-4 sm:pt-5">
          <div className="flex text-xl">Logout In:</div>
        </div>
        <div className="mb-6 flex items-center justify-center pt-4 sm:pt-5">
          <div className="flex text-6xl">{formatTime(timeLeft)}</div>
        </div>
      </div>
    </div>
  );
}
