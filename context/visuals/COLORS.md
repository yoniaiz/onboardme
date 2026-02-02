# Color Palette

## Theme Colors

```typescript
const theme = {
  // Primary colors
  primary: '#00ff88',      // Matrix green - success, correct
  secondary: '#00d4ff',    // Cyber blue - info, highlights
  accent: '#ff6b6b',       // Warning red - errors, damage
  gold: '#ffd700',         // Gold - achievements, XP
  
  // UI colors
  background: '#0a0a0a',   // Near black
  surface: '#1a1a2e',      // Slightly lighter
  border: '#16213e',       // Box borders
  text: '#e4e4e4',         // Main text
  muted: '#6b6b6b',        // Secondary text
  
  // Special effects
  streak: ['#ff6b6b', '#ff8c42', '#ffd700', '#7fff00', '#00ff88'],
  rainbow: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
};
```

## Color Usage Guidelines

- **Primary (Matrix Green)**: Success states, correct answers, positive feedback
- **Secondary (Cyber Blue)**: Information, highlights, neutral states
- **Accent (Warning Red)**: Errors, damage, critical states
- **Gold**: Achievements, XP, special rewards
- **Streak colors**: Progressive color array for streak indicators
- **Rainbow**: Special effects, celebrations, victory screens
