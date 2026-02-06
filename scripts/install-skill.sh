#!/bin/bash

# Install OnboardMe skill to .cursor/skills for local testing
# Run this after making changes to skills/onboardme/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="$REPO_ROOT/skills/onboardme"
TARGET_DIR="$REPO_ROOT/.cursor/skills/onboardme"

echo "Installing OnboardMe skill..."
echo "  From: $SOURCE_DIR"
echo "  To:   $TARGET_DIR"

# Remove existing installation
if [ -d "$TARGET_DIR" ]; then
    rm -rf "$TARGET_DIR"
    echo "  Removed existing installation"
fi

# Copy entire skill directory
cp -r "$SOURCE_DIR" "$TARGET_DIR"

echo ""
echo "✓ Skill installed successfully!"
echo ""
echo "Files installed:"
find "$TARGET_DIR" -type f | sed 's|'"$REPO_ROOT"'/||'
