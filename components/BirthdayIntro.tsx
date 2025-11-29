import React, { useEffect, useState } from 'react';
import GeminiStar from './GeminiStar';

interface BirthdayIntroProps {
  onComplete: () => void;
}

const BirthdayIntro: React.FC<BirthdayIntroProps> = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // 1. Start: Meteor animation starts via CSS automatically on mount
    
    // 2. Show Text after meteor has traveled a bit (approx 1.5s)
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1500);

    // 3. Start Fading out text and scene after reading time (1.5s delay + 3s read = 4.5s)
    const fadeOutTimer = setTimeout(() => {
      setFadingOut(true);
    }, 5500);

    // 4. Complete callback after fade out transition (4.5s + 1s fade = 5.5s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Intro Meteor Style */}
      <style>{`
        @keyframes intro-shoot {
          0% {
            transform: rotate(315deg) translate(20vw, -20vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: rotate(315deg) translate(-120vw, 0);
            opacity: 0;
          }
        }
        .intro-meteor {
          position: absolute;
          top: 20%;
          left: 60%;
          width: 300px;
          height: 3px;
          background: linear-gradient(90deg, rgba(253, 230, 138, 1), transparent);
          border-radius: 999px;
          filter: drop-shadow(0 0 10px rgba(253, 230, 138, 0.8));
          transform-origin: left center;
          animation: intro-shoot 4s ease-in-out forwards;
        }
        .intro-meteor::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 10px 2px rgba(253, 230, 138, 0.8);
        }
      `}</style>
      
      {/* The Big Golden Meteor */}
      <div className="intro-meteor"></div>

      {/* Greeting Text */}
      <div className={`flex flex-col items-center gap-4 transition-all duration-1000 transform ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl md:text-6xl font-serif text-amber-100 tracking-widest drop-shadow-[0_0_15px_rgba(253,230,138,0.4)]">
          Happy Birthday.
        </h1>
        <GeminiStar size={32} className="text-amber-200 animate-pulse-slow" />
      </div>

    </div>
  );
};

export default BirthdayIntro;