import React from 'react';
import { motion } from 'motion/react';
import { X, History, Trash2 } from 'lucide-react';

interface HistoryLogProps {
  dialogues: { character: string; text: string; id: string }[];
  onClose: () => void;
  onClear?: () => void;
}

export default function HistoryLog({
  dialogues,
  onClose,
  onClear,
}: HistoryLogProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex justify-end select-none"
      id="dialogue-history-log-modal"
    >
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-zinc-950 border-l border-red-950/40 h-full flex flex-col p-6 shadow-2xl relative text-slate-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 select-none">
          <h3 className="font-serif text-lg text-white uppercase tracking-widest flex items-center gap-1.5">
            <History className="w-4 h-4 text-red-500" />
            <span>Bitácora de Eventos</span>
          </h3>

          <div className="flex items-center gap-2">
            {onClear && dialogues.length > 0 && (
              <button
                onClick={onClear}
                className="p-1 px-2 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-transparent hover:border-red-950 text-[10px] font-mono uppercase tracking-wider rounded cursor-pointer transition-colors"
                title="Limpiar historial"
              >
                <span>Limpiar</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-red-850 hover:bg-zinc-950 text-slate-400 hover:text-white transition-colors cursor-pointer"
              id="history-btn-close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable text area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 select-none scrollbar-thin scrollbar-thumb-zinc-850 scrollbar-track-transparent">
          {dialogues.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-zinc-600 font-serif italic py-12">
              <p>El pergamino está vacío...</p>
              <p className="text-[10px] font-sans mt-1">Los diálogos se registrarán conforme transcurra la noche.</p>
            </div>
          ) : (
            dialogues.map((log, index) => {
              const isAranxita = log.character === 'Aranxita';
              const isFranxito = log.character === 'Franxito';
              const isNarrador = log.character === 'Narrador';

              return (
                <div 
                  key={log.id || index}
                  className={`p-3.5 rounded border ${
                    isAranxita 
                      ? 'bg-red-950/10 border-red-950/30 pl-5' 
                      : isFranxito 
                      ? 'bg-violet-950/10 border-violet-950/20' 
                      : 'bg-zinc-900/40 border-zinc-900/50'
                  }`}
                  id={`history-log-row-${index}`}
                >
                  <div className="flex items-center gap-2 mb-1 select-none">
                    <span className={`text-[10px] uppercase font-mono tracking-widest font-extrabold ${
                      isAranxita 
                        ? 'text-red-500' 
                        : isFranxito 
                        ? 'text-violet-400' 
                        : 'text-zinc-500'
                    }`}>
                      {isAranxita ? '👑 Aranxita' : isFranxito ? '✦ Franxito' : '💡 Narrador'}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-600">Nº {index + 1}</span>
                  </div>
                  
                  <p className="text-xs md:text-sm font-serif text-slate-300 tracking-wide leading-relaxed">
                    {log.text}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info badge */}
        <div className="text-[10px] font-mono text-zinc-600 border-t border-zinc-900 pt-3 select-none text-center">
          Castillo Noctis • {dialogues.length} registros guardados en cinta de runas
        </div>
      </motion.div>
    </motion.div>
  );
}
