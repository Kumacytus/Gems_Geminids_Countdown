import React, { useMemo, useState, useEffect } from 'react';
import { PawPrint, Star } from 'lucide-react';
import StarBackground from './components/StarBackground';
import CountdownDisplay from './components/CountdownDisplay';
import BirthdayIntro from './components/BirthdayIntro';
import GeminiStar from './components/GeminiStar';
import { QUOTES, BIRTHDAY_QUOTES } from './constants';
import { GeminidInfo, MoonPhaseInfo } from './types';
import { getMoonPhaseInfo } from './utils/moonPhase';
import { getCurrentGeminidInfo } from './utils/astronomy';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  
  // Astronomy State
  const [geminidInfo, setGeminidInfo] = useState<GeminidInfo | null>(null);

  // Initialize Astronomy Data
  useEffect(() => {
    // Initial calculation
    setGeminidInfo(getCurrentGeminidInfo());

    // Re-check every minute to see if status changed (e.g. from Waiting to Active)
    const interval = setInterval(() => {
      setGeminidInfo(getCurrentGeminidInfo());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Derive the key based on the current year so it resets annually.
  const currentYear = new Date().getFullYear();
  const birthdayStorageKey = `geminids_birthday_intro_seen_${currentYear}`;

  // Check for birthday and intro status
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      // December is month 11 (0-indexed)
      const isTodayBirthday = now.getMonth() === 11 && now.getDate() === 14;
      setIsBirthday(isTodayBirthday);

      if (isTodayBirthday) {
        const seen = localStorage.getItem(birthdayStorageKey);
        if (!seen) {
          setShowIntro(true);
        } else {
          setHasSeenIntro(true);
        }
      }
    };
    
    checkDate();
  }, [birthdayStorageKey]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    localStorage.setItem(birthdayStorageKey, 'true');
  };

  // Calculate moon info dynamically based on the PEAK time (Solar Longitude 262.2)
  const moonInfo: MoonPhaseInfo | null = useMemo(() => {
    if (!geminidInfo) return null;
    return getMoonPhaseInfo(geminidInfo.peakDate, geminidInfo.year);
  }, [geminidInfo]);

  const randomQuote = useMemo(() => {
    const source = isBirthday ? BIRTHDAY_QUOTES : QUOTES;
    return source[Math.floor(Math.random() * source.length)];
  }, [isBirthday]);

  if (!geminidInfo || !moonInfo) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-slate-950 text-white font-cormorant text-2xl">
        <p className="animate-pulse">Calculating Celestial Mechanics...</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background */}
      <StarBackground goldenMeteorsEnabled={isBirthday && hasSeenIntro} />

      {/* Birthday Intro Overlay */}
      {showIntro && <BirthdayIntro onComplete={handleIntroComplete} />}

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center flex-grow transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 md:mb-12 w-full max-w-3xl">
          {/* Header Label - Dynamic based on status */}
          <h1 className={`text-slate-400 text-xs md:text-sm font-serif tracking-[0.5em] uppercase mb-3 text-center leading-relaxed transition-all duration-1000 ${geminidInfo.status === 'ACTIVE' ? 'text-amber-200/90 font-bold drop-shadow-[0_0_10px_rgba(253,230,138,0.5)]' : 'opacity-80'}`}>
            {geminidInfo.status === 'ACTIVE' 
              ? 'The Geminids are Here' 
              : 'Next Geminids Meteor Shower'}
          </h1>

          {/* Est. Peak Subtitle (Moved from Footer) */}
          <span className="text-slate-700 font-serif text-[10px] tracking-wider uppercase text-center">
             Est. Peak: {new Date(geminidInfo.peakDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* The Big Countdown */}
        <div className="mb-8 md:mb-12">
          <CountdownDisplay targetDate={geminidInfo.targetDate} />
          
          {/* Active Status Subtitle */}
          {geminidInfo.status === 'ACTIVE' && (
            <div className="mt-4 text-center">
              <span className="text-amber-100/60 font-serif text-[10px] md:text-xs tracking-[0.3em] uppercase">
                Peak Window Ending In
              </span>
            </div>
          )}
        </div>

        {/* Quote - Updated to use inline-block for icon to flow with text */}
        <div className="text-slate-400 font-quote italic text-base md:text-xl text-center animate-pulse-slow max-w-2xl px-2">
          <span>“{randomQuote}”</span>
          <span className="inline-block ml-2 align-middle">
            {isBirthday ? (
              <GeminiStar size={18} className="text-amber-200/80 animate-spin-slow" />
            ) : (
              <PawPrint size={14} fill="currentColor" className="opacity-60 -rotate-12 text-slate-400 hover:text-pink-300 transition-colors duration-500" />
            )}
          </span>
        </div>

      </div>

      {/* Footer */}
      <footer className={`relative z-10 w-full px-8 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))] md:p-12 text-center transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-xl mx-auto p-4 transition-all duration-700">
          
          <div className="mb-4 flex flex-col items-center gap-1">
             <span className="text-slate-500 font-sc font-medium text-base tracking-widest">
              {moonInfo.description} ({geminidInfo.year})
            </span>
          </div>

          <p className="text-slate-600 font-sc font-light text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            {moonInfo.advice}
          </p>
          
        </div>
      </footer>

    </main>
  );
};

export default App;