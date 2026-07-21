# Rule: UI Design Standards

## Core Principles
- **Spacing**: Use a geometric scale of 4px (`4`, `8`, `12`, `16`, `24`, `32`, `48`). Do not hardcode custom margins.
- **Typography**: Do not use system font defaults. Configure custom web fonts via `next/font` or `@fontsource`.
- **Fluid type**: Enforce `clamp()` for headings. Do not hardcode fixed font-sizes for individual breakpoints.
- **Animation**: Use Framer Motion with spring physics (`stiffness`, `damping`). Do not use `linear` easing for micro-interactions.
- **Hover**: Enforce `transition-all duration-300 ease-out` on all interactive elements. Avoid sudden hover transitions.
- **Click Feedback**: Scale down components on press (`active:scale-95` or `whileTap={{ scale: 0.97 }}`).
- **Focus**: Design custom focus rings; do not rely on browser default outlines.
- **Dark Mode**: Integrate `next-themes` and prevent FOUC (flash of unstyled content) on reload.

## Anti-Patterns
- Avoid saturated neon gradients on buttons — this degrades visual premium.
- Do not use flat beige/cream backgrounds if the brand vibe is dark/cinematic.
- Avoid large border-radius settings (>16px) for editorial or agency-style layouts.
- Do not nest `<a>` tags inside `<a>`. Do not use raw `<img>` tags over `next/image`.
- **No Generic Pill Badges:** Never generate the generic, unstyled rounded pill/badge containing a mismatched icon beside uppercase text (e.g. green icon with blue text in a light blue pill). All badges must use unified harmonious design tokens, subtle background tinting, and matched icon/text colors to avoid cheap template looks.

## Related Skills
- Creating new components → `ui-component`
- Redesigning / auditing UI → `impeccable` or `redesign-existing-projects`
- UX copy → `ux-copy`
- Design tokens / spacing → `ui-tokens`
- accessibility (a11y) → `ui-a11y`
