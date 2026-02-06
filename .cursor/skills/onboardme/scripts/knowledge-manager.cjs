#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const STATE_DIR = ".onboardme";
const CONTEXT_DIR = path.join(STATE_DIR, "context");
const KNOWLEDGE_FILE = "repo-knowledge.json";
const KNOWLEDGE_PATH = path.join(CONTEXT_DIR, KNOWLEDGE_FILE);

function ensureDirectory() {
  if (!fs.existsSync(CONTEXT_DIR)) {
    fs.mkdirSync(CONTEXT_DIR, { recursive: true });
  }
}

function readKnowledge() {
  try {
    if (!fs.existsSync(KNOWLEDGE_PATH)) {
      return null;
    }
    const content = fs.readFileSync(KNOWLEDGE_PATH, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading knowledge:", error.message);
    return null;
  }
}

function writeKnowledge(knowledge) {
  ensureDirectory();
  try {
    fs.writeFileSync(
      KNOWLEDGE_PATH,
      JSON.stringify(knowledge, null, 2),
      "utf-8",
    );
    return true;
  } catch (error) {
    console.error("Error writing knowledge:", error.message);
    return false;
  }
}

function addDiscovery(discovery) {
  const knowledge = readKnowledge();
  if (!knowledge) {
    console.error("No knowledge file found. Run prepare first.");
    process.exit(1);
  }
  knowledge.discoveries.push({
    ...discovery,
    timestamp: new Date().toISOString(),
  });
  writeKnowledge(knowledge);
  return knowledge;
}

function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "read": {
      const knowledge = readKnowledge();
      console.log(knowledge ? JSON.stringify(knowledge, null, 2) : "null");
      break;
    }

    case "write": {
      if (!args[0]) {
        console.error("Usage: knowledge-manager.cjs write '<json>'");
        process.exit(1);
      }
      try {
        const data = JSON.parse(args[0]);
        if (writeKnowledge(data)) {
          console.log(JSON.stringify(data, null, 2));
        } else {
          process.exit(1);
        }
      } catch (error) {
        console.error("Invalid JSON:", error.message);
        process.exit(1);
      }
      break;
    }

    case "add-discovery": {
      if (!args[0]) {
        console.error("Usage: knowledge-manager.cjs add-discovery '<json>'");
        process.exit(1);
      }
      try {
        const discovery = JSON.parse(args[0]);
        const result = addDiscovery(discovery);
        console.log(JSON.stringify(result, null, 2));
      } catch (error) {
        console.error("Invalid JSON:", error.message);
        process.exit(1);
      }
      break;
    }

    default:
      console.log(`OnboardMe Knowledge Manager

Usage: knowledge-manager.cjs <command> [args]

Commands:
  read                         Read repo-knowledge.json (null if not found)
  write '<json>'               Write/replace repo-knowledge.json
  add-discovery '<json>'       Append discovery to knowledge
  help                         Show this help message

Examples:
  knowledge-manager.cjs read
  knowledge-manager.cjs write '{"schemaVersion":1,"identity":{"name":"my-project"}}'
  knowledge-manager.cjs add-discovery '{"chapter":"investigation","fact":"Uses Express","tier":"correct"}'
`);
      break;
  }
}

main();
