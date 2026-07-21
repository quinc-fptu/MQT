# Tactile Physics & Animation Guidelines (Motion)

## Core Directives
- **Library**: Use `motion` (imported from `motion/react` in modern React, or legacy `framer-motion`).
- **Spring Physics**:
  - Never use default linear transitions. All animation must feel organic with real mass/spring dynamics:
    `type: "spring", stiffness: 80, damping: 15, mass: 0.8`
- **Tactile Interaction**:
  - **Drag**: Make elements (Polaroid photos, handwritten notes) drag-draggable to boost physical connection.
    `<motion.div drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} dragElastic={0.2} whileDrag={{ scale: 1.05 }} />`
  - **Haptic Press**: Scale buttons and cards down on press to simulate clicking real buttons:
    `whileTap={{ scale: 0.96 }}`

## Entry & Scroll Dynamics
- Avoid static load. Use `whileInView` for smooth stagger entrances:
  ```jsx
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  />
  ```
- Use `useReducedMotion()` from `motion/react` to disable animations for users with motion preferences.

## Performance Guardrails
- **Continuous Values**: Never use `useState` to animate position on mouse/scroll triggers. Use `useMotionValue`, `useTransform`, or `useScroll`.
- Animate only hardware-accelerated properties (`transform`, `opacity`, `scale`, `rotate`).
