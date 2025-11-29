import React, { useMemo, useEffect, useState } from 'react';

interface StarBackgroundProps {
  goldenMeteorsEnabled?: boolean;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ goldenMeteorsEnabled = false }) => {
  // Generate random static stars
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1 + 'px',
      opacity: Math.random(),
      animationDelay: `${Math.random() * 5}s`,
    }));
  }, []);

  // Standard white/blue shooting stars
  const standardShootingStars = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: `std-${i}`,
      top: `${Math.random() * 50 - 10}%`, 
      left: `${Math.random() * 70 + 30}%`,
      delay: `${Math.random() * 25}s`,
      duration: `${3 + Math.random() * 4}s`,
      tailLength: `${150 + Math.random() * 200}px`,
      brightness: 0.3 + Math.random() * 0.7,
      isGolden: false,
    }));
  }, []);

  const [goldenMeteors, setGoldenMeteors] = useState<any[]>([]);

  // Effect to spawn golden meteors periodically if enabled
  useEffect(() => {
    // Clear any existing golden meteors when disabled
    if (!goldenMeteorsEnabled) {
      setGoldenMeteors([]);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const spawnGoldenMeteor = () => {
      const id = Date.now();
      const newMeteor = {
        id: `gold-${id}`,
        top: `${Math.random() * 40}%`, // Mostly top half
        left: `${Math.random() * 60 + 20}%`,
        delay: '0s', // Immediate start when spawned
        duration: `${6 + Math.random() * 3}s`, // Slow and elegant (6-9s)
        tailLength: `${350 + Math.random() * 100}px`, // Long tail
        brightness: 0.9,
        isGolden: true,
      };

      setGoldenMeteors((prev) => [...prev, newMeteor]);

      // Remove after animation completes to keep DOM clean
      setTimeout(() => {
        setGoldenMeteors((prev) => prev.filter((m) => m.id !== `gold-${id}`));
      }, 10000); 
    };

    const scheduleNextMeteor = () => {
      // Random delay between 10 seconds (10000ms) and 20 seconds (20000ms)
      const randomDelay = Math.random() * 10000 + 10000;
      
      timeoutId = setTimeout(() => {
        spawnGoldenMeteor();
        scheduleNextMeteor(); // Schedule the next one recursively
      }, randomDelay);
    };

    // Initial delay before the first loop starts
    scheduleNextMeteor();

    return () => clearTimeout(timeoutId);
  }, [goldenMeteorsEnabled]);


  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-[#000000]">
      {/* Styles for the shooting stars animation */}
      <style>{`
        @keyframes shoot {
          0% {
            transform: rotate(315deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--star-brightness, 1);
          }
          80% {
            opacity: var(--star-brightness, 1);
          }
          100% {
            transform: rotate(315deg) translateX(-1500px);
            opacity: 0;
          }
        }
        
        /* Specific keyframe for golden meteor to be smoother and longer path */
         @keyframes shoot-golden {
          0% {
            transform: rotate(315deg) translateX(100px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
             opacity: 1;
          }
          100% {
            transform: rotate(315deg) translateX(-2500px); /* Travels further */
            opacity: 0;
          }
        }

        .shooting-star {
          position: absolute;
          height: 1px;
          border-radius: 999px;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0; 
        }
        
        .shooting-star.standard {
           background: linear-gradient(-45deg, rgba(255,255,255,1), rgba(0,0,255,0));
           filter: drop-shadow(0 0 6px rgba(105, 210, 231, 0.5));
           animation-name: shoot;
        }
        
        .shooting-star.standard::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: var(--star-tail-length, 200px);
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,1), transparent);
        }

        .shooting-star.golden {
           height: 2px; /* Slightly thicker */
           background: linear-gradient(-45deg, rgba(253, 230, 138, 1), rgba(253, 230, 138, 0));
           filter: drop-shadow(0 0 8px rgba(253, 230, 138, 0.6)); /* Golden glow */
           animation-name: shoot-golden;
           animation-iteration-count: 1; /* Spawned individually */
           z-index: 1;
        }
        
        .shooting-star.golden::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: var(--star-tail-length, 300px);
          height: 2px;
          background: linear-gradient(90deg, rgba(253, 230, 138, 0.9), transparent);
        }
      `}</style>

      {/* Static Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse-slow"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* Standard Shooting Stars */}
      {standardShootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star standard"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
            // Cast to any to suppress TS warning for custom CSS variables
            ['--star-tail-length' as any]: star.tailLength,
            ['--star-brightness' as any]: star.brightness,
          } as React.CSSProperties}
        />
      ))}

      {/* Golden Shooting Stars (Dynamic) */}
      {goldenMeteors.map((star) => (
        <div
          key={star.id}
          className="shooting-star golden"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.duration,
            animationDelay: star.delay,
            ['--star-tail-length' as any]: star.tailLength,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default StarBackground;