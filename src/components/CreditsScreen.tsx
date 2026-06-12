import React from 'react';
import { motion } from 'motion/react';
import { Award, RefreshCw, LogOut, Heart, Eye, Flame, Shield, Compass, BookOpen, UserCheck, Star } from 'lucide-react';
import { ENDINGS_DATA } from '../data/story';
import { Stats, Ending } from '../types';

interface CreditsScreenProps {
  completedEndingId?: number | null; // Pass this if they just finished!
  stats?: Stats;
  personalityCounts?: Record<string, number>;
  onRestart: () => void;
  onGoToMenu: () => void;
  onGoToGallery?: () => void;
  backgroundUrl: string;
}

export default function CreditsScreen({
  completedEndingId,
  stats,
  personalityCounts,
  onRestart,
  onGoToMenu,
  onGoToGallery,
  backgroundUrl,
}: CreditsScreenProps) {
  
  // Find completed ending details if available
  const activeEnding = completedEndingId 
    ? ENDINGS_DATA.find(e => e.id === completedEndingId)
    : null;

  // Determine dominant personality
  const getDominantPersonality = () => {
    if (!personalityCounts) return 'Princesa Inmortal';
    let dominant = 'Intrigante';
    let maxCount = 0;
    Object.entries(personalityCounts).forEach(([tag, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominant = tag;
      }
    });
    if (maxCount === 0) return 'Princesa Real';
    
    switch (dominant) {
      case 'Coqueta': return 'Seductora y Coqueta';
      case 'Dulce': return 'Dulce y Compasiva';
      case 'Sarcástica': return 'Aguda y Sarcástica';
      case 'Desconfiada': return 'Astuta y Desconfiada';
      case 'Curiosa': return 'Investigadora Curiosa';
      case 'Valiente': return 'Soberana Guerrera';
      case 'Reservada': return 'Noble y Reservada';
      default: return dominant;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-zinc-950 overflow-hidden select-none text-slate-100 p-6" id="credits-screen-root">
      
      {/* Cinematic dark gothic wallpaper with vertical pan */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-25 scale-105 pointer-events-none transition-transform duration-[15s]"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-red-950/20" />

      {activeEnding ? (
        /* ==================== A. ENDING COMPLETED RUN SUMMARY SCREEN ==================== */
        <div className="relative z-10 flex-1 max-w-2xl mx-auto w-full flex flex-col justify-center items-center py-6 overflow-y-auto" id="ending-summary-panel">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full flex flex-col items-center bg-zinc-900/95 border border-red-900/60 rounded-lg p-6 md:p-8 shadow-[0_15px_40px_rgba(239,68,68,0.1)] text-center relative"
          >
            {/* Crown decoration element */}
            <div className="absolute -top-6 bg-red-900 border border-red-500 rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg select-none">
              👑
            </div>

            <div className="text-[10px] font-mono text-red-500 tracking-[0.3em] uppercase w-full mt-2 font-bold select-none">
              Partida Concluida
            </div>

            <h1 className="font-serif text-3xl text-white tracking-widest font-extrabold mt-1 select-none uppercase">
              {activeEnding.title}
            </h1>
            
            <div className="text-[11px] font-mono text-zinc-500 bg-black px-3 py-1 rounded-sm border border-zinc-800 uppercase tracking-widest mt-2 select-none">
              Final Nº {activeEnding.id} unlocked.
            </div>

            {/* Ending poetic narrative synopsis */}
            <p className="font-serif text-sm italic text-slate-300 leading-relaxed max-w-md my-5 select-none md:px-4">
              "{activeEnding.description}"
            </p>

            {/* Divider lines */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-900 to-transparent my-1" />

            {/* Stats list of this run */}
            {stats && (
              <div className="w-full grid grid-cols-2 gap-3 max-w-md my-4 text-left">
                {/* Score badge elements */}
                <div className="p-2.5 bg-black/40 rounded border border-zinc-900 flex items-center gap-3">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase font-mono">Romance</span>
                    <span className="text-xs text-slate-200 font-bold font-mono">{stats.romance} / 10</span>
                  </div>
                </div>

                <div className="p-2.5 bg-black/40 rounded border border-zinc-900 flex items-center gap-3">
                  <Shield className="w-4 h-4 text-violet-400" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase font-mono">Confianza</span>
                    <span className="text-xs text-slate-200 font-bold font-mono">{stats.confianza} / 10</span>
                  </div>
                </div>

                <div className="p-2.5 bg-black/40 rounded border border-zinc-900 flex items-center gap-3">
                  <Eye className="w-4 h-4 text-teal-400" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase font-mono">Curiosidad</span>
                    <span className="text-xs text-slate-200 font-bold font-mono">{stats.curiosidad} / 10</span>
                  </div>
                </div>

                <div className="p-2.5 bg-black/40 rounded border border-zinc-900 flex items-center gap-3">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase font-mono">Valentía</span>
                    <span className="text-xs text-slate-200 font-bold font-mono">{stats.valentia} / 10</span>
                  </div>
                </div>
              </div>
            )}

            {/* Dominant temper of Aranxita */}
            <div className="bg-red-950/20 border border-red-950 px-4 py-2 rounded-full text-xs font-serif text-red-300 uppercase tracking-widest max-w-sm w-full mb-6">
              Aranxita es calificada como: <strong className="text-white font-bold">{getDominantPersonality()}</strong>
            </div>

            {/* Buttons list */}
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button
                onClick={onRestart}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 text-white font-serif uppercase tracking-widest text-xs border border-red-800 hover:border-red-500 transition-all rounded cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                id="sum-btn-restart"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Reintentar Camino</span>
              </button>

              {onGoToGallery && (
                <button
                  onClick={onGoToGallery}
                  className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-950 text-slate-300 hover:text-white font-serif uppercase tracking-widest text-xs transition-all rounded cursor-pointer flex items-center justify-center gap-1.5"
                  id="sum-btn-gallery"
                >
                  <Star className="w-3.5 h-3.5 text-red-500" />
                  <span>Ver Mi Galería</span>
                </button>
              )}

              <button
                onClick={onGoToMenu}
                className="flex-1 py-3 px-4 bg-zinc-950/60 hover:bg-zinc-950 text-slate-400 hover:text-slate-200 border border-zinc-900 rounded cursor-pointer text-xs font-serif uppercase tracking-widest hover:border-zinc-800 transition-all"
                id="sum-btn-menu"
              >
                <LogOut className="w-3.5 h-3.5 text-zinc-500 inline mr-1" />
                <span>Menú Principal</span>
              </button>
            </div>

          </motion.div>
        </div>
      ) : (
        /* ==================== B. STANDARD STAFF LIST SCREEN ==================== */
        <div className="relative z-10 flex-1 max-w-xl mx-auto w-full flex flex-col justify-center items-center py-10" id="standard-credits-panel">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full bg-zinc-900/90 border border-zinc-900 p-8 rounded-lg text-center"
          >
            {/* Gothic emblem icon */}
            <div className="w-12 h-12 rounded-full border border-red-950 flex items-center justify-center mx-auto mb-4 bg-red-950/30">
              🩸
            </div>

            <h1 className="font-serif text-3xl uppercase tracking-widest text-white font-bold drop-shadow">
              Créditos de Creación
            </h1>
            <div className="h-0.5 w-16 bg-red-600 mx-auto my-3" />

            <div className="space-y-6 my-6 text-sm font-serif text-slate-300 select-none">
              <div>
                <span className="block text-[10px] uppercase text-red-500 font-mono tracking-widest">Guión y Diálogos</span>
                <strong className="text-white text-base">Franxito y Aranxita Escritores</strong>
              </div>

              <div>
                <span className="block text-[10px] uppercase text-red-500 font-mono tracking-widest">Desarrollo y Código</span>
                <strong className="text-white text-base">Franxito Productions</strong>
              </div>

              <div>
                <span className="block text-[10px] uppercase text-red-500 font-mono tracking-widest">Ilustraciones y Paisajes</span>
                <strong className="text-white text-base">Señor GPT</strong>
              </div>

              <div>
                <span className="block text-[10px] uppercase text-red-500 font-mono tracking-widest">Agradecimientos Especiales</span>
                <p className="text-slate-400 text-xs mt-1 italic max-w-sm mx-auto">
                  A ti, inmortal princesa vampira de Internet, que con paciencia has recorrido el Castillo Noctis decidiendo tu propio destino.
                </p>
              </div>
            </div>

            <button
              onClick={onGoToMenu}
              className="mt-4 px-6 py-2.5 bg-zinc-950 hover:bg-black text-slate-300 hover:text-white border border-zinc-800 hover:border-red-950 rounded font-serif text-xs uppercase tracking-widest transition-all cursor-pointer"
              id="credits-btn-back"
            >
              Volver al Inicio
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
