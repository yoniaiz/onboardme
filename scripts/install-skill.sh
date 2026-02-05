#!/bin/bash

# Install OnboardMe skill to .cursor/skills for local testing
# Run this after making changes to skills/onboardme/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="$REPO_ROOT/skills/onboardme"
SKILL_TARGET="$REPO_ROOT/.cursor/skills/onboardme"
COMMANDS_TARGET="$REPO_ROOT/.cursor/commands"

echo "Installing OnboardMe skill..."
echo "  From: $SOURCE_DIR"
echo "  To:   $SKILL_TARGET"

# Remove existing skill installation
if [ -d "$SKILL_TARGET" ]; then
    rm -rf "$SKILL_TARGET"
    echo "  Removed existing skill installation"
fi

# Create target directory
mkdir -p "$SKILL_TARGET"

# Copy skill files (excluding commands folder)
cp "$SOURCE_DIR/SKILL.md" "$SKILL_TARGET/"
cp -r "$SOURCE_DIR/scripts" "$SKILL_TARGET/"
cp -r "$SOURCE_DIR/references" "$SKILL_TARGET/"

# Install commands to .cursor/commands
echo ""
echo "Installing commands to $COMMANDS_TARGET..."
mkdir -p "$COMMANDS_TARGET"

# Copy command files with onboardme- prefix to avoid conflicts
for cmd in "$SOURCE_DIR/commands"/*.md; do
    if [ -f "$cmd" ]; then
        filename=$(basename "$cmd")
        cp "$cmd" "$COMMANDS_TARGET/onboardme-$filename"
        echo "  Installed: onboardme-$filename"
    fi
done

echo ""
echo "✓ Skill installed successfully!"
echo ""
echo "Skill files:"
find "$SKILL_TARGET" -type f | sed 's|'"$REPO_ROOT"'/||'
echo ""
echo "Commands available:"
echo "  /onboardme-prepare-game"
echo "  /onboardme-play-game"
echo "  /onboardme-status"
echo "  /onboardme-hint"
echo "  /onboardme-reset-game"
