#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const STATE_DIR = ".onboardme";
const STATE_FILE = "state.json";
const BACKUP_FILE = "state.backup.json";
const STATE_PATH = path.join(STATE_DIR, STATE_FILE);
const BACKUP_PATH = path.join(STATE_DIR, BACKUP_FILE);
const SCHEMA_VERSION = 1;

// Resolve paths relative to this script — works in any IDE/agent runtime
const SKILL_ROOT = path.resolve(__dirname, "..");

const CHAPTER_ORDER = [
  "investigation",
  "hands-on",
  "deep-dive",
  "hunt",
  "boss",
];

const CHAPTER_REFERENCE_FILES = {
  investigation: path.join(SKILL_ROOT, "references", "THE-INVESTIGATION.md"),
  "hands-on": path.join(SKILL_ROOT, "references", "THE-HANDS-ON.md"),
  "deep-dive": path.join(SKILL_ROOT, "references", "THE-DEEP-DIVE.md"),
  hunt: path.join(SKILL_ROOT, "references", "THE-HUNT.md"),
  boss: path.join(SKILL_ROOT, "references", "THE-BOSS-BATTLE.md"),
};

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

const MEMORY_LOGS = {
  investigation:
    '"Year 1. Clean architecture. SOLID principles. Hope."',
  "hands-on":
    '"Just this one shortcut. We\'ll refactor later."\n\n*crackle*\n\n"They never did."',
  "deep-dive":
    '"The shortcuts multiplied. The TODOs grew. Comments began to lie."',
  hunt:
    '"The architect said she\'d refactor me."\n\n*pause*\n\n"She\'s a VP at Google now."',
  boss:
    '"Something stirred in the deepest module. It was me."',
};

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
      averageResponseTime: 0,
      accuracyByTopic: {},
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
    state.monster.respectLevel = Math.min(100, state.monster.respectLevel + 15);
  } else if (performance === "correct") {
    state.monster.respectLevel = Math.min(100, state.monster.respectLevel + 5);
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

function completeChapter(chapterName) {
  const state = readState();

  // Validate chapter name
  if (!CHAPTER_ORDER.includes(chapterName)) {
    console.error(
      `Invalid chapter: ${chapterName}. Valid: ${CHAPTER_ORDER.join(", ")}`,
    );
    process.exit(1);
  }

  // Validate it matches current chapter
  if (state.progress.currentChapter !== chapterName) {
    console.error(
      `Cannot complete "${chapterName}" — current chapter is "${state.progress.currentChapter}"`,
    );
    process.exit(1);
  }

  // Add to completed list if not already there
  if (!state.progress.chaptersCompleted.includes(chapterName)) {
    state.progress.chaptersCompleted.push(chapterName);
  }

  // Determine next chapter
  const currentIndex = CHAPTER_ORDER.indexOf(chapterName);
  const isLast = currentIndex === CHAPTER_ORDER.length - 1;
  const nextChapter = isLast ? null : CHAPTER_ORDER[currentIndex + 1];

  // Update state
  if (isLast) {
    state.progress.currentChapter = "complete";
  } else {
    state.progress.currentChapter = nextChapter;
  }

  writeState(state);

  // Build ceremony data
  const mood = state.monster.currentMood;
  const ascii = ASCII_ART[mood] || ASCII_ART.dismissive;
  const memoryLog = MEMORY_LOGS[chapterName] || "";

  return {
    completed: chapterName,
    ceremony: {
      ascii,
      stats: {
        commits: state.player.totalCommits,
        retriesRemaining: state.player.currentLives,
        chaptersCompleted: state.progress.chaptersCompleted.length,
        chaptersRemaining: CHAPTER_ORDER.length - state.progress.chaptersCompleted.length,
        respectLevel: state.monster.respectLevel,
      },
      memoryLog,
    },
    next: isLast
      ? null
      : {
          chapter: nextChapter,
          referenceFile: CHAPTER_REFERENCE_FILES[nextChapter],
        },
    gameComplete: isLast,
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

  // Certificate ID
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

function getScore() {
  const state = readState();
  const history = state.progress.questionHistory;
  const chapterNum = CHAPTER_ORDER.indexOf(state.progress.currentChapter) + 1;
  const completed = state.progress.chaptersCompleted.length;
  return {
    commits: state.player.totalCommits,
    retries: state.player.currentLives,
    maxRetries: 5,
    respect: state.monster.respectLevel,
    mood: state.monster.currentMood,
    chapter: state.progress.currentChapter,
    chapterNumber: chapterNum,
    chaptersCompleted: completed,
    totalChapters: CHAPTER_ORDER.length,
    questionsAnswered: history.length,
    deepInsights: history.filter((q) => q.tier === "deep").length,
  };
}

function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
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

    case "add-question":
      if (!args[0]) {
        console.error("Usage: state-manager.cjs add-question '<result-json>'");
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
          "Usage: state-manager.cjs update-mood <incorrect|partial|correct|deep>",
        );
        process.exit(1);
      }
      const result = updateMonsterMood(args[0]);
      console.log(JSON.stringify(result, null, 2));
      break;

    case "add-exchange":
      if (!args[0]) {
        console.error(
          "Usage: state-manager.cjs add-exchange '<description>'",
        );
        process.exit(1);
      }
      const exchangeResult = addExchange(args[0]);
      console.log(JSON.stringify(exchangeResult, null, 2));
      break;

    case "set-tone":
      if (!args[0]) {
        console.error(
          "Usage: state-manager.cjs set-tone <friendly|balanced|spicy|full-monster>",
        );
        process.exit(1);
      }
      const toneResult = setTone(args[0]);
      console.log(JSON.stringify(toneResult, null, 2));
      break;

    case "complete-chapter":
      if (!args[0]) {
        console.error(
          "Usage: state-manager.cjs complete-chapter <chapter-name>",
        );
        process.exit(1);
      }
      const ccResult = completeChapter(args[0]);
      console.log(JSON.stringify(ccResult, null, 2));
      break;

    case "get-score":
      const scoreResult = getScore();
      console.log(JSON.stringify(scoreResult, null, 2));
      break;

    case "generate-certificate":
      const certResult = generateCertificate();
      console.log(JSON.stringify(certResult, null, 2));
      break;

    case "help":
    default:
      console.log(`OnboardMe State Manager

Usage: state-manager.cjs <command> [args]

Commands:
  read                              Read current state (or default if none)
  write '<json-updates>'            Deep merge updates into state
  init '<repo-info-json>'           Initialize new game state
  reset                             Delete all state (start over)
  add-question '<result-json>'      Add a question result to history
  update-mood <performance>         Update Monster mood based on performance
  add-exchange '<description>'      Save a memorable exchange moment
  set-tone <tone>                   Set Monster tone (friendly|balanced|spicy|full-monster)
  complete-chapter <chapter-name>   Complete a chapter and get ceremony data
  get-score                         Get compact current score (commits, retries, respect, chapter)
  generate-certificate              Generate end-of-game certificate data (rank, stats, per-chapter)
  help                              Show this help message

Examples:
  state-manager.cjs read
  state-manager.cjs init '{"name":"my-project","path":"/path/to/repo"}'
  state-manager.cjs write '{"player":{"totalCommits":5}}'
  state-manager.cjs add-question '{"questionId":"q1","tier":"correct","chapter":"investigation"}'
  state-manager.cjs update-mood correct
  state-manager.cjs add-exchange 'Player figured out the auth flow on first try'
  state-manager.cjs set-tone spicy
  state-manager.cjs complete-chapter investigation
  state-manager.cjs generate-certificate
`);
      break;
  }
}

main();
