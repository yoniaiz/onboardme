/**
 * Game Data — Combines all chapter definitions into flat lookup structures.
 *
 * This module is the single source of truth for game structure.
 * It imports per-chapter files from ./chapters/ and builds:
 *
 *   GAME_FLOW  — ordered array of step IDs ("chapter:phase")
 *   PHASES     — flat map of step ID → { instruction, scoring, tips }
 *   CHAPTERS   — flat map of chapter ID → { name, number, moodRange, memoryLog }
 *
 * To modify the game, edit the individual chapter files in ./chapters/.
 */

const investigation = require("./chapters/investigation.cjs");
const deepDive = require("./chapters/deep-dive.cjs");
const hunt = require("./chapters/hunt.cjs");
const boss = require("./chapters/boss.cjs");

// Chapter order — the linear progression
const CHAPTER_ORDER = ["investigation", "deep-dive", "hunt", "boss"];

// Chapter definitions keyed by ID
const CHAPTER_DEFS = {
  investigation,
  "deep-dive": deepDive,
  hunt,
  boss,
};

// Build the flat ordered array of step IDs
const GAME_FLOW = [];
for (const chapterId of CHAPTER_ORDER) {
  for (const phase of CHAPTER_DEFS[chapterId].phases) {
    GAME_FLOW.push(`${chapterId}:${phase.id}`);
  }
}

// Build the flat phase lookup map
const PHASES = {};
for (const chapterId of CHAPTER_ORDER) {
  for (const phase of CHAPTER_DEFS[chapterId].phases) {
    const stepId = `${chapterId}:${phase.id}`;
    PHASES[stepId] = {
      instruction: phase.instruction,
      scoring: phase.scoring,
      tips: phase.tips,
    };
  }
}

// Build the chapter metadata map (for ceremonies + rules)
const CHAPTERS = {};
for (const chapterId of CHAPTER_ORDER) {
  const ch = CHAPTER_DEFS[chapterId];
  CHAPTERS[chapterId] = {
    name: ch.name,
    number: ch.number,
    moodRange: ch.moodRange,
    memoryLog: ch.memoryLog,
    rules: ch.rules || [],
  };
}

module.exports = {
  GAME_FLOW,
  PHASES,
  CHAPTERS,
  CHAPTER_ORDER,
};
