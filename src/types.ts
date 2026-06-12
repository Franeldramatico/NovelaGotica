/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Stats {
  romance: number;     // Romantic dynamic
  confianza: number;   // Trust scale
  curiosidad: number;  // Desire to investigate secrets
  valentia: number;    // Feisty or bold responses
  honestidad: number;  // Sincerity versus playfulness
  complicidad: number; // Mutual understanding and chemistry
  atraccion: number;   // Physical / hypnotic tension
  misterio: number;    // Secret keeping
}

export interface Choice {
  text: string;
  nextNodeId: string;
  statsMod?: Partial<Stats>;
  personalityTag?: 'Dulce' | 'Coqueta' | 'Sarcástica' | 'Desconfiada' | 'Curiosa' | 'Valiente' | 'Reservada';
}

export type ScenePlace =
  | 'vestibulo'
  | 'balcon'
  | 'biblioteca'
  | 'jardin'
  | 'chimenea'
  | 'habitacion'
  | 'torre'
  | 'cripta'
  | 'salon_baile';

export interface DialogueNode {
  id: string;
  character: 'Aranxita' | 'Franxito' | 'Narrador' | 'Carta' | 'Castillo';
  text: string;
  choices?: Choice[];
  sceneName?: string; // Human readable location (e.g. "El Vestíbulo Susurrante")
  background: ScenePlace; // For active styling
  portraitActive?: 'aranxita' | 'franxito' | 'both' | 'none';
  emotion?: 'normal' | 'happy' | 'mysterious' | 'surprised' | 'intense' | 'shy';
  endingId?: number; // 1 to 15 if this node is an ending!
}

export interface GameSave {
  id: string;
  date: string;
  currentNodeId: string;
  stats: Stats;
  personalityCounts: Record<string, number>;
  dialogLog: { character: string; text: string; id: string }[];
}

export interface Ending {
  id: number;
  title: string;
  description: string;
  type: 'perfect' | 'romantic' | 'companion' | 'royal' | 'secret' | 'melancholic' | 'danger';
}
