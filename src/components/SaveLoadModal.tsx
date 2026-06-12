import React from 'react';
import { motion } from 'motion/react';
import { X, Save, LogIn, Trash2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { GameSave } from '../types';

interface SaveLoadModalProps {
  onClose: () => void;
  saves: GameSave[];
  onSaveSlot: (slotId: string) => void;
  onLoadSlot: (slotId: string) => void;
  onDeleteSlot: (slotId: string) => void;
  canSave?: boolean; // If in menu, cannot save, only load!
}

export default function SaveLoadModal({
  onClose,
  saves,
  onSaveSlot,
  onLoadSlot,
  onDeleteSlot,
  canSave = true,
}: SaveLoadModalProps) {
  const slots = ['slot_1', 'slot_2', 'slot_3', 'slot_4'];

  const getSaveForSlot = (slotId: string) => {
    return saves.find(s => s.id === slotId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none text-slate-100"
      id="save-load-system-modal"
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="w-full max-w-lg bg-zinc-950 border border-red-950/60 p-6 rounded-lg shadow-2xl relative flex flex-col"
        id="save-load-box"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-red-950 pb-3 mb-4 select-none">
          <h3 className="font-serif text-lg uppercase tracking-widest text-white flex items-center gap-2">
            <Save className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Cinta de Recuerdos Inmortales</span>
          </h3>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-zinc-900 border border-zinc-950 hover:border-red-950 hover:bg-zinc-950 text-slate-400 hover:text-white cursor-pointer transition-colors"
            id="save-btn-close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <p className="text-[11px] text-zinc-500 select-none mb-4 leading-relaxed border-b border-zinc-900 pb-3 font-mono uppercase">
          {canSave 
            ? 'Guarda tu viaje o recura una senda nocturna anterior para explorar distintos finales góticos.'
            : 'Solo lectura: selecciona una partida guardada previamente para continuar la aventura.'}
        </p>

        {/* Scrollable Slots Grid */}
        <div className="space-y-3 flex-1 overflow-y-auto max-h-[50vh] pr-1">
          {slots.map((slotId, index) => {
            const gameSave = getSaveForSlot(slotId);

            return (
              <div
                key={slotId}
                className="p-4 rounded border border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors flex items-center justify-between gap-4"
                id={`save-slot-row-${slotId}`}
              >
                {/* Slot index identifier */}
                <div className="flex-shrink-0 text-center w-14 border-r border-zinc-900 pr-3 select-none">
                  <span className="block text-[8px] text-zinc-500 uppercase font-mono">Espacio</span>
                  <span className="font-serif text-xl font-bold text-red-500">0{index + 1}</span>
                </div>

                {/* Slot Content info */}
                <div className="flex flex-1 flex-col min-w-0">
                  {gameSave ? (
                    <>
                      {/* Meta information row */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-mono text-zinc-500 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{gameSave.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-red-400 font-bold">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>Partida en marcha</span>
                        </span>
                      </div>

                      {/* Dialogue text preview */}
                      <p className="text-xs text-slate-300 font-serif italic line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
                        "{gameSave.dialogLog[gameSave.dialogLog.length -1]?.text || 'Historia en curso'}"
                      </p>

                      {/* Micro scores summary */}
                      <div className="flex gap-3 text-[9px] font-mono text-zinc-500 border-t border-zinc-950 pt-1.5 mt-1.5">
                        <span>Rom: <strong className="text-red-400">{gameSave.stats.romance}</strong></span>
                        <span>Conf: <strong className="text-violet-400">{gameSave.stats.confianza}</strong></span>
                        <span>Cur: <strong className="text-teal-400">{gameSave.stats.curiosidad}</strong></span>
                        <span>Val: <strong className="text-amber-400">{gameSave.stats.valentia}</strong></span>
                      </div>
                    </>
                  ) : (
                    <div className="text-zinc-650 italic font-serif text-xs text-zinc-600 flex items-center gap-2 select-none h-[54px] pl-2">
                      <span>Pergamino virgen listo para grabar...</span>
                    </div>
                  )}
                </div>

                {/* Quick actions box */}
                <div className="flex flex-shrink-0 gap-1.5 items-center">
                  {canSave && (
                    <button
                      onClick={() => onSaveSlot(slotId)}
                      className="p-2 rounded bg-zinc-900 hover:bg-emerald-950 hover:text-white text-emerald-500 border border-zinc-950 hover:border-emerald-900 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                      title="Grabar partida actual aquí"
                    >
                      <Save className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => onLoadSlot(slotId)}
                    disabled={!gameSave}
                    className={`p-2 rounded border transition-colors text-xs flex items-center gap-1.5 ${
                      gameSave
                        ? 'bg-zinc-900 hover:bg-violet-950 hover:text-white text-violet-400 border-zinc-950 hover:border-violet-900 cursor-pointer'
                        : 'bg-zinc-950 text-zinc-800 border-zinc-900/50 cursor-not-allowed'
                    }`}
                    title="Cargar esta partida guardada"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteSlot(slotId)}
                    disabled={!gameSave}
                    className={`p-2 rounded border transition-colors text-xs ${
                      gameSave
                        ? 'bg-zinc-900 hover:bg-red-950 hover:text-white text-red-500 border-zinc-950 hover:border-red-900 cursor-pointer'
                        : 'bg-zinc-950 text-zinc-800 border-zinc-900/50 cursor-not-allowed'
                    }`}
                    title="Borrar archivo de guardado"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info lock indicator */}
        <div className="text-[9px] font-mono text-center text-zinc-600 border-t border-zinc-900 mt-4 pt-3 uppercase tracking-wider select-none">
          Castillo Noctis • Almacenamiento Local Criptográfico Seguro
        </div>
      </motion.div>
    </motion.div>
  );
}
