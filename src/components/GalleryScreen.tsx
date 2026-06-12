import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Lock, ArrowLeft, Image, Camera, CheckCircle2, Bookmark } from 'lucide-react';
import { ENDINGS_DATA } from '../data/story';
import { Ending } from '../types';

interface GalleryScreenProps {
  unlockedEndings: number[];
  unlockedScenes: string[];
  onBack: () => void;
  backgroundUrl: string;
}

export default function GalleryScreen({
  unlockedEndings,
  unlockedScenes,
  onBack,
  backgroundUrl,
}: GalleryScreenProps) {
  const [activeTab, setActiveTab] = useState<'endings' | 'scenes'>('endings');

  // Human readable scene mapping for explored locations
  const sceneList = [
    { id: 'vestibulo', name: 'El Vestíbulo Susurrante', desc: 'El primer encuentro de miradas doradas y rojas.', badge: '✉️' },
    { id: 'jardin', name: 'Laberinto de Rosas Negras', desc: 'Senda de flores prohibidas cortadas por amor.', badge: '🌹' },
    { id: 'biblioteca', name: 'Biblioteca de tomos malditos', desc: 'Un encuentro entre escrituras de predeterminación.', badge: '📖' },
    { id: 'torre', name: 'La aguja al viento de la tormenta', desc: 'El baluarte plateado que desafía la caída del alba.', badge: '🏰' },
    { id: 'chimenea', name: 'Fogata dorada de Jade antiguo', desc: 'Pláticas de sinceridad y copas de elíxir sagrado.', badge: '🔥' },
    { id: 'balcon', name: 'El balcón real de plata', desc: 'Abrazo inmortal bendecido por la luna llena.', badge: '🌙' },
    { id: 'salon_baile', name: 'El vals de sombras abandonado', desc: 'Pasos bailados cobijados por cortinas rotas.', badge: '💃' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-zinc-950 overflow-hidden select-none text-slate-100" id="gallery-root">
      {/* Blurred gothic backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-25 scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black" />

      {/* Header Panel */}
      <div className="relative z-10 p-6 border-b border-red-950/40 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded bg-zinc-900 hover:bg-red-950 text-slate-300 hover:text-white border border-zinc-800 hover:border-red-800 text-xs font-serif uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
          id="gallery-btn-back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Menú</span>
        </button>

        <h2 className="font-serif text-2xl tracking-[0.2em] text-white uppercase font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">
          Cámara de Memorias
        </h2>

        {/* Unlocked stats */}
        <div className="text-xs font-mono text-red-400 bg-red-950/35 border border-red-950/80 px-3 py-1.5 rounded">
          Progreso: <strong className="text-white">{unlockedEndings.length} / 15</strong> Finales
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex border-b border-zinc-900 justify-center">
        <button
          onClick={() => setActiveTab('endings')}
          className={`px-8 py-3.5 font-serif text-xs uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === 'endings'
              ? 'border-red-600 text-white font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
          id="tab-gallery-endings"
        >
          Finales Obtenidos
        </button>
        <button
          onClick={() => setActiveTab('scenes')}
          className={`px-8 py-3.5 font-serif text-xs uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === 'scenes'
              ? 'border-red-600 text-white font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
          id="tab-gallery-scenes"
        >
          Escenas de Castillo Noctis
        </button>
      </div>

      {/* Inner Panels */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8 max-w-6xl mx-auto w-full">
        {activeTab === 'endings' ? (
          /* 1. ENDINGS GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="gallery-endings-panel">
            {ENDINGS_DATA.map((ending) => {
              const isUnlocked = unlockedEndings.includes(ending.id);
              
              return (
                <div
                  key={ending.id}
                  className={`border rounded-lg p-5 flex flex-col relative overflow-hidden transition-all duration-300 h-44 ${
                    isUnlocked
                      ? 'bg-zinc-900/90 border-red-900/60 shadow-[0_4px_15px_rgba(239,68,68,0.05)] hover:border-red-500 hover:scale-[1.02]'
                      : 'bg-zinc-950/80 border-zinc-900 opacity-60'
                  }`}
                  id={`gallery-ending-card-${ending.id}`}
                >
                  {isUnlocked ? (
                    /* UNLOCKED CARD */
                    <>
                      <div className="absolute top-4 right-4 text-emerald-500 flex items-center gap-1 text-[10px] font-mono uppercase bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Desbloqueado</span>
                      </div>

                      <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold mb-1">
                        Camino {ending.id.toString().padStart(2, '0')}
                      </div>

                      <h3 className="font-serif text-base text-white tracking-wide font-bold mb-2">
                        {ending.title}
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed font-serif overflow-hidden line-clamp-3">
                        {ending.description}
                      </p>

                      <div className="mt-auto pt-3 border-t border-zinc-800 text-[9px] font-mono uppercase tracking-widest text-slate-500">
                        Lazo: <span className="text-red-400 font-bold">{ending.type}</span>
                      </div>
                    </>
                  ) : (
                    /* LOCKED CARD */
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Lock className="w-8 h-8 text-zinc-700 mb-3 animate-pulse" />
                      <div className="text-[10px] font-mono text-zinc-650 uppercase tracking-wider text-zinc-500">
                        Gesta {ending.id.toString().padStart(2, '0')}
                      </div>
                      <h3 className="font-serif text-sm text-zinc-500 font-bold mt-1">
                        Camino Oculto en las Sombras
                      </h3>
                      <p className="text-[10px] text-zinc-600 font-sans italic mt-1 max-w-[18rem]">
                        Toma decisiones distintas para develar este desenlace.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* 2. SCENES NOBLES EXPLORED LIST */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="gallery-scenes-panel">
            {sceneList.map((scene) => {
              // Mark scene as unlocked if the player has visited it, or default we can check unlockedScenes
              const isExplored = unlockedScenes.includes(scene.id) || unlockedEndings.length > 0; // fallback helper to unlock if they have completed ends
              
              return (
                <div
                  key={scene.id}
                  className={`p-4 border rounded flex items-center gap-4 transition-all duration-300 ${
                    isExplored
                      ? 'bg-zinc-900 border-red-950 hover:border-red-900 hover:bg-zinc-900/80 shadow'
                      : 'bg-zinc-950/40 border-zinc-900 opacity-50'
                  }`}
                  id={`gallery-scene-card-${scene.id}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    isExplored ? 'bg-red-950/80 border border-red-800/50' : 'bg-zinc-950 border border-zinc-900'
                  }`}>
                    {isExplored ? scene.badge : '🔒'}
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-serif text-sm uppercase tracking-wider font-bold ${isExplored ? 'text-white' : 'text-zinc-600'}`}>
                      {isExplored ? scene.name : 'Rincón Misterioso de Noctis'}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      {isExplored ? scene.desc : 'No has recorrido este aposento en esta aventura.'}
                    </p>
                  </div>

                  {isExplored && (
                    <span className="text-[9px] font-mono uppercase text-red-500 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/30">
                      Explorado
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
