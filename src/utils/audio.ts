/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Safe synthesizer using Web Audio API to prevent iframe warnings
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playAmbientTick() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {
    // Audio context permissions block is safe to discard
  }
}

export function playGothicBell() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Low bell note + high glass chime harmonics
    const tones = [220, 330, 440, 554, 880];
    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      const volume = idx === 0 ? 0.08 : 0.03 / idx;
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 - (idx * 0.2));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(now + 2.0);
    });
  } catch (e) {
    // Handled
  }
}

export function playTriumphantEndingChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Minor chord progression for gothic mystery (A minor: A, C, E)
    const notes = [220, 261.63, 329.63, 440, 523.25, 659.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + (idx * 0.08)); // sweep arpeggio!

      gain.gain.setValueAtTime(0.05, now + (idx * 0.08));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + (idx * 0.08));
      osc.stop(now + 3.0);
    });
  } catch (e) {
    // Handled
  }
}
