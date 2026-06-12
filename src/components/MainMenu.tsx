import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, HelpCircle, Key, Settings, BookOpen, Music, Volume2, HardDriveDownload, Sparkles, LogOut, Award } from 'lucide-react';

interface MainMenuProps {
  onNewGame: () => void;
  onContinue: () => void;
  hasSave: boolean;
  onOpenSaves: () => void;
  onOpenGallery: () => void;
  onOpenCredits: () => void;
  onOpenConfig: () => void;
  backgroundUrl: string;
}

export default function MainMenu({
  onNewGame,
  onContinue,
  hasSave,
  onOpenSaves,
  onOpenGallery,
  onOpenCredits,
  onOpenConfig,
  backgroundUrl,
}: MainMenuProps) {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  // Play a gothic sparkle/crow effect occasionally
  return (
    <div className="relative w-full h-full flex flex-col justify-end items-center bg-black overflow-hidden select-none" id="main-menu-root">
      
      {/* Background with subtle camera pan parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out scale-105 opacity-85"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      
      {/* Red vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-red-950/20 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />

      {/* Floating bats decorative element (occasionally crossing the screen) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        <div className="absolute top-[20%] left-[-200px] w-96 h-20 bg-cover opacity-35 animate-[fly_15s_linear_infinite]" 
             style={{ 
               backgroundImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
               animationDelay: '1s'
             }} 
        />
      </div>

      {/* Centered Title Logo */}
      <div className="relative z-10 mb-auto mt-[4vh] text-center flex flex-col items-center max-w-xl px-4 select-none">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: 'spring' }}
          className="flex flex-col items-center"
        >
          {/* Gothic crown accent decoration */}
          <div className="w-16 h-8 text-red-500 mb-2 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] flex items-center justify-center">
            👑
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.25em] translate-x-[0.125em] text-white uppercase select-none font-bold italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] select-none">
            Aranxita
          </h1>
          
          <div className="flex items-center gap-4 py-2 w-full justify-center">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-red-600" />
            <span className="font-mono text-xs tracking-[0.44em] text-red-500 uppercase font-medium drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
              Novela Visual Gótica
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-red-600" />
          </div>
          
          <p className="font-sans text-xs italic text-slate-400 select-none max-w-xs drop-shadow-md">
            "Donde el amor prohibido late en el ocaso eterno del Castillo Noctis"
          </p>
        </motion.div>
      </div>

      {/* Interactivo Navigation Controls Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="relative z-10 w-full max-w-sm flex flex-col gap-3 py-10 px-6 sm:px-0 mb-[6vh] select-none"
      >
        {/* NUEVA PARTIDA BUTTON */}
        <button
          onClick={onNewGame}
          onMouseEnter={() => setHoveredBtn('new')}
          onMouseLeave={() => setHoveredBtn(null)}
          className="relative overflow-hidden w-full py-3 px-6 rounded bg-gradient-to-r from-red-950/60 to-red-900/60 hover:from-red-900 hover:to-red-800 border border-red-800/60 hover:border-red-500 text-white font-serif uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_15px_rgba(153,27,27,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] cursor-pointer flex items-center justify-center gap-2"
          id="btn-new-game"
        >
          <Play className="w-4 h-4 text-red-400 animate-pulse" />
          <span>Nueva Partida</span>
          {hoveredBtn === 'new' && (
            <motion.div layoutId="cursor-glow" className="absolute inset-0 bg-red-500/10 pointer-events-none" />
          )}
        </button>

        {/* CONTINUAR BUTTON */}
        <button
          onClick={onContinue}
          disabled={!hasSave}
          onMouseEnter={() => setHoveredBtn('continue')}
          onMouseLeave={() => setHoveredBtn(null)}
          className={`relative overflow-hidden w-full py-3 px-6 rounded border font-serif uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            hasSave
              ? 'bg-slate-950/80 hover:bg-slate-900 border-red-900/40 hover:border-red-500 text-white cursor-pointer'
              : 'bg-zinc-950/40 border-zinc-900/80 text-zinc-600 cursor-not-allowed'
          }`}
          id="btn-continue"
        >
          <Sparkles className={`w-4 h-4 ${hasSave ? 'text-red-400' : 'text-zinc-700'}`} />
          <span>Continuar</span>
          {hasSave && hoveredBtn === 'continue' && (
            <motion.div layoutId="cursor-glow" className="absolute inset-0 bg-red-500/5 pointer-events-none" />
          )}
        </button>

        {/* CARGAR PARTIDA */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenSaves}
            onMouseEnter={() => setHoveredBtn('load')}
            onMouseLeave={() => setHoveredBtn(null)}
            className="w-full py-2.5 px-3 rounded bg-zinc-950/80 border border-zinc-900 hover:border-red-900 text-slate-300 hover:text-white font-serif tracking-wide text-xs uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
            id="btn-load"
          >
            <HardDriveDownload className="w-3.5 h-3.5 text-red-500/70" />
            <span>Mis Saves</span>
          </button>

          {/* GALERÍA DE FINALES */}
          <button
            onClick={onOpenGallery}
            onMouseEnter={() => setHoveredBtn('gallery')}
            onMouseLeave={() => setHoveredBtn(null)}
            className="w-full py-2.5 px-3 rounded bg-zinc-950/80 border border-zinc-900 hover:border-red-900 text-slate-300 hover:text-white font-serif tracking-wide text-xs uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
            id="btn-gallery"
          >
            <Award className="w-3.5 h-3.5 text-red-500/70" />
            <span>Galería</span>
          </button>
        </div>

        {/* CONFIG & CREDITS BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenConfig}
            className="w-full py-2 px-3 rounded bg-zinc-950/45 hover:bg-zinc-950/95 border border-zinc-900 hover:border-zinc-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-serif uppercase tracking-wider"
            id="btn-config"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Config</span>
          </button>

          <button
            onClick={onOpenCredits}
            className="w-full py-2 px-3 rounded bg-zinc-950/45 hover:bg-zinc-950/95 border border-zinc-900 hover:border-zinc-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-serif uppercase tracking-wider"
            id="btn-credits"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Autores</span>
          </button>
        </div>
      </motion.div>

      {/* Decorative footer */}
      <div className="relative z-10 w-full flex justify-between items-center px-6 py-4 border-t border-zinc-950 text-[10px] font-mono text-zinc-500 tracking-wider">
        <span>COSMIC SHADOW ENGINES v1.2</span>
        <span>© SANGRE ESCARLATA STUDIOS 2026</span>
      </div>

      {/* Embedded CSS for bat flying animation */}
      <style>{`
        @keyframes fly {
          0% {
            transform: translate(0, 0) scale(0.4) rotate(5deg);
            opacity: 0.1;
          }
          50% {
            transform: translate(60vw, -10vh) scale(1) rotate(-5deg);
            opacity: 0.5;
          }
          100% {
            transform: translate(120vw, -20vh) scale(0.6) rotate(10deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
