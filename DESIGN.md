# netprofile.net — Design Philosophy

Reference for all frontend work. Every new page, component, or change must follow these rules.

## Core Principle

**Neutral minimalism with functional color.** The interface is overwhelmingly black, white, and gray. Color appears only when it communicates status or meaning — never for decoration.

## Color

### The palette is neutral

| Token | Use |
|---|---|
| `neutral-950` | Dark sections (hero, code blocks) |
| `neutral-900` | Primary text |
| `neutral-700`, `neutral-600` | Secondary text |
| `neutral-500`, `neutral-400` | Muted text, labels |
| `neutral-200` | Borders |
| `neutral-100` | Dividers, subtle backgrounds |
| `neutral-50` | Card backgrounds |
| `white` | Page background |
| `black` | Primary buttons |

### Color is functional, never decorative

Color only appears to communicate **status**:

| Meaning | Color | Example |
|---|---|---|
| Online / Good | `green-500` | Server status dot, "Good" rating |
| Offline / Poor | `red-400` / `red-500` | Server status dot, "Poor" rating |
| Warning / Fair | `amber-500` | "Fair" rating, alert banners |
| Checking | `yellow-400 animate-pulse` | Loading status dot |

**Do not** use color for:
- Badges that distinguish categories (use neutral tones instead)
- Decorative accents or gradients
- Hover states (use neutral shade changes)
- Section backgrounds

### Dark sections

Hero blocks use `bg-neutral-950` with the `noise-bg` utility for subtle texture. Text inside is white/neutral-400. These are the only non-white section backgrounds.

## Typography

Three fonts, three roles:

| Font | Class | Role |
|---|---|---|
| Instrument Serif | `font-serif` | Page titles (h1), section headings (h2) |
| DM Sans | `font-sans` (default) | All body text, labels, buttons |
| JetBrains Mono | `font-mono` | IP addresses, metrics, code, technical values |

### Rules
- Serif is for headings only. Never in buttons, labels, or body text.
- Mono is for data/code only. Never for labels or descriptions.
- Maximum weight is `font-semibold` (600). No bold (700+) in body text.
- `font-medium` (500) for buttons, labels, and emphasis.
- Size hierarchy: h1 `text-4xl md:text-5xl`, h2 `text-2xl`, h3 `text-lg` or `font-medium`.
- Section labels use `text-xs font-medium uppercase tracking-wider text-neutral-400`.

## Spacing

### Page-level
- Max width: `max-w-4xl mx-auto` (content pages), `max-w-6xl` (landing)
- Horizontal padding: `px-6` (always)
- Vertical padding: `py-12 md:py-20` (page top/bottom)
- Section gaps: `mb-16` between major sections

### Component-level
- Card padding: `p-5` or `p-6`
- Grid gaps: `gap-4` (tight), `gap-6` (standard), `gap-8` (spacious)
- Generous whitespace. When in doubt, add more space, not less.

## Components

### Cards
```
border border-neutral-200 rounded-xl p-6
```
Hover (if interactive): `hover:border-neutral-400 transition-colors`

### Buttons

**Primary:**
```
bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors
```

**Secondary:**
```
border border-neutral-300 px-6 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors
```

### Badges / Tags
```
text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border
```
Use neutral tones for categories. Use colored backgrounds only for status (Good/Fair/Poor).

### Status dots
```
w-2.5 h-2.5 rounded-full bg-green-500    (online)
w-2.5 h-2.5 rounded-full bg-red-400      (offline)
w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse  (checking)
```

### Code blocks
Inline: `bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono`
Block: `bg-neutral-950 text-neutral-300 rounded-lg px-4 py-3 text-sm font-mono`

### Info rows (key-value)
```
flex items-baseline justify-between py-2.5 border-b border-neutral-100
Label: text-sm text-neutral-400
Value: text-sm font-medium text-neutral-700
```

## Animation

- Page sections: `animate-fade-up` with staggered `animation-delay`
- Hover: `transition-colors` only. No scale, bounce, or rotation.
- Loading: `animate-pulse` on skeleton elements.
- Keep motion minimal and purposeful.

## Responsive

- Mobile-first. Base styles target phones.
- `md:` breakpoint for multi-column grids and expanded spacing.
- Single-column on mobile, 2-3 columns on desktop.
- Same design language at all sizes — layout changes, aesthetics don't.

## What NOT to do

- Don't add colored backgrounds to sections or cards for visual variety.
- Don't use colored badges to distinguish categories — use neutral tones.
- Don't use gradients.
- Don't add heavy font weights (bold/extrabold) to body text.
- Don't introduce new colors without a functional reason.
- Don't add complex animations or hover effects.
- Don't use shadows for elevation — use borders.
