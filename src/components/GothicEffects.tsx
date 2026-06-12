import React, { useEffect, useState } from 'react';

export default function GothicEffects() {
  const [lightning, setLightning] = useState(false);

  // Occasional dramatic gothic lightning flash
  useEffect(() => {
    const flashInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setLightning(true);
        const timer = setTimeout(() => {
          setLightning(false);
          // Optional double flash
          if (Math.random() > 0.5) {
            setTimeout(() => {
              setLightning(true);
              setTimeout(() => setLightning(false), 90);
            }, 150);
          }
        }, 120);
        return () => clearTimeout(timer);
      }
    }, 9000);

    return () => clearInterval(flashInterval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" id="gothic-effects-container">
      {/* Lightning Flash Overlay */}
      {lightning && (
        <div className="absolute inset-0 bg-white/25 mix-blend-color-dodge transition-all duration-75 z-50 animate-pulse" />
      )}

      {/* Dynamic Nebulous Fog Layers */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60" />
      
      {/* Animated Gothic Mist Clouds (CSS Cloud simulation) */}
      <div className="absolute -bottom-10 left-0 w-[200%] h-32 bg-radial from-violet-950/20 via-slate-900/10 to-transparent blur-2xl animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-20 -left-1/2 w-[200%] h-40 bg-radial from-red-950/20 via-slate-950/10 to-transparent blur-3xl animate-pulse"
           style={{ animationDuration: '14s' }} />

      {/* Floating Sparkles/Dust or Candle Flame Particles simulation in background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 12 + 8;
          return (
            <div
              key={i}
              className="absolute bg-orange-500/30 rounded-full blur-[1px] animate-bounce"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                bottom: `${Math.random() * 80}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          );
        })}
      </div>

      {/* Ambient rain stream outside window (subtle lines) */}
      <div className="absolute inset-0 opacity-15">
        {Array.from({ length: 15 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 2;
          const duration = Math.random() * 1 + 1.2;
          return (
            <div
              key={i}
              className="absolute w-[1px] bg-gradient-to-b from-slate-400 to-transparent"
              style={{
                height: `${Math.random() * 100 + 80}px`,
                left: `${left}%`,
                top: '-150px',
                animation: `fall ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Styles for animation inside JSX */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(15deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotate(15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
