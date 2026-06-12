import React from 'react';
import { motion } from 'motion/react';
import { X, Settings, HelpCircle, AlertCircle, RefreshCw, Trash2, Sliders } from 'lucide-react';

interface ConfigModalProps {
  onClose: () => void;
  onClearAllProgress: () => void;
  textSpeed: number;
  onTextSpeedChange: (speed: number) => void;
}

export default function ConfigModal({
  onClose,
  onClearAllProgress,
  textSpeed,
  onTextSpeedChange,
}: ConfigModalProps) {

  const handleResetClick = () => {
    if (confirm('¿Estás absolutamente segura de que deseas purgar todo tu progreso?\nEsto borrará tus archivos de guardado y vaciará la Cámara de Memorias (Galería) por completo. Esta acción es irreversible.')) {
      onClearAllProgress();
      alert('Toda la memoria de Castillo Noctis ha sido drenada con éxito.');
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none text-slate-100"
      id="config-system-modal"
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-6 rounded-lg shadow-2xl relative flex flex-col"
        id="config-box"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 select-none">
          <h3 className="font-serif text-lg uppercase tracking-widest text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-violet-500" />
            <span>Configuración Nocturna</span>
          </h3>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-zinc-900 border border-zinc-950 hover:border-violet-950 hover:bg-zinc-950 text-slate-400 hover:text-white cursor-pointer transition-colors"
            id="config-btn-close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Configurations list */}
        <div className="space-y-6 flex-1 py-2">
          
          {/* A. TEXT SPEED OPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-serif uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-red-500" />
              <span>Velocidad de Escritura Gótica</span>
            </label>
            <p className="text-[10px] text-zinc-500 font-sans italic leading-relaxed">
              Configura cuán lento o rápido se revelan las palabras de la profecía en el pergamino.
            </p>
            
            <div className="flex items-center gap-4 mt-1.5">
              <span className="text-[10px] uppercase font-mono text-zinc-650 text-zinc-500">Normal</span>
              <input 
                type="range"
                min="5"
                max="50"
                step="5"
                value={textSpeed}
                onChange={(e) => onTextSpeedChange(Number(e.target.value))}
                className="flex-1 accent-red-650 bg-zinc-900 h-1.5 rounded-full outline-none"
              />
              <span className="text-[10px] uppercase font-mono text-zinc-650 text-zinc-500">Mágica</span>
            </div>
            <div className="text-[9px] font-mono text-right text-red-400">
              Valor actual: {textSpeed} ms entre letras
            </div>
          </div>

          <div className="h-[1px] bg-zinc-900" />

          {/* B. DANGER ZONE - PURGE DATA */}
          <div className="p-4 rounded border border-red-950 bg-red-950/15 flex flex-col gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-serif uppercase tracking-widest text-red-400 font-bold">
                  Zona de Sacrificio
                </span>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed mt-1">
                  Reinicio absoluto de memorias: purga la bitácora, vacía tus ranuras de guardado y los finales de la galería.
                </p>
              </div>
            </div>

            <button
              onClick={handleResetClick}
              className="w-full py-2 bg-red-950 hover:bg-red-900 text-white font-serif text-xs uppercase tracking-widest transition-all rounded cursor-pointer border border-red-800 hover:border-red-500 flex items-center justify-center gap-2 shadow shadow-red-500/10"
              id="btn-purge-data"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Borrar Todo el Progreso</span>
            </button>
          </div>

        </div>

        {/* Footer info lock indicator */}
        <div className="text-[9px] font-mono text-center text-zinc-600 border-t border-zinc-900 mt-5 pt-3 uppercase tracking-wider select-none">
          Castillo Noctis • Motor de Estilos V1.2.0
        </div>
      </motion.div>
    </motion.div>
  );
}
