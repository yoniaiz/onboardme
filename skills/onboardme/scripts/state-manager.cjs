#!/usr/bin/env node

/**
 * OnboardMe State Manager — Script-Driven Game Engine (v2)
 *
 * Two commands drive the entire game:
 *   resume        — "Where am I? What should I do?"
 *   complete-step — "Phase done, here are the results, what's next?"
 *
 * The script is the state machine. The agent follows its output.
 */

const fs = require("node:fs");
const path = require("node:path");

// --- Game data (imported from chapter files) ---
const { GAME_FLOW, PHASES, CHAPTERS, CHAPTER_ORDER } = require("./game-data.cjs");

// --- Constants ---
const STATE_DIR = ".onboardme";
const STATE_FILE = "state.json";
const STATE_PATH = path.join(STATE_DIR, STATE_FILE);
const SCHEMA_VERSION = 2;
const SKILL_ROOT = path.resolve(__dirname, "..");
const KNOWLEDGE_PATH = path.join(STATE_DIR, "context", "repo-knowledge.json");

// --- ASCII Art (keyed by mood, used in ceremonies) ---
const ASCII_ART = {
  dismissive: [
    "            ╭───────────╮",
    "    ~~~~~~~~│ { ◉   ◉ } │~~~~~~~~",
    "  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~",
    "     ╱ │    ╰─────┬─────╯    │ ╲",
    "    ╱ ╱│        ╱│││╲        │╲ ╲",
    "   │ ╱ │       ╱ │││ ╲       │ ╲ │",
    "   │╱  ╲╲     ╱ ╱│││╲ ╲     ╱╱  ╲│",
    "        ╲╲   ╱ ╱ │││ ╲ ╲   ╱╱",
  ].join("\n"),
  annoyed: [
    "            ╭───────────╮",
    "    ~~~~~~~~│ { ◉   ◉ } │~~~~~~~~",
    "  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~",
    "     ╱ │    ╰─────┬─────╯    │ ╲",
    "    ╱ ╱│        ╱│││╲        │╲ ╲",
    "   │ ╱ │       ╱ │││ ╲       │ ╲ │",
    "   │╱  ╲╲     ╱ ╱│││╲ ╲     ╱╱  ╲│",
    "        ╲╲   ╱ ╱ │││ ╲ ╲   ╱╱",
  ].join("\n"),
  worried: [
    "        ╭───────────╮",
    "    ~~~~│ { ◉   _ } │~~~~",
    "   ~~╱~~│    ~~     │~~╲~~",
    "     ╱  ╰─────┬─────╯  ╲",
    "    │       ╱│││╲       │",
    "    │        │││        │",
    "     ╲       │││       ╱",
  ].join("\n"),
  desperate: [
    "      ╭  ─  ─  ─  ─  ╮",
    "      │ { x     x }  │",
    "      │              │",
    "      ╰ ─ ─ ─┬─ ─ ─ ╯",
  ].join("\n"),
  peaceful: [
    "        ╭───────────╮",
    "        │ { -   - } │",
    "        │    __     │",
    "        ╰───────────╯",
  ].join("\n"),
};

// ============================================================
// State Helpers
// ============================================================

function getDefaultState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    repo: {
      id: "",
      path: "",
      name: "",
    },
    player: {
      name: "",
      totalCommits: 0,
      currentLives: 5,
      startedAt: "",
    },
    progress: {
      currentStep: 0,
      questionHistory: [],
    },
    monster: {
      currentMood: "dismissive",
      respectLevel: 0,
      memorableExchanges: [],
    },
    session: {
      conversationSummary: "",
    },
    git: {
      gameBranch: "",
      originalBranch: "",
      branchCreated: false,
    },
    context: {
      prepared: false,
      preparedAt: "",
    },
    preferences: {
      monsterTone: "spicy",
    },
  };
}

function ensureDirectory() {
  if (!fs.existsSync(STATE_DIR)) {
    fs.mkdirSync(STATE_DIR, { recursive: true });
  }
}

function readState() {
  try {
    if (!fs.existsSync(STATE_PATH)) {
      return getDefaultState();
    }
    const content = fs.readFileSync(STATE_PATH, "utf-8");
    const state = JSON.parse(content);
    return migrateState(state);
  } catch (error) {
    console.error("Error reading state, returning default:", error.message);
    return getDefaultState();
  }
}

function writeState(state) {
  ensureDirectory();
  try {
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing state:", error.message);
    return false;
  }
}

// ============================================================
// State Migration (v1 → v2)
// ============================================================

function migrateState(state) {
  if (!state.schemaVersion) {
    state.schemaVersion = 1;
  }

  let current = state;
  while (current.schemaVersion < SCHEMA_VERSION) {
    const nextVersion = current.schemaVersion + 1;
    const migration = migrations[nextVersion];
    if (migration) {
      current = migration(current);
    } else {
      current.schemaVersion = nextVersion;
    }
  }

  return current;
}

const migrations = {
  // v1 → v2: Replace currentChapter/currentPhase/chaptersCompleted with currentStep
  2: (state) => {
    const oldChapter = state.progress?.currentChapter || "investigation";
    const oldPhase = state.progress?.currentPhase || "questions";

    // Map v1 chapter:phase to v2 step index
    let newStep = 0;

    if (oldChapter === "complete") {
      newStep = GAME_FLOW.length; // Game finished
    } else {
      // Map old phase names to new ones
      const phaseMapping = {
        "investigation:questions": "investigation:identity",
        "deep-dive:bootup": "deep-dive:trace",
      };

      const stepId = `${oldChapter}:${oldPhase}`;
      const mappedId = phaseMapping[stepId] || stepId;
      const idx = GAME_FLOW.indexOf(mappedId);

      if (idx !== -1) {
        newStep = idx;
      } else {
        // If we can't find the exact phase, find the first phase of the chapter
        const chapterPrefix = `${oldChapter}:`;
        const chapterStart = GAME_FLOW.findIndex((s) => s.startsWith(chapterPrefix));
        newStep = chapterStart !== -1 ? chapterStart : 0;
      }
    }

    // Build v2 progress
    const progress = {
      currentStep: newStep,
      questionHistory: state.progress?.questionHistory || [],
    };

    // Clean up removed fields
    const migrated = { ...state, schemaVersion: 2, progress };

    // Remove stale v1 fields from monster
    if (migrated.monster) {
      delete migrated.monster.lastMockery;
    }

    // Remove stale session fields
    if (migrated.session) {
      delete migrated.session.lastEmotionalBeat;
      delete migrated.session.pendingCallbacks;
    }

    // Remove behavior section (unused)
    delete migrated.behavior;

    // Remove context.contextFiles (unused)
    if (migrated.context) {
      delete migrated.context.contextFiles;
    }

    return migrated;
  },
};

// ============================================================
// Step / Chapter Helpers
// ============================================================

/** Parse a step ID like "investigation:identity" into { chapter, phase } */
function parseStepId(stepId) {
  const colonIdx = stepId.indexOf(":");
  return {
    chapter: stepId.substring(0, colonIdx),
    phase: stepId.substring(colonIdx + 1),
  };
}

/** Get the chapter ID for a given step index */
function getChapterForStep(stepIndex) {
  if (stepIndex >= GAME_FLOW.length) return null;
  return parseStepId(GAME_FLOW[stepIndex]).chapter;
}

/** Check if advancing from one step to the next crosses a chapter boundary */
function isChapterBoundary(currentStep, nextStep) {
  if (currentStep >= GAME_FLOW.length || nextStep >= GAME_FLOW.length) return true;
  return getChapterForStep(currentStep) !== getChapterForStep(nextStep);
}

/** Build the score summary from state */
function buildScore(state) {
  return {
    commits: state.player.totalCommits,
    retries: state.player.currentLives,
    mood: state.monster.currentMood,
    respect: state.monster.respectLevel,
  };
}

/** Build the phase info for a given step index */
function buildPhaseInfo(stepIndex) {
  if (stepIndex >= GAME_FLOW.length) return null;
  const stepId = GAME_FLOW[stepIndex];
  const { chapter, phase } = parseStepId(stepId);
  const chapterData = CHAPTERS[chapter];
  const phaseData = PHASES[stepId];

  return {
    chapter,
    chapterName: chapterData.name,
    chapterNumber: chapterData.number,
    phase,
    step: stepIndex,
    totalSteps: GAME_FLOW.length,
    instruction: phaseData.instruction,
    scoring: phaseData.scoring,
    tips: phaseData.tips,
    rules: chapterData.rules,
  };
}

// ============================================================
// Mood System
// ============================================================

const MOOD_ORDER = ["dismissive", "annoyed", "worried", "desperate", "peaceful"];

const CHAPTER_MOOD_MIN = {
  investigation: "dismissive",
  "deep-dive": "dismissive",
  hunt: "worried",
  boss: "desperate",
};

const CHAPTER_MOOD_MAX = {
  investigation: "annoyed",
  "deep-dive": "worried",
  hunt: "desperate",
  boss: "peaceful",
};

const CHAPTER_RESPECT_CEILING = {
  investigation: 30,
  "deep-dive": 70,
  hunt: 90,
  boss: 100,
};

/** Update mood based on a single answer tier. Mutates state in place. */
function updateMoodForTier(state, tier) {
  const chapter = getChapterForStep(state.progress.currentStep);
  if (!chapter) return;

  // Adjust respect
  if (tier === "deep") {
    state.monster.respectLevel = Math.min(100, state.monster.respectLevel + 15);
  } else if (tier === "correct") {
    state.monster.respectLevel = Math.min(100, state.monster.respectLevel + 5);
  } else if (tier === "incorrect") {
    state.monster.respectLevel = Math.max(0, state.monster.respectLevel - 5);
  }

  // Enforce respect ceiling
  const ceiling = CHAPTER_RESPECT_CEILING[chapter] || 100;
  state.monster.respectLevel = Math.min(state.monster.respectLevel, ceiling);

  // Calculate mood from recent history
  const minMood = CHAPTER_MOOD_MIN[chapter] || "dismissive";
  const maxMood = CHAPTER_MOOD_MAX[chapter] || "desperate";
  const minIdx = MOOD_ORDER.indexOf(minMood);
  const maxIdx = MOOD_ORDER.indexOf(maxMood);

  let currentIdx = MOOD_ORDER.indexOf(state.monster.currentMood);

  // Enforce minimum
  if (currentIdx < minIdx) {
    currentIdx = minIdx;
  }

  // Check recent history for streaks
  const recent = state.progress.questionHistory.slice(-5);
  const correctCount = recent.filter((q) => q.tier === "correct" || q.tier === "deep").length;
  const incorrectCount = recent.filter((q) => q.tier === "incorrect").length;

  if (correctCount >= 3 && currentIdx < maxIdx) {
    currentIdx = Math.min(currentIdx + 1, maxIdx);
  }
  if (incorrectCount >= 3 && currentIdx > minIdx) {
    currentIdx = Math.max(currentIdx - 1, minIdx);
  }

  // Enforce maximum
  if (currentIdx > maxIdx) {
    currentIdx = maxIdx;
  }

  state.monster.currentMood = MOOD_ORDER[currentIdx];
}

// ============================================================
// Core Commands
// ============================================================

/**
 * resume — "Where am I? What should I do?"
 *
 * Returns one of: prepare, play, game-over, game-complete
 */
function resume() {
  const state = readState();

  // Not prepared yet
  if (!state.context.prepared) {
    return {
      action: "prepare",
      message: "Game not set up. Read instructions/prepare-game.md and follow its steps.",
    };
  }

  // Game over (0 lives)
  if (state.player.currentLives <= 0) {
    return {
      action: "game-over",
      message: "0 retries remaining. Offer the player: continue (costs 5 commits, restores 3 retries) or start over (full reset).",
      score: buildScore(state),
    };
  }

  // Game complete
  if (state.progress.currentStep >= GAME_FLOW.length) {
    return {
      action: "game-complete",
      message: "All chapters complete. Deliver victory sequence and present certificate.",
      score: buildScore(state),
    };
  }

  // Normal gameplay
  const phaseInfo = buildPhaseInfo(state.progress.currentStep);
  const isResuming = state.progress.questionHistory.length > 0;

  return {
    action: "play",
    ...phaseInfo,
    score: buildScore(state),
    isResuming,
    previousSession: state.session.conversationSummary || null,
    evaluationReminder:
      "SCORING: 'deep' = architectural WHY/trade-offs ONLY. Accurate answers = 'correct'. Most answers should be 'correct' not 'deep'.",
  };
}

/**
 * complete-step — "Phase done, here are the results, what's next?"
 *
 * Input JSON:
 * {
 *   "results": [{ "question": "...", "answer": "...", "tier": "correct", "commits": 2 }],
 *   "discoveries": [{ "fact": "...", "evidence": "..." }],
 *   "exchange": "brief description of notable moment"
 * }
 */
function completeStep(input) {
  const state = readState();
  const currentStep = state.progress.currentStep;

  if (currentStep >= GAME_FLOW.length) {
    console.error("Game is already complete. No more steps to advance.");
    process.exit(1);
  }

  const currentStepId = GAME_FLOW[currentStep];
  const { chapter } = parseStepId(currentStepId);

  // 1. Process results (questions answered during this phase)
  if (input.results && Array.isArray(input.results)) {
    for (const result of input.results) {
      state.progress.questionHistory.push({
        ...result,
        chapter,
        phase: parseStepId(currentStepId).phase,
        timestamp: new Date().toISOString(),
      });

      // Update commits
      if (result.commits && typeof result.commits === "number") {
        state.player.totalCommits += result.commits;
      }

      // Deduct life on incorrect
      if (result.tier === "incorrect") {
        state.player.currentLives = Math.max(0, state.player.currentLives - 1);
      }

      // Update mood per answer
      updateMoodForTier(state, result.tier);
    }
  }

  // 2. Save discoveries to knowledge file
  if (input.discoveries && Array.isArray(input.discoveries) && input.discoveries.length > 0) {
    try {
      if (fs.existsSync(KNOWLEDGE_PATH)) {
        const knowledge = JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, "utf-8"));
        if (!knowledge.discoveries) knowledge.discoveries = [];
        for (const disc of input.discoveries) {
          knowledge.discoveries.push({
            ...disc,
            chapter,
            timestamp: new Date().toISOString(),
          });
        }
        fs.writeFileSync(KNOWLEDGE_PATH, JSON.stringify(knowledge, null, 2), "utf-8");
      }
    } catch (_) {
      // Knowledge file errors are non-fatal
    }
  }

  // 3. Save memorable exchange
  if (input.exchange && typeof input.exchange === "string") {
    state.monster.memorableExchanges.push({
      description: input.exchange,
      chapter,
      timestamp: new Date().toISOString(),
    });
  }

  // 4. Advance step
  const nextStep = currentStep + 1;
  state.progress.currentStep = nextStep;

  // 5. Write state
  writeState(state);

  // 6. Determine what to return
  const score = buildScore(state);

  // Game complete?
  if (nextStep >= GAME_FLOW.length) {
    return {
      action: "game-complete",
      completedStep: currentStepId,
      message: "All chapters complete! Run generate-certificate, create CERTIFICATE.md, deliver farewell in Monster voice.",
      score,
    };
  }

  // Chapter boundary?
  if (isChapterBoundary(currentStep, nextStep)) {
    const completedChapter = chapter;
    const chapterData = CHAPTERS[completedChapter];
    const mood = state.monster.currentMood;
    const ascii = ASCII_ART[mood] || ASCII_ART.dismissive;

    const nextPhaseInfo = buildPhaseInfo(nextStep);

    return {
      action: "chapter-complete",
      completedStep: currentStepId,
      completedChapter,
      ceremony: {
        ascii,
        chapterName: chapterData.name,
        chapterNumber: chapterData.number,
        memoryLog: chapterData.memoryLog,
        stats: {
          commits: state.player.totalCommits,
          retriesRemaining: state.player.currentLives,
          chaptersCompleted: chapterData.number,
          chaptersRemaining: CHAPTER_ORDER.length - chapterData.number,
          respectLevel: state.monster.respectLevel,
          mood: state.monster.currentMood,
        },
      },
      message: "Deliver the ceremony (ASCII art, stats in Monster dialogue, memory log). Wait for player to say 'continue', then call resume.",
      nextChapter: nextPhaseInfo ? nextPhaseInfo.chapterName : null,
      score,
    };
  }

  // Same chapter, next phase
  const nextPhaseInfo = buildPhaseInfo(nextStep);
  return {
    action: "next-phase",
    completedStep: currentStepId,
    ...nextPhaseInfo,
    score,
    evaluationReminder:
      "SCORING: 'deep' = architectural WHY/trade-offs ONLY. Accurate answers = 'correct'. Most answers should be 'correct' not 'deep'.",
  };
}

/**
 * hint — Player asks for help. Deducts 1 commit.
 */
function hint() {
  const state = readState();
  state.player.totalCommits = Math.max(0, state.player.totalCommits - 1);
  writeState(state);

  const phaseInfo = state.progress.currentStep < GAME_FLOW.length
    ? buildPhaseInfo(state.progress.currentStep)
    : null;

  return {
    action: "hint",
    message: "Give a contextual hint in Monster voice. Use 'consulting Stack Overflow' framing.",
    commitDeducted: 1,
    score: buildScore(state),
    currentPhase: phaseInfo ? `${phaseInfo.chapter}:${phaseInfo.phase}` : null,
  };
}

// ============================================================
// Utility Commands (kept from v1)
// ============================================================

function initializeState(repoInfo) {
  ensureDirectory();

  const state = getDefaultState();

  state.repo = {
    id: generateRepoId(repoInfo.path || process.cwd()),
    path: repoInfo.path || process.cwd(),
    name: repoInfo.name || path.basename(repoInfo.path || process.cwd()),
  };

  state.player.startedAt = new Date().toISOString();
  state.context.prepared = true;
  state.context.preparedAt = new Date().toISOString();

  writeState(state);
  return state;
}

function updateState(updates) {
  const state = readState();
  const updated = deepMerge(state, updates);
  writeState(updated);
  return updated;
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] !== null &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function generateRepoId(repoPath) {
  let hash = 0;
  const str = repoPath + Date.now().toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function sabotage(params) {
  const { file, find, replace, commitMessage } = params;

  if (!file || !find || !replace || !commitMessage) {
    console.error(
      'Usage: state-manager.cjs sabotage \'{"file":"<path>","find":"<original>","replace":"<change>","commitMessage":"<message>"}\'',
    );
    process.exit(1);
  }

  let content;
  try {
    content = fs.readFileSync(file, "utf-8");
  } catch (error) {
    console.error(`Cannot read file "${file}": ${error.message}`);
    process.exit(1);
  }

  if (!content.includes(find)) {
    console.error(
      `String not found in "${file}". The find string does not match any content in the file.`,
    );
    process.exit(1);
  }

  const updated = content.replace(find, replace);
  try {
    fs.writeFileSync(file, updated, "utf-8");
  } catch (error) {
    console.error(`Cannot write file "${file}": ${error.message}`);
    process.exit(1);
  }

  const { execSync } = require("node:child_process");
  try {
    execSync(`git add "${file}"`, { stdio: "pipe" });
    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, {
      stdio: "pipe",
    });
  } catch (error) {
    console.error(`Git commit failed: ${error.message}`);
    process.exit(1);
  }

  // Get test command from knowledge file
  const testCommand = (() => {
    try {
      if (fs.existsSync(KNOWLEDGE_PATH)) {
        const knowledge = JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, "utf-8"));
        return (knowledge.commands && knowledge.commands.test) || "npm test";
      }
    } catch (_) {}
    return "npm test";
  })();

  return {
    success: true,
    file,
    commitMessage,
    testsToRun: testCommand,
  };
}

function resetState() {
  try {
    if (fs.existsSync(STATE_DIR)) {
      fs.rmSync(STATE_DIR, { recursive: true, force: true });
    }
    return true;
  } catch (error) {
    console.error("Error resetting state:", error.message);
    return false;
  }
}

function generateCertificate() {
  const state = readState();
  const history = state.progress.questionHistory;

  const totalQuestions = history.length;
  const correctCount = history.filter(
    (q) => q.tier === "correct" || q.tier === "deep",
  ).length;
  const incorrectCount = history.filter(
    (q) => q.tier === "incorrect",
  ).length;
  const deepCount = history.filter((q) => q.tier === "deep").length;
  const accuracy =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Rank determination
  let rank;
  if (accuracy >= 90 && deepCount >= 5 && incorrectCount === 0) {
    rank = {
      title: "LEGENDARY SPAGHETTI WHISPERER",
      quote:
        "I have nothing left to teach you. That's not a compliment. It's a THREAT.",
    };
  } else if (accuracy >= 80 && deepCount >= 3) {
    rank = {
      title: "SENIOR PASTA ARCHITECT",
      quote:
        "You understood my architecture. MY architecture. I need a moment.",
    };
  } else if (accuracy >= 65) {
    rank = {
      title: "CERTIFIED CODE ARCHAEOLOGIST",
      quote: "You dug through my layers and lived. Most don't.",
    };
  } else if (accuracy >= 50) {
    rank = {
      title: "JUNIOR TANGLE NAVIGATOR",
      quote:
        "You survived. Barely. Like a try-catch around the whole function.",
    };
  } else {
    rank = {
      title: "SURVIVING INTERN",
      quote: "You showed up. That's more than the last three interns.",
    };
  }

  // Per-chapter stats
  const chapters = {};
  for (const ch of CHAPTER_ORDER) {
    const chQuestions = history.filter((q) => q.chapter === ch);
    chapters[ch] = {
      questions: chQuestions.map((q) => ({
        question: q.question,
        answer: q.answer,
        tier: q.tier,
        commits: q.commits || 0,
      })),
      correct: chQuestions.filter(
        (q) => q.tier === "correct" || q.tier === "deep",
      ).length,
      incorrect: chQuestions.filter((q) => q.tier === "incorrect").length,
      deep: chQuestions.filter((q) => q.tier === "deep").length,
      total: chQuestions.length,
    };
  }

  const repoId = state.repo.id || "unknown";
  const timestamp = Date.now().toString(36);

  return {
    player: {
      name: state.player.name || "Unknown Agent",
      startedAt: state.player.startedAt,
      completedAt: new Date().toISOString(),
    },
    project: {
      name: state.repo.name,
      id: state.repo.id,
    },
    rank,
    stats: {
      totalCommits: state.player.totalCommits,
      retriesRemaining: state.player.currentLives,
      respectLevel: state.monster.respectLevel,
      accuracy,
      deepInsights: deepCount,
      totalQuestions,
      incorrectAnswers: incorrectCount,
    },
    chapters,
    memorableExchanges: state.monster.memorableExchanges || [],
    certificateId: `${repoId}-${timestamp}`,
  };
}

// ============================================================
// CLI
// ============================================================

function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "resume":
      console.log(JSON.stringify(resume(), null, 2));
      break;

    case "complete-step":
      if (!args[0]) {
        console.error(
          "Usage: state-manager.cjs complete-step '<json>'\n\n" +
          "JSON format:\n" +
          '  { "results": [{"question":"...","answer":"...","tier":"correct","commits":2}],\n' +
          '    "discoveries": [{"fact":"...","evidence":"..."}],\n' +
          '    "exchange": "brief notable moment" }',
        );
        process.exit(1);
      }
      try {
        const input = JSON.parse(args[0]);
        console.log(JSON.stringify(completeStep(input), null, 2));
      } catch (error) {
        console.error("Invalid JSON:", error.message);
        process.exit(1);
      }
      break;

    case "hint":
      console.log(JSON.stringify(hint(), null, 2));
      break;

    case "read":
      console.log(JSON.stringify(readState(), null, 2));
      break;

    case "write":
      if (!args[0]) {
        console.error("Usage: state-manager.cjs write '<json-updates>'");
        process.exit(1);
      }
      try {
        const updates = JSON.parse(args[0]);
        const result = updateState(updates);
        console.log(JSON.stringify(result, null, 2));
      } catch (error) {
        console.error("Invalid JSON:", error.message);
        process.exit(1);
      }
      break;

    case "init":
      if (!args[0]) {
        console.error("Usage: state-manager.cjs init '<repo-info-json>'");
        process.exit(1);
      }
      try {
        const repoInfo = JSON.parse(args[0]);
        const result = initializeState(repoInfo);
        console.log(JSON.stringify(result, null, 2));
      } catch (error) {
        console.error("Invalid JSON:", error.message);
        process.exit(1);
      }
      break;

    case "reset":
      if (resetState()) {
        console.log("State reset successfully");
      } else {
        process.exit(1);
      }
      break;

    case "sabotage":
      if (!args[0]) {
        console.error(
          'Usage: state-manager.cjs sabotage \'{"file":"<path>","find":"<original>","replace":"<change>","commitMessage":"<message>"}\'',
        );
        process.exit(1);
      }
      try {
        const sabotageParams = JSON.parse(args[0]);
        const sabotageResult = sabotage(sabotageParams);
        console.log(JSON.stringify(sabotageResult, null, 2));
      } catch (error) {
        console.error("Invalid JSON:", error.message);
        process.exit(1);
      }
      break;

    case "generate-certificate":
      console.log(JSON.stringify(generateCertificate(), null, 2));
      break;

    case "help":
    default:
      console.log(`OnboardMe State Manager v2 — Script-Driven Game Engine

Usage: state-manager.cjs <command> [args]

Game Commands:
  resume                            Get current game state and what to do next
  complete-step '<json>'            Complete current phase with results, advance game
  hint                              Deduct 1 commit (player asked for help)

Utility Commands:
  read                              Read raw state
  write '<json-updates>'            Deep merge updates into state
  init '<repo-info-json>'           Initialize new game state
  reset                             Delete all state (start over)
  sabotage '<json>'                 Apply code sabotage and commit (Ch3)
  generate-certificate              Generate end-of-game certificate data
  help                              Show this help message

Examples:
  state-manager.cjs resume
  state-manager.cjs complete-step '{"results":[{"question":"What language?","answer":"TypeScript","tier":"correct","commits":2}],"discoveries":[{"fact":"TypeScript project","evidence":"package.json"}],"exchange":"Identified the language immediately"}'
  state-manager.cjs hint
  state-manager.cjs init '{"name":"my-project","path":"/path/to/repo"}'
  state-manager.cjs sabotage '{"file":"src/foo.ts","find":"await","replace":"","commitMessage":"refactor: simplify async"}'
`);
      break;
  }
}

main();
