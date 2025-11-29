import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownDisplayProps {
  targetDate: string;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
      <div className="flex items-baseline space-x-4 md:space-x-8 text-white tracking-tighter">
        <TimeUnit value={timeLeft.days} label="DAYS" />
        <span className="text-4xl md:text-8xl lg:text-[10rem] font-thin text-slate-500 font-cormorant pb-2 md:pb-6">:</span>
        <TimeUnit value={timeLeft.hours} label="HRS" />
        <span className="text-4xl md:text-8xl lg:text-[10rem] font-thin text-slate-500 font-cormorant pb-2 md:pb-6">:</span>
        <TimeUnit value={timeLeft.minutes} label="MIN" />
        <span className="text-4xl md:text-8xl lg:text-[10rem] font-thin text-slate-500 font-cormorant pb-2 md:pb-6">:</span>
        <TimeUnit value={timeLeft.seconds} label="SEC" />
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    {/* 
        Increased font sizes:
        text-5xl -> text-6xl (mobile)
        md:text-8xl -> md:text-9xl (tablet)
        lg:text-9xl -> lg:text-[11rem] (desktop custom huge size)
    */}
    <span className="text-6xl md:text-9xl lg:text-[11rem] leading-none font-cormorant font-normal lining-nums tabular-nums bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[10px] md:text-sm font-light tracking-[0.3em] text-slate-400 mt-4 md:mt-6">
      {label}
    </span>
  </div>
);

export default CountdownDisplay;