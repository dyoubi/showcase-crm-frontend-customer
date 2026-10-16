import React, { useEffect, useRef, useState } from 'react';

interface CountdownTimerProps {
  startHours?: number;
  startMinutes?: number;
  startSeconds?: number;
}

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export const Timer: React.FC<CountdownTimerProps> = ({ startHours = 0, startMinutes = 0, startSeconds = 0 }) => {
  const [time, setTime] = useState<Time>({
    hours: startHours,
    minutes: startMinutes,
    seconds: startSeconds,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [time]);

  const updateTime = () => {
    const { hours, minutes, seconds } = time;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      return;
    }

    if (seconds > 0) {
      setTime({ hours, minutes, seconds: seconds - 1 });
    } else if (minutes > 0) {
      setTime({ hours, minutes: minutes - 1, seconds: 59 });
    } else if (hours > 0) {
      setTime({ hours: hours - 1, minutes: 59, seconds: 59 });
    }
  };

  const formatTime = (unit: number): string => String(unit).padStart(2, '0');

  return (
    <div>
      {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
    </div>
  );
};

export default Timer;
