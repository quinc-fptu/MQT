# QuiNC Coding Style & Conventions

> **Severity: CRITICAL** — Coding, naming, and architectural guidelines designed by Lead Developer Nguyen Cao Qui (QuiNC). Agents must comply 100% when generating new code or performing maintenance.

---

## 1. Copyright & Author Header
Every newly created source file (including `.ts`, `.tsx`, `.js`, `.mjs`, `.css`) must include a copyright notice header at the very top of the file in the following format:
```typescript
/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */
```

---

## 2. Formatting & Linting
- **Standard Formatting:** Use single quotes (`'`), 2-space indentation, trailing commas, and always enforce semicolons (`;`).
- **Automation:** Ensure Prettier and ESLint run automatically on save (Format on Save) in your editor configuration.

---

## 3. Naming & Tailwind Conventions
- **React Components:** Use PascalCase (e.g., `ProductCard.tsx`, `HeaderNavigation.tsx`).
- **Route Folders (Next.js App Router):** Use lowercase kebab-case (Vietnamese without accents, e.g., `san-pham`, `ve-chung-toi`, `tin-tuc`).
- **Static Data Files:** Follow the ordered kebab-case naming format `[index]-[kebab-name].json` (e.g., `01-vina-sh.json`, `02-organic-bio.json`).
- **Product Identifiers (IDs):** Always use the prefix format `SHB-xxx` with 3 digits (e.g., `SHB-001`, `SHB-012`).
- **Tailwind CSS Class Ordering:** Integrate `prettier-plugin-tailwindcss` to automatically sort classes in JSX (order: layout -> spacing -> visual -> interactive -> responsive).

---

## 4. Code Splitting & Modularity
To avoid massive monolithic files that degrade readability and bloat context tokens, agents must strictly follow these modularity rules:
- **Component Splitting Standards:**
  - Split components when the total line count exceeds **150–200 lines**.
  - Extract a block of UI immediately if it has its own independent logic or operates as a distinct unit (e.g., list elements `ItemList`, filters `FilterPanel`, modal dialogs `ModalDialog`).
- **Local Directory Organization:**
  - Extracted sub-components that are only used by a specific route/page must be saved in a local `_components/` or `components/` folder adjacent to their parent file (do not dump them into the shared global components folder).
- **Logic-UI Separation:**
  - For complex components (multiple API calls, intricate filters, sequential states), extract the logic into a dedicated **Custom Hook** (e.g., `useProductFilter.ts`) in the same folder.
  - The main component (`tsx`) should only import this hook for state/handlers and focus solely on the presentation layer.
- **Navigation Comments:**
  - When splitting a component across files (hooks, sub-components, helpers), write a concise comment at the top of the file or above the main function signature directing developers to the related files (e.g., `// Logic hook: useProductFilter.ts` or `// Sub-component: _components/ProductItem.tsx`).
  - This enables developers and other agents to instantly map and navigate the component architecture without manual file searching.

---

## 5. State & Data Flow
- **Data-Driven SSG (Static Site Generation):**
  - Load all static product/content data via `data-loader.ts` at build-time.
  - Client-side data fetching for static content is strictly PROHIBITED.
- **Client-side Fetching (Dynamic Data):** Use native Fetch API wrapped in custom helper functions (e.g., `api-client.ts`) for centralized error handling and endpoint management. Avoid heavy external library installations.
- **State Management:**
  - Use **Zustand** as the primary lightweight solution for global state.
  - Use local `useState` for local UI state (e.g., toggles, open/close status) to keep components clean.
- **Server Components by Default:** Next.js components are Server Components by default. Only use the `"use client"` directive at the top of the file when client-side interactivity is explicitly required.

---

## 6. Security & Rate Limiting
To protect the system from spam requests, brute-force attacks, and data leaks, agents must apply the following security conventions:
- **API Rate Limiting:**
  - Every API endpoint that handles write operations (e.g., submitting contact forms, sending carts, authentication, searching) must implement server-side Rate Limiting (using Redis, Upstash, or middleware-level IP limits depending on the infrastructure).
  - Client-side: Apply **Debounce** or **Throttle** for dynamic search input fields. Disable submit buttons immediately upon click to prevent double submissions.
- **Strict Input Validation:**
  - Never trust client-side data. All payloads sent to API endpoints must be validated against a strict schema (e.g., using **Zod** or equivalent).
  - Prevent XSS and SQL Injection by sanitizing/escaping special characters and using parameterized queries (or secure ORMs).
- **Secure Logging:**
  - It is strictly FORBIDDEN to log sensitive user information (passwords, tokens, API keys, emails, phone numbers, or personal billing info) to console logs or centralized log management systems.

---

## 7. Build & Data Integrity
- **If it works, don't touch it:** Do not refactor or rename stable code unless explicitly requested via the `@refactor` tag.
- **Data Synchronization:** Do not edit generated consolidated data files directly (e.g., `products.json`). Make changes in the source files within the data directory, then run the sync command (`npm run sync-products`) and validation script (`node scripts/validate-products.js`).
- **Build Verification:** Before finishing any task, run `npm run build` locally to guarantee there are no TypeScript compilation or server-side rendering errors.
