import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, Sparkles, Volume2, Save, LogIn, Menu, 
  ChevronRight, Heart, Shield, Eye, Flame, Award, HelpCircle, 
  Compass, Award as BadgeIcon, HelpCircle as QuestionIcon, RefreshCw
} from 'lucide-react';
import { DialogueNode, Choice, Stats, GameSave } from '../types';

interface GameScreenProps {
  currentNode: DialogueNode;
  onChoiceSelect: (choice: Choice) => void;
  stats: Stats;
  personalityCounts: Record<string, number>;
  dialogLog: { character: string; text: string; id: string }[];
  onQuickSave: () => void;
  onQuickLoad: () => void;
  onGoToMenu: () => void;
  onForceEnding: (endingId: number) => void;
  backgroundUrl: string;
  franxitoUrl: string;
  aranxitaUrl: string;
  onOpenSaves: () => void;
  onOpenLog: () => void;
}

export default function GameScreen({
  currentNode,
  onChoiceSelect,
  stats,
  personalityCounts,
  dialogLog,
  onQuickSave,
  onQuickLoad,
  onGoToMenu,
  onForceEnding,
  backgroundUrl,
  franxitoUrl,
  aranxitaUrl,
  onOpenSaves,
  onOpenLog,
}: GameScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const textRef = useRef<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter speed configuration (ms per character)
  const typingSpeed = 22; 

  // Compute dominant personality tag of Aranxita in real time
  const getDominantPersonality = () => {
    let dominant = 'Intrigante';
    let maxCount = 0;
    Object.entries(personalityCounts).forEach(([tag, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominant = tag;
      }
    });
    
    // Custom label based on values
    if (maxCount === 0) return 'Princesa Elegante';
    
    switch (dominant) {
      case 'Coqueta': return 'Seductora y Coqueta';
      case 'Dulce': return 'Dulce y Compasiva';
      case 'Sarcástica': return 'Aguda y Sarcástica';
      case 'Desconfiada': return 'Astuta y Desconfiada';
      case 'Curiosa': return 'Investigadora Curiosa';
      case 'Valiente': return 'Soberana de Gran Valor';
      case 'Reservada': return 'Noble y Reservada';
      default: return dominant;
    }
  };

  // Perform typewriter effect when node changes
  useEffect(() => {
    setIsTypewriterComplete(false);
    setDisplayedText('');
    textRef.current = currentNode.text;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    let index = 0;
    timerRef.current = setInterval(() => {
      if (index < textRef.current.length) {
        setDisplayedText(prev => prev + textRef.current.charAt(index));
        index++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsTypewriterComplete(true);
      }
    }, typingSpeed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentNode.id, currentNode.text]);

  // Complete typewriter instantly on click if in progress
  const handleTypewriterSkip = () => {
    if (!isTypewriterComplete) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(currentNode.text);
      setIsTypewriterComplete(true);
    }
  };

  // Auto progression advance
  useEffect(() => {
    let autoTimer: NodeJS.Timeout;
    if (isAuto && isTypewriterComplete && (!currentNode.choices || currentNode.choices.length === 0)) {
      autoTimer = setTimeout(() => {
        // If there are no choices but it's an ending node, player must click [Finalizar] manually
        if (currentNode.endingId) {
          onForceEnding(currentNode.endingId);
        }
      }, 3500);
    }
    return () => clearTimeout(autoTimer);
  }, [isAuto, isTypewriterComplete, currentNode.choices, currentNode.endingId]);

  // Translate background identifier to CSS filters / icons / descriptions
  const getSceneFilters = () => {
    switch (currentNode.background) {
      case 'vestibulo':
        return {
          overlayStyle: 'bg-violet-950/25 mix-blend-color-burn',
          color: 'from-violet-950/40 via-black/80 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(139,92,246,0.15)]',
          label: 'El Vestíbulo de las Velas',
        };
      case 'jardin':
        return {
          overlayStyle: 'bg-teal-950/20 mix-blend-overlay',
          color: 'from-emerald-950/35 via-black/85 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(16,185,129,0.15)]',
          label: 'Jardín de las Rosas Negras',
        };
      case 'biblioteca':
        return {
          overlayStyle: 'bg-indigo-950/30 mix-blend-color-dodge',
          color: 'from-fuchsia-950/30 via-slate-950/90 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(192,38,211,0.15)]',
          label: 'Biblioteca de Saberes Prohibidos',
        };
      case 'balcon':
        return {
          overlayStyle: 'bg-blue-950/30 mix-blend-soft-light',
          color: 'from-blue-950/45 via-black/90 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(59,130,246,0.15)]',
          label: 'El Balcón Real de la Noche',
        };
      case 'chimenea':
        return {
          overlayStyle: 'bg-amber-950/25 mix-blend-screen',
          color: 'from-amber-950/30 via-stone-950/85 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(245,158,11,0.15)]',
          label: 'Gran Salón de la Chimenea',
        };
      case 'torre':
        return {
          overlayStyle: 'bg-indigo-900/10 mix-blend-darken',
          color: 'from-indigo-950/40 via-neutral-950/90 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(99,102,241,0.15)]',
          label: 'La Torre Inmortal de la Luna',
        };
      case 'salon_baile':
        return {
          overlayStyle: 'bg-rose-950/30 mix-blend-color-burn',
          color: 'from-rose-950/40 via-red-950/80 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(251,113,133,0.15)]',
          label: 'Gran Salón del Vals Prohibido',
        };
      case 'habitacion':
        return {
          overlayStyle: 'bg-purple-950/30 mix-blend-multiply',
          color: 'from-purple-950/35 via-slate-950/85 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(147,51,234,0.15)]',
          label: 'Aposentos Góticos de Aranxita',
        };
      case 'cripta':
        return {
          overlayStyle: 'bg-emerald-950/30 mix-blend-color-burn',
          color: 'from-teal-950/45 via-zinc-950/90 to-black',
          glow: 'shadow-[inset_0_0_100px_rgba(20,184,166,0.15)]',
          label: 'La Cripta Primordial Escarlata',
        };
      default:
        return {
          overlayStyle: 'bg-transparent',
          color: 'from-transparent via-black/80 to-black',
          glow: 'none',
          label: 'Castillo Noctis',
        };
    }
  };

  const sceneInfo = getSceneFilters();

  return (
    <div className="relative w-full h-full flex flex-col justify-end items-center bg-black overflow-hidden select-none" id="game-playground">
      {/* 1. Backdrop image with parallax camera scale */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100 element-bg z-0"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />

      {/* 2. Ambient Atmosphere Grading Overlay */}
      <div className={`absolute inset-0 ${sceneInfo.overlayStyle} select-none pointer-events-none z-[1] transition-all duration-1000`} />
      <div className={`absolute inset-0 ${sceneInfo.glow} select-none pointer-events-none z-[13]`} />
      <div className={`absolute inset-0 bg-gradient-to-t ${sceneInfo.color} select-none pointer-events-none z-[2] transition-colors duration-1000`} />

      {/* Location Badge */}
      <div className="absolute top-[4vh] left-6 z-30 font-serif text-slate-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-950/40 text-[11px] tracking-widest flex items-center gap-1.5 select-none hover:border-red-500/50 transition-colors">
        <Compass className="w-3.5 h-3.5 text-red-500" />
        <span>{currentNode.sceneName || sceneInfo.label}</span>
      </div>

      {/* 3. Stats Button & Quick Menú HUD Bar */}
      <div className="absolute top-[4vh] right-6 z-30 flex items-center gap-2 select-none">
        
        {/* Quick Save Confirmation Banner */}
        <button
          onClick={onQuickSave}
          title="Guardado Rápido Automático"
          className="p-2 rounded bg-black/60 shadow-lg backdrop-blur-md hover:bg-zinc-950 hover:text-white text-zinc-400 border border-zinc-900 transition-colors cursor-pointer text-xs"
          id="hud-quicksave"
        >
          <Save className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onQuickLoad}
          title="Cargar Último Save Rápido"
          className="p-2 rounded bg-black/60 shadow-lg backdrop-blur-md hover:bg-zinc-950 hover:text-white text-zinc-400 border border-zinc-900 transition-colors cursor-pointer text-xs"
          id="hud-quickload"
        >
          <LogIn className="w-3.5 h-3.5" />
        </button>

        {/* STATS BUTTON (PRINCIPE BADGE) */}
        <button
          onClick={() => setShowStatsModal(true)}
          className="relative px-3.5 py-1.5 rounded-full bg-red-950/80 hover:bg-red-900 text-white font-serif text-xs tracking-wider border border-red-800/80 hover:border-red-500 ease-out transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.15)] cursor-pointer"
          id="hud-stats-toggle"
        >
          <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
          <span>Atributos</span>
        </button>

        {/* LOG OUT TO MENU */}
        <button
          onClick={onGoToMenu}
          title="Volver al Menú Principal"
          className="p-1.5 rounded bg-black/60 hover:bg-black text-red-400 border border-red-950 hover:border-red-500 transition-colors cursor-pointer duration-200"
          id="hud-menu-logout"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Character Visual Stage (Symmetrical Arrangement) */}
      <div className="absolute bottom-[24vh] left-0 right-0 h-[50vh] flex justify-center items-end px-12 z-10 pointer-events-none select-none">
        
        {/* Left Side: Aranxita (Protagonist Portrait) */}
        {(currentNode.portraitActive === 'aranxita' || currentNode.portraitActive === 'both') && (
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.93 }}
            animate={{ 
              opacity: currentNode.character === 'Franxito' ? 0.45 : 1, 
              x: 0, 
              scale: currentNode.character === 'Aranxita' ? 1.03 : 1 
            }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className={`w-[26rem] h-full flex justify-end items-end transition-transform duration-500 ${
              currentNode.character === 'Aranxita' ? 'z-20 scale-[1.03]' : 'z-10 brightness-75'
            }`}
          >
            <img 
              src={aranxitaUrl} 
              alt="Aranxita Princess" 
              referrerPolicy="no-referrer"
              className="max-h-[50vh] object-contain object-bottom drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] filter sharpen"
            />
          </motion.div>
        )}

        {/* Middle Empty Spine Balance */}
        <div className="flex-1 max-w-[8vw]" />

        {/* Right Side: Franxito (Love Interest Portrait) */}
        {(currentNode.portraitActive === 'franxito' || currentNode.portraitActive === 'both') && (
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.93 }}
            animate={{ 
              opacity: currentNode.character === 'Aranxita' ? 0.45 : 1, 
              x: 0, 
              scale: currentNode.character === 'Franxito' ? 1.03 : 1 
            }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className={`w-[26rem] h-full flex justify-start items-end transition-transform duration-500 ${
              currentNode.character === 'Franxito' ? 'z-20 scale-[1.03]' : 'z-10 brightness-75'
            }`}
          >
            <img 
              src={franxitoUrl} 
              alt="Franxito Vampire" 
              referrerPolicy="no-referrer"
              className="max-h-[50vh] object-contain object-bottom drop-shadow-[0_10px_35px_rgba(220,38,38,0.25)] filter sharpen"
            />
          </motion.div>
        )}
      </div>

      {/* 5. Custom Dialogue & Text Narrative Stage */}
      <div className="relative z-20 w-full max-w-4xl px-4 md:px-6 mb-4 flex flex-col items-center">
        
        {/* Choices overlying on top of dialog box when typewriter ends */}
        <AnimatePresence>
          {isTypewriterComplete && currentNode.choices && currentNode.choices.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-full flex flex-col gap-2.5 mb-5"
              id="game-choices-panel"
            >
              {currentNode.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => onChoiceSelect(choice)}
                  className="w-full text-left py-3 px-5 rounded bg-black/85 hover:bg-gradient-to-r hover:from-red-950/90 hover:to-zinc-950 hover:text-white border border-red-950/80 hover:border-red-500 text-slate-200 transition-all duration-300 font-serif tracking-wide text-xs md:text-sm pl-8 flex items-center justify-between shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer select-none relative group transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-red-500 w-4 font-bold select-none text-[11px]">0{idx + 1}.</span>
                    <span>{choice.text}</span>
                  </div>
                  
                  {choice.personalityTag && (
                    <span className="text-[10px] font-mono uppercase bg-red-950/60 text-red-400 group-hover:bg-red-900 group-hover:text-white px-2 py-0.5 rounded border border-red-900/30 transition-all">
                      {choice.personalityTag}
                    </span>
                  )}

                  {/* Red slide indicator on hover */}
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-red-600 rounded-l scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dialog Panel Screen */}
        <div 
          onClick={handleTypewriterSkip}
          className="w-full min-h-[140px] bg-slate-950/92 backdrop-blur-md rounded-lg border border-red-950/60 p-5 md:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.95)] flex flex-col cursor-pointer hover:border-red-900/80 transition-colors select-none relative"
          id="dialogue-box-panel"
        >
          {/* Active Speaker Name Plaques */}
          <div className="absolute -top-3.5 left-4 flex items-center select-none">
            {currentNode.character === 'Aranxita' ? (
              <div className="bg-gradient-to-r from-red-700 to-red-600 text-white font-serif text-xs px-4 py-1.5 rounded uppercase tracking-widest font-bold shadow-[0_4px_10px_rgba(220,38,38,0.3)] border border-red-400/20 flex items-center gap-1">
                <span>👑 Aranxita</span>
              </div>
            ) : currentNode.character === 'Franxito' ? (
              <div className="bg-gradient-to-r from-violet-950 to-indigo-900 text-slate-100 font-serif text-xs px-4 py-1.5 rounded uppercase tracking-widest font-bold border border-violet-500/20 shadow-[0_4px_10px_rgba(109,40,217,0.3)] flex items-center gap-1">
                <span>✦ Franxito</span>
              </div>
            ) : currentNode.character === 'Narrador' ? (
              <div className="bg-zinc-900 text-slate-400 font-mono text-[10px] px-3.5 py-1 rounded-sm uppercase tracking-widest border border-zinc-800">
                💡 Narración gótica
              </div>
            ) : (
              <div className="bg-amber-950 text-amber-200 font-serif text-[10px] px-3 py-1 rounded uppercase tracking-wider border border-amber-800">
                ✉️ Antigua Carta
              </div>
            )}
          </div>

          {/* Typewriter Output Text Area */}
          <div className="mt-2 text-slate-100 font-serif leading-relaxed text-sm md:text-base space-y-2 select-none h-full overflow-y-auto">
            {currentNode.character === 'Carta' ? (
              <blockquote className="italic border-l-2 border-amber-600/50 pl-4 text-amber-100/90 font-sans tracking-wide">
                "{displayedText}"
              </blockquote>
            ) : (
              <p className="tracking-wide">{displayedText}</p>
            )}
          </div>

          {/* Quick Engine Menu Panel (Mini bar inside dialogue frame) */}
          <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500 select-none">
            <div className="flex gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsAuto(prev => !prev); }}
                className={`hover:text-red-400 transition-colors uppercase cursor-pointer ${isAuto ? 'text-red-500 font-bold' : ''}`}
                title="Avanzar texto automáticamente"
              >
                Auto {isAuto ? '● ON' : '○'}
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenLog(); }}
                className="hover:text-red-400 transition-colors uppercase cursor-pointer flex items-center gap-1"
                title="Ver diálogos pasados"
              >
                <History className="w-2.5 h-2.5" />
                <span>Log</span>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); onOpenSaves(); }}
                className="hover:text-red-400 transition-colors uppercase cursor-pointer"
                title="Cargar guardados manuales de la partida"
              >
                Gestionar Saves
              </button>
            </div>

            {/* Ending manual trigger only if dialogue has endingId but no choices */}
            {isTypewriterComplete && currentNode.endingId && (!currentNode.choices || currentNode.choices.length === 0) && (
              <button
                onClick={(e) => { e.stopPropagation(); onForceEnding(currentNode.endingId!); }}
                className="px-3.5 py-1.5 rounded-sm bg-red-900 hover:bg-red-800 border border-red-500 text-white animate-bounce flex items-center gap-1.5 text-xs font-serif uppercase cursor-pointer shadow-lg shadow-red-500/10"
              >
                <span>Finalizar Historia</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Pulsing prompt to advance when typewriter in progress */}
            {!isTypewriterComplete && (
              <span className="text-zinc-600 text-[9px] animate-pulse">Imprimiendo pergamino...</span>
            )}
            
            {isTypewriterComplete && !currentNode.choices?.length && !currentNode.endingId && (
              <span className="text-red-500 text-[10px] flex items-center gap-1 animate-pulse">
                <span>Haz click para proceder</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 6. ATRIBUTOS MODAL PORTFOLIO (Saves & statistics panel overlay) */}
      <AnimatePresence>
        {showStatsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none"
            id="attributes-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="bg-zinc-950 border border-red-900/60 p-6 rounded-lg w-full max-w-xl shadow-[0_20px_50px_rgba(220,38,38,0.15)] flex flex-col relative"
            >
              {/* Seal design */}
              <div className="absolute top-4 right-4 text-xs font-mono text-zinc-600 select-none">
                SELLO IMPERIAL DE ARANXITA
              </div>

              <h2 className="font-serif text-2xl text-white uppercase tracking-widest border-b border-red-950 pb-2.5 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-500" />
                <span>Atributos Oscuros</span>
              </h2>

              {/* Sub-card: Core personality badge */}
              <div className="mt-4 p-3.5 bg-red-950/20 border border-red-950/50 rounded flex items-center gap-4">
                <div className="w-12 h-12 bg-cover rounded-full border border-red-800 overflow-hidden flex-shrink-0">
                  <img 
                    src={aranxitaUrl} 
                    alt="Aranxita Micro" 
                    className="w-full h-full object-cover object-top scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">
                    Temperamento Dominante
                  </div>
                  <div className="text-base font-serif text-white uppercase tracking-wider font-bold">
                    {getDominantPersonality()}
                  </div>
                </div>
              </div>

              {/* Grid of stats */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* ROMANCE */}
                <div className="flex flex-col gap-1.5" id="attr-romance">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-red-400 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span>Romance</span>
                    </span>
                    <span className="text-white font-bold">{stats.romance} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(stats.romance * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* CONFIANZA */}
                <div className="flex flex-col gap-1.5" id="attr-confianza">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-violet-400 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Confianza</span>
                    </span>
                    <span className="text-white font-bold">{stats.confianza} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-800 to-violet-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(stats.confianza * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* CURIOSIDAD */}
                <div className="flex flex-col gap-1.5" id="attr-curiosidad">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-teal-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Curiosidad</span>
                    </span>
                    <span className="text-white font-bold">{stats.curiosidad} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-800 to-teal-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(stats.curiosidad * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* VALENTÍA */}
                <div className="flex flex-col gap-1.5" id="attr-valentia">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-amber-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Valentía</span>
                    </span>
                    <span className="text-white font-bold">{stats.valentia} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-800 to-amber-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(stats.valentia * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* COMPLICIDAD */}
                <div className="flex flex-col gap-1.5" id="attr-complicidad">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-sky-450 text-indigo-400 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Complicidad</span>
                    </span>
                    <span className="text-white font-bold">{stats.complicidad} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-800 to-sky-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(stats.complicidad * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* MISTERIO */}
                <div className="flex flex-col gap-1.5" id="attr-misterio">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-pink-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>Misterio</span>
                    </span>
                    <span className="text-white font-bold">{stats.misterio} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-800 to-fuchsia-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(stats.misterio * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* List of responses tracked */}
              <div className="mt-5 text-[11px] font-mono text-zinc-500 leading-relaxed border-t border-zinc-900 pt-3">
                <span className="text-zinc-400">Arquetipos cosechados:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(personalityCounts).map(([tag, count]) => {
                    if (count === 0) return null;
                    return (
                      <span key={tag} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-slate-300">
                        {tag}: <strong className="text-white">{count}</strong>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowStatsModal(false)}
                className="mt-6 w-full py-2 bg-zinc-900 hover:bg-red-950 hover:text-white text-slate-300 rounded border border-zinc-800 hover:border-red-800 text-xs font-serif uppercase tracking-widest transition-all cursor-pointer"
              >
                Cerrar Atributos
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
