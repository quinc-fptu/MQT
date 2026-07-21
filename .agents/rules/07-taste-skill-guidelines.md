# Taste Skill & Anti-Slop Guidelines

## Core Directives
- **Inference First**: Always output a one-line design read: `"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <aesthetic family>."` before writing code.
- **Dial Settings**:
  - `DESIGN_VARIANCE: 8` (1 = perfect symmetry, 10 = artsy chaos)
  - `MOTION_INTENSITY: 6` (1 = static, 10 = cinematic/physics)
  - `VISUAL_DENSITY: 4` (1 = gallery/airy, 10 = cockpit/packed)
- **Anti-Patterns**:
  - Avoid generic AI-purple/blue mesh gradients.
  - Do not use Inter, Roboto, Arial, Helvetica as defaults (prefer Outfit, Satoshi, etc.).
  - Avoid generic 1px solid gray borders or harsh dark shadows.

## Spacing & Rhythm
- Use generous macro-whitespace (`py-24` to `py-40` for sections).
- Eyebrow tags: Max 1 eyebrow label per 3 sections.
- Zigzag layouts: Max 2 alternating left-image/right-text sections in a row.

## Bento & Cards
- Bento grids must be fully packed with no empty slots.
- Ensure at least 2-3 cells in a bento grid have visual diversity (images, gradients, color blocks).
- Use double-bezel cards for expensive/premium tactile looks:
  - Outer shell with background and padding (`p-1.5` or `p-2`) and large radius (`rounded-[2rem]`).
  - Inner content container with concentric smaller radius (`rounded-[calc(2rem-0.375rem)]`).
