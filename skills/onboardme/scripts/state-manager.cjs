#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const STATE_DIR = ".onboardme";
const STATE_FILE = "state.json";
const BACKUP_FILE = "state.backup.json";
const STATE_PATH = path.join(STATE_DIR, STATE_FILE);
const BACKUP_PATH = path.join(STATE_DIR, BACKUP_FILE);
const SCHEMA_VERSION = 1;

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
      currentChapter: "investigation",
      currentGame: "",
      chaptersCompleted: [],
      questionHistory: [],
    },
    monster: {
      currentMood: "dismissive",
      respectLevel: 0,
      memorableExchanges: [],
      lastMockery: "",
    },
    session: {
      conversationSummary: "",
      lastEmotionalBeat: "",
      pendingCallbacks: [],
    },
    behavior: {
      hintUsageCount: 0,
      averageResponseTime: 0,
      accuracyByTopic: {},
      playerStyle: "balanced",
    },
    git: {
      gameBranch: "",
      originalBranch: "",
      branchCreated: false,
    },
    context: {
      prepared: false,
      preparedAt: "",
      contextFiles: [],
    },
    preferences: {
      monsterTone: "balanced",
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

  if (fs.existsSync(STATE_PATH)) {
    try {
      fs.copyFileSync(STATE_PATH, BACKUP_PATH);
    } catch (error) {
      console.error("Warning: Could not create backup:", error.message);
    }
  }

  try {
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing state:", error.message);
    return false;
  }
}

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

const migrations = {};

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

  if (repoInfo.contextFiles) {
    state.context.contextFiles = repoInfo.contextFiles;
  }

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

function addQuestionResult(result) {
  const state = readState();
  state.progress.questionHistory.push({
    ...result,
    timestamp: new Date().toISOString(),
  });
  if (result.commits && typeof result.commits === "number") {
    state.player.totalCommits += result.commits;
  }
  if (result.tier === "incorrect") {
    state.player.currentLives = Math.max(0, state.player.currentLives - 1);
  }
  writeState(state);
  return state;
}

function updateMonsterMood(performance) {
  const state = readState();
  const mood = state.monster.currentMood;
  const chaptersCompleted = state.progress.chaptersCompleted;

  if (performance === "deep") {
    state.monster.respectLevel = Math.min(100, state.monster.respectLevel + 10);
  } else if (performance === "correct") {
    state.monster.respectLevel = Math.min(100, state.monster.respectLevel + 3);
  } else if (performance === "incorrect") {
    state.monster.respectLevel = Math.max(0, state.monster.respectLevel - 5);
  }

  if (chaptersCompleted.includes("boss")) {
    state.monster.currentMood = "peaceful";
    writeState(state);
    return state;
  }

  const MOOD_ORDER = ["dismissive", "annoyed", "worried", "desperate", "peaceful"];
  const CHAPTER_MINIMUMS = {
    investigation: "dismissive",
    "hands-on": "dismissive",
    "deep-dive": "annoyed",
    hunt: "worried",
    boss: "desperate",
  };

  const CHAPTER_MAXIMUMS = {
    investigation: "annoyed",
    "hands-on": "annoyed",
    "deep-dive": "worried",
    hunt: "desperate",
    boss: "peaceful",
  };

  // Respect level ceilings per chapter
  const RESPECT_CEILINGS = {
    investigation: 30,
    "hands-on": 45,
    "deep-dive": 70,
    hunt: 90,
    boss: 100,
  };

  const chapterMinimum = CHAPTER_MINIMUMS[state.progress.currentChapter] || "dismissive";
  const minimumIndex = MOOD_ORDER.indexOf(chapterMinimum);
  const chapterMaximum = CHAPTER_MAXIMUMS[state.progress.currentChapter] || "desperate";
  const maximumIndex = MOOD_ORDER.indexOf(chapterMaximum);
  const currentIndex = MOOD_ORDER.indexOf(mood);

  if (currentIndex < minimumIndex) {
    state.monster.currentMood = chapterMinimum;
  }

  const recentHistory = state.progress.questionHistory.slice(-5);
  const correctCount = recentHistory.filter(
    (q) => q.tier === "correct" || q.tier === "deep",
  ).length;
  const incorrectCount = recentHistory.filter(
    (q) => q.tier === "incorrect",
  ).length;

  const updatedIndex = MOOD_ORDER.indexOf(state.monster.currentMood);

  if (correctCount >= 3 && updatedIndex < 3) {
    state.monster.currentMood = MOOD_ORDER[Math.min(updatedIndex + 1, 3)];
  }

  if (incorrectCount >= 3 && updatedIndex > minimumIndex) {
    state.monster.currentMood = MOOD_ORDER[Math.max(updatedIndex - 1, minimumIndex)];
  }

  if (chaptersCompleted.length >= 4 && state.monster.currentMood === "worried") {
    state.monster.currentMood = "desperate";
  }

  // Enforce chapter mood ceiling
  const finalIndex = MOOD_ORDER.indexOf(state.monster.currentMood);
  if (finalIndex > maximumIndex) {
    state.monster.currentMood = MOOD_ORDER[maximumIndex];
  }

  // Enforce chapter respect ceiling
  const respectCeiling = RESPECT_CEILINGS[state.progress.currentChapter] || 100;
  state.monster.respectLevel = Math.min(state.monster.respectLevel, respectCeiling);

  writeState(state);
  return state;
}

function addExchange(description) {
  const state = readState();
  state.monster.memorableExchanges.push({
    description,
    chapter: state.progress.currentChapter,
    timestamp: new Date().toISOString(),
  });
  writeState(state);
  return state;
}

function setTone(tone) {
  const validTones = ["friendly", "balanced", "spicy", "full-monster"];
  if (!validTones.includes(tone)) {
    console.error(`Invalid tone: ${tone}. Valid: ${validTones.join(", ")}`);
    process.exit(1);
  }
  const state = readState();
  state.preferences.monsterTone = tone;
  writeState(state);
  return state;
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

function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "read":
      console.log(JSON.stringify(readState(), null, 2));
      break;

    case "write":
      if (!args[0]) {
        console.error("Usage: state-manager.js write '<json-updates>'");
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
        console.error("Usage: state-manager.js init '<repo-info-json>'");
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

    case "add-question":
      if (!args[0]) {
        console.error("Usage: state-manager.js add-question '<result-json>'");
        process.exit(1);
      }
      try {
        const questionResult = JSON.parse(args[0]);
        const result = addQuestionResult(questionResult);
        console.log(JSON.stringify(result, null, 2));
      } catch (error) {
        console.error("Invalid JSON:", error.message);
        process.exit(1);
      }
      break;

    case "update-mood":
      if (!args[0]) {
        console.error(
          "Usage: state-manager.js update-mood <incorrect|partial|correct|deep>",
        );
        process.exit(1);
      }
      const result = updateMonsterMood(args[0]);
      console.log(JSON.stringify(result, null, 2));
      break;

    case "add-exchange":
      if (!args[0]) {
        console.error(
          "Usage: state-manager.js add-exchange '<description>'",
        );
        process.exit(1);
      }
      const exchangeResult = addExchange(args[0]);
      console.log(JSON.stringify(exchangeResult, null, 2));
      break;

    case "set-tone":
      if (!args[0]) {
        console.error(
          "Usage: state-manager.js set-tone <friendly|balanced|spicy|full-monster>",
        );
        process.exit(1);
      }
      const toneResult = setTone(args[0]);
      console.log(JSON.stringify(toneResult, null, 2));
      break;

    case "help":
    default:
      console.log(`OnboardMe State Manager

Usage: state-manager.js <command> [args]

Commands:
  read                              Read current state (or default if none)
  write '<json-updates>'            Deep merge updates into state
  init '<repo-info-json>'           Initialize new game state
  reset                             Delete all state (start over)
  add-question '<result-json>'      Add a question result to history
  update-mood <performance>         Update Monster mood based on performance
  add-exchange '<description>'      Save a memorable exchange moment
  set-tone <tone>                   Set Monster tone (friendly|balanced|spicy|full-monster)
  help                              Show this help message

Examples:
  state-manager.js read
  state-manager.js init '{"name":"my-project","path":"/path/to/repo"}'
  state-manager.js write '{"player":{"totalCommits":5}}'
  state-manager.js add-question '{"questionId":"q1","tier":"correct","chapter":"investigation"}'
  state-manager.js update-mood correct
  state-manager.js add-exchange 'Player figured out the auth flow on first try'
  state-manager.js set-tone spicy
`);
      break;
  }
}

main();
