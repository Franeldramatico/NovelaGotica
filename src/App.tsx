/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORY_NODES, ENDINGS_DATA } from './data/story';
import { Stats, GameSave, Choice } from './types';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import GalleryScreen from './components/GalleryScreen';
import CreditsScreen from './components/CreditsScreen';
import SaveLoadModal from './components/SaveLoadModal';
import HistoryLog from './components/HistoryLog';
import ConfigModal from './components/ConfigModal';
import GothicEffects from './components/GothicEffects';
import { playAmbientTick, playGothicBell, playTriumphantEndingChime } from './utils/audio';
import castleBg from './assets/images/castle_noctis_bg_1781224529739.jpg';
import franxito from './assets/images/franxito_portrait_1781224544891.jpg';
import aranxita from './assets/images/aranxita_portrait_1781224557600.jpg';

const IMAGES = { castleBg, franxito, aranxita };

const DEFAULT_STATS: Stats = {
  romance: 1,
  confianza: 1,
  curiosidad: 1,
  valentia: 1,
  honestidad: 1,
  complicidad: 1,
  atraccion: 1,
  misterio: 1,
};

const DEFAULT_PERSONALITY_COUNTS: Record<string, number> = {
  Coqueta: 0,
  Dulce: 0,
  Sarcástica: 0,
  Desconfiada: 0,
  Curiosa: 0,
  Valiente: 0,
  Reservada: 0,
};

export default function App() {
  // Screens state: 'menu' | 'game' | 'gallery' | 'credits'
  const [screen, setScreen] = useState<'menu' | 'game' | 'gallery' | 'credits'>('menu');

  // Game Progress States
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);
  const [personalityCounts, setPersonalityCounts] = useState<Record<string, number>>(DEFAULT_PERSONALITY_COUNTS);
  const [dialogLog, setDialogLog] = useState<{ character: string; text: string; id: string }[]>([]);

  // Globally persisted cross-session stats
  const [unlockedEndings, setUnlockedEndings] = useState<number[]>([]);
  const [unlockedScenes, setUnlockedScenes] = useState<string[]>([]);
  const [saves, setSaves] = useState<GameSave[]>([]);

  // Post ending view summary config
  const [completedEndingId, setCompletedEndingId] = useState<number | null>(null);

  // Layout parameters
  const [textSpeed, setTextSpeed] = useState<number>(22);

  // Active Open Modals
  const [showSavesModal, setShowSavesModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isSavesModalSaveOnly, setIsSavesModalSaveOnly] = useState(true);

  // Load unlocked values from LocalStorage on component mount
  useEffect(() => {
    try {
      const storedEndings = localStorage.getItem('aranxita_endings');
      if (storedEndings) setUnlockedEndings(JSON.parse(storedEndings));

      const storedScenes = localStorage.getItem('aranxita_scenes');
      if (storedScenes) setUnlockedScenes(JSON.parse(storedScenes));

      const storedSaves = localStorage.getItem('aranxita_saves');
      if (storedSaves) setSaves(JSON.parse(storedSaves));
    } catch (e) {
      console.error('LocalStorage load failed: ', e);
    }
  }, []);

  // Sync state data helper
  const syncSavesToLocal = (updatedSaves: GameSave[]) => {
    setSaves(updatedSaves);
    localStorage.setItem('aranxita_saves', JSON.stringify(updatedSaves));
  };

  // Automated Quick Save (autosave) on each choice selection
  const makeAutosave = (nodeId: string, currentStats: Stats, counts: Record<string, number>, log: typeof dialogLog) => {
    try {
      const autosavePayload: GameSave = {
        id: 'autosave',
        date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' - Autosave',
        currentNodeId: nodeId,
        stats: currentStats,
        personalityCounts: counts,
        dialogLog: log,
      };
      
      const filtered = saves.filter(s => s.id !== 'autosave');
      const updated = [autosavePayload, ...filtered];
      syncSavesToLocal(updated);
    } catch (e) {
      // Ignored
    }
  };

  // 1. NUEVA PARTIDA Setup
  const handleNewGame = () => {
    playGothicBell();
    
    // Clear current run states
    setCurrentNodeId('start');
    setStats({ ...DEFAULT_STATS });
    setPersonalityCounts({ ...DEFAULT_PERSONALITY_COUNTS });
    
    // First record introduction dialogue in log template
    const startingNode = STORY_NODES['start'];
    const initialLog = [{ 
      character: startingNode.character, 
      text: startingNode.text, 
      id: startingNode.id 
    }];
    setDialogLog(initialLog);
    setCompletedEndingId(null);

    // Persist discovered scenes tracker
    if (!unlockedScenes.includes(startingNode.background)) {
      const updatedScenes = [...unlockedScenes, startingNode.background];
      setUnlockedScenes(updatedScenes);
      localStorage.setItem('aranxita_scenes', JSON.stringify(updatedScenes));
    }

    setScreen('game');
    makeAutosave('start', DEFAULT_STATS, DEFAULT_PERSONALITY_COUNTS, initialLog);
  };

  // 2. CONTINUAR Setup
  const handleContinue = () => {
    playAmbientTick();
    const autosave = saves.find(s => s.id === 'autosave');
    if (autosave) {
      setCurrentNodeId(autosave.currentNodeId);
      setStats(autosave.stats);
      setPersonalityCounts(autosave.personalityCounts);
      setDialogLog(autosave.dialogLog);
      setCompletedEndingId(null);
      setScreen('game');
    }
  };

  // 3. DIALOGUE CHOICE SELECTION
  const handleChoiceSelect = (choice: Choice) => {
    playAmbientTick();

    // 3a. Update attributes stats safely
    const updatedStats = { ...stats };
    if (choice.statsMod) {
      Object.entries(choice.statsMod).forEach(([key, val]) => {
        const statsKey = key as keyof Stats;
        updatedStats[statsKey] = Math.max(0, Math.min(10, (updatedStats[statsKey] || 0) + val));
      });
    }
    setStats(updatedStats);

    // 3b. Update personality tags
    const updatedCounts = { ...personalityCounts };
    if (choice.personalityTag) {
      updatedCounts[choice.personalityTag] = (updatedCounts[choice.personalityTag] || 0) + 1;
      setPersonalityCounts(updatedCounts);
    }

    // 3c. Get target dialog node info
    const targetNode = STORY_NODES[choice.nextNodeId];
    if (!targetNode) return;

    // 3d. Update dialogue history log
    const updatedLog = [
      ...dialogLog,
      { character: 'Aranxita', text: choice.text, id: `${currentNodeId}_choice` },
      { character: targetNode.character, text: targetNode.text, id: targetNode.id }
    ];
    setDialogLog(updatedLog);

    // 3e. Update scene explored listing
    if (!unlockedScenes.includes(targetNode.background)) {
      const updatedScenes = [...unlockedScenes, targetNode.background];
      setUnlockedScenes(updatedScenes);
      localStorage.setItem('aranxita_scenes', JSON.stringify(updatedScenes));
    }

    // 3f. Advance node route
    setCurrentNodeId(choice.nextNodeId);

    // 3g. Trigger ending node immediately if mapped
    if (targetNode.endingId) {
      handleCompleteEnding(targetNode.endingId);
      return;
    }

    // 3h. Build run state autosave file
    makeAutosave(choice.nextNodeId, updatedStats, updatedCounts, updatedLog);
  };

  // 4. DIALOG BOX ADVANCED FLOW (Simple skip proceeding if there are no choices)
  const handleNextDialogueStep = () => {
    const activeNode = STORY_NODES[currentNodeId];
    
    // If there are no choices and this isn't an ending, let's proceed to single choice nextNodeId or trigger fallback
    if (isSavesModalSaveOnly) {
      // safe trigger
    }
  };

  // 5. UNLOCKING COMPLETED ENDING OUTCOME
  const handleCompleteEnding = (endingId: number) => {
    playTriumphantEndingChime();

    // Persist discovered ending
    let updatedEndings = [...unlockedEndings];
    if (!unlockedEndings.includes(endingId)) {
      updatedEndings.push(endingId);
      setUnlockedEndings(updatedEndings);
      localStorage.setItem('aranxita_endings', JSON.stringify(updatedEndings));
    }

    setCompletedEndingId(endingId);
    setScreen('credits');

    // Wipe active autosave to avoid restarting at ending node on Continue click
    const filteredSaves = saves.filter(s => s.id !== 'autosave');
    syncSavesToLocal(filteredSaves);
  };

  // 6. QUICK HUD ACTIONS (Rapid save slot triggers)
  const handleQuickSave = () => {
    playAmbientTick();
    const quickPayload: GameSave = {
      id: 'quick_save',
      date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' - Ranura Rápida',
      currentNodeId: currentNodeId,
      stats: stats,
      personalityCounts: personalityCounts,
      dialogLog: dialogLog,
    };
    const filtered = saves.filter(s => s.id !== 'quick_save');
    syncSavesToLocal([quickPayload, ...filtered]);
    alert('Progreso rápido memorizado bajo el Linaje de Plata.');
  };

  const handleQuickLoad = () => {
    playAmbientTick();
    const quickSave = saves.find(s => s.id === 'quick_save');
    if (quickSave) {
      setCurrentNodeId(quickSave.currentNodeId);
      setStats(quickSave.stats);
      setPersonalityCounts(quickSave.personalityCounts);
      setDialogLog(quickSave.dialogLog);
      setCompletedEndingId(null);
      alert('Tu memoria ha regresado al instante de la ranura rápida.');
    } else {
      alert('No has guardado de forma rápida aún en esta noche (Usa el botón de Guardar primero).');
    }
  };

  // 7. SLOT MANUAL MANAGEMENT (Saves modal panel)
  const handleSaveSlot = (slotId: string) => {
    playAmbientTick();
    const savePayload: GameSave = {
      id: slotId,
      date: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      currentNodeId: currentNodeId,
      stats: stats,
      personalityCounts: personalityCounts,
      dialogLog: dialogLog,
    };
    
    const filtered = saves.filter(s => s.id !== slotId);
    syncSavesToLocal([savePayload, ...filtered]);
  };

  const handleLoadSlot = (slotId: string) => {
    playGothicBell();
    const activeSave = saves.find(s => s.id === slotId);
    if (activeSave) {
      setCurrentNodeId(activeSave.currentNodeId);
      setStats(activeSave.stats);
      setPersonalityCounts(activeSave.personalityCounts);
      setDialogLog(activeSave.dialogLog);
      setCompletedEndingId(null);
      setShowSavesModal(false);
      setScreen('game');
    }
  };

  const handleDeleteSlot = (slotId: string) => {
    playAmbientTick();
    const filtered = saves.filter(s => s.id !== slotId);
    syncSavesToLocal(filtered);
  };

  // 8. DATA FACTORY PURGE (Config panel wipe)
  const handleClearAllProgress = () => {
    localStorage.removeItem('aranxita_endings');
    localStorage.removeItem('aranxita_scenes');
    localStorage.removeItem('aranxita_saves');
    
    setUnlockedEndings([]);
    setUnlockedScenes([]);
    setSaves([]);
    setStats({ ...DEFAULT_STATS });
    setPersonalityCounts({ ...DEFAULT_PERSONALITY_COUNTS });
    setDialogLog([]);
    setCurrentNodeId('start');
    setScreen('menu');
  };

  const activeNode = STORY_NODES[currentNodeId] || STORY_NODES['start'];
  const hasAutosave = saves.some(s => s.id === 'autosave');

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans select-none" id="applet-viewport">
      {/* Immersive weather, snow, bats and fog effects layer */}
      <GothicEffects />

      {/* Screen Routing with smooth transition fading */}
      <AnimatePresence mode="wait">
        {screen === 'menu' && (
          <motion.div
            key="menu-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <MainMenu
              onNewGame={handleNewGame}
              onContinue={handleContinue}
              hasSave={hasAutosave}
              onOpenSaves={() => { playAmbientTick(); setIsSavesModalSaveOnly(false); setShowSavesModal(true); }}
              onOpenGallery={() => { playAmbientTick(); setScreen('gallery'); }}
              onOpenCredits={() => { playAmbientTick(); setCompletedEndingId(null); setScreen('credits'); }}
              onOpenConfig={() => { playAmbientTick(); setShowConfigModal(true); }}
              backgroundUrl={IMAGES.castleBg}
            />
          </motion.div>
        )}

        {screen === 'game' && (
          <motion.div
            key="game-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <GameScreen
              currentNode={activeNode}
              onChoiceSelect={handleChoiceSelect}
              stats={stats}
              personalityCounts={personalityCounts}
              dialogLog={dialogLog}
              onQuickSave={handleQuickSave}
              onQuickLoad={handleQuickLoad}
              onGoToMenu={() => { playAmbientTick(); setScreen('menu'); }}
              onForceEnding={handleCompleteEnding}
              backgroundUrl={IMAGES.castleBg}
              franxitoUrl={IMAGES.franxito}
              aranxitaUrl={IMAGES.aranxita}
              onOpenSaves={() => { playAmbientTick(); setIsSavesModalSaveOnly(true); setShowSavesModal(true); }}
              onOpenLog={() => { playAmbientTick(); setShowLogModal(true); }}
            />
          </motion.div>
        )}

        {screen === 'gallery' && (
          <motion.div
            key="gallery-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <GalleryScreen
              unlockedEndings={unlockedEndings}
              unlockedScenes={unlockedScenes}
              onBack={() => { playAmbientTick(); setScreen('menu'); }}
              backgroundUrl={IMAGES.castleBg}
            />
          </motion.div>
        )}

        {screen === 'credits' && (
          <motion.div
            key="credits-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <CreditsScreen
              completedEndingId={completedEndingId}
              stats={stats}
              personalityCounts={personalityCounts}
              onRestart={handleNewGame}
              onGoToMenu={() => { playAmbientTick(); setScreen('menu'); }}
              onGoToGallery={() => { playAmbientTick(); setScreen('gallery'); }}
              backgroundUrl={IMAGES.castleBg}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== LAYOVER OVERLAYS & MODALS ==================== */}

      {/* A. SAVE/LOAD MODAL */}
      <AnimatePresence>
        {showSavesModal && (
          <SaveLoadModal
            onClose={() => { playAmbientTick(); setShowSavesModal(false); }}
            saves={saves}
            onSaveSlot={handleSaveSlot}
            onLoadSlot={handleLoadSlot}
            onDeleteSlot={handleDeleteSlot}
            canSave={isSavesModalSaveOnly}
          />
        )}
      </AnimatePresence>

      {/* B. ACTION HISTORIAL LOG MODAL */}
      <AnimatePresence>
        {showLogModal && (
          <HistoryLog
            dialogues={dialogLog}
            onClose={() => { playAmbientTick(); setShowLogModal(false); }}
            onClear={() => { playAmbientTick(); setDialogLog([]); }}
          />
        )}
      </AnimatePresence>

      {/* C. CONFIGURATION SETTINGS MODAL */}
      <AnimatePresence>
        {showConfigModal && (
          <ConfigModal
            onClose={() => { playAmbientTick(); setShowConfigModal(false); }}
            onClearAllProgress={handleClearAllProgress}
            textSpeed={textSpeed}
            onTextSpeedChange={setTextSpeed}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
