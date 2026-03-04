# TV Show Dashboard

A cinematic TV show discovery app built with **Vue 3**, **TypeScript**, and **Vite**. Browse shows grouped by genre, search across the catalogue, and dive into detailed show pages, debounced search, and skeleton loading states.

---

## Features

- **Genre carousels**: shows grouped and sorted by `rating.average` descending (nulls last)
- **Infinite scroll pagination**: loads the next TVMaze page as you scroll, backed by the native `IntersectionObserver` API
- **Debounced search**:  live search with a custom `useDebounceFn` composable to minimise API calls
- **Show detail page**: full cast, summary, rating, genres, and network info
- **Skeleton loading states**: placeholder cards on initial load and subsequent fetches
- **Keyboard-navigable carousels**: arrow-key navigation within genre rows
- **Responsive design**: mobile-first breakpoints via a shared `respond-to()` SCSS mixin

---

## Architecture Decisions

### Vue 3 Composition API + `<script setup lang="ts">`

All components use `<script setup lang="ts">`. This is the most concise and idiomatic Vue 3 authoring style, provides first-class TypeScript inference, and keeps component logic co-located and tree-shakeable.

### No Pinia

Each composable encapsulates its own reactive state and is instantiated once per route-level view, so no cross-component shared store is needed. Pinia would be the right call for a larger app requiring DevTools time-travel debugging, SSR per-request isolation, or state shared between multiple independent component trees. For this scope, composables are cleaner and demonstrate deeper Vue 3 reactivity understanding than reaching for a state manager by default.

### No UI component library

The assignment asks for purpose-built UI. A hand-rolled component set with a custom SCSS design system demonstrates design system thinking.

### Infinite scroll over a "Load More" button

Infinite scroll delivers a smoother browsing experience and is a natural fit for a catalogue-style layout. The mechanism is fully encapsulated in the `useInfiniteScroll` composable, which wraps the browser's native `IntersectionObserver` API.

---

## API Strategy & Pagination Rationale

The TVMaze `/shows` endpoint is paginated, returning approximately 250 shows per page.

This app fetches pages progressively via infinite scroll. The initial load fetches page `0` (~250 shows); each subsequent scroll-to-bottom fetches the next page and appends results to the local state.

**Why not fetch all pages upfront?** TVMaze has hundreds of pages. Fetching all of them would mean hundreds of HTTP requests and tens of thousands of records loaded into memory before the user sees anything — impractical for a dashboard that only ever displays a small visible slice at a time.

**Practical tradeoff:** the first session fetches pages `0–2` (~750 shows), giving enough genre variety for a rich dashboard without over-fetching. As the user scrolls further, additional pages load on demand. This is an intentional, documented engineering choice — not an oversight.

**404 handling:** TVMaze returns HTTP `404` when pages are exhausted. This is treated as a graceful end-of-data signal rather than an error, and `hasMore` is set to `false` to stop further requests.

---

## Client-Side Genre Grouping

`src/utils/groupByGenre.ts` is a pure function that takes the loaded `Show[]` array, iterates each show's `genres` tags, and buckets shows into a `Record<string, Show[]>` map. Each bucket is then sorted by `rating.average` descending, with `null`/`undefined` ratings sorted last. The result is memoised via a `computed()` in `useShows` so it only recalculates when the shows array changes.

---

## Design & Styling

| Decision | Detail |
|---|---|
| Theme | Cinematic dark — `#0d0d12` background, `#e8b84b` gold accent |
| Style architecture | SCSS with `@use` partials (`_variables`, `_reset`, `_typography`, `_layout`, `_animations`, `_utilities`) |
| Tokens | CSS custom properties for runtime-overridable values (colours, spacing, radius) |
| Naming | BEM throughout — `block__element--modifier` |
| Responsive | `@include respond-to()` mixin, mobile-first breakpoints |
| Fluid typography | `clamp()` for scale-aware font sizes |

---

## Getting Started

### Prerequisites

```bash
node --version   # Requires Node 20+  (engines: ^20.19.0 || >=22.12.0)
npm --version    # Requires npm 10+
```

### Install & Run

```bash
# Install dependencies
npm install

# Development server → http://localhost:5173
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Testing & Linting

```bash
# Unit tests (Vitest)
npm run test:unit

# Type-check
npm run type-check

# Lint (oxlint + ESLint, auto-fix)
npm run lint

# Format (Prettier)
npm run format
```

---

## Folder Structure

```
src/
├── composables/      # Stateful logic — useShows, useSearch, useShowDetail,
│                     # useInfiniteScroll, useDebounceFn. Each composable owns
│                     # its reactive state; no global store needed.
├── utils/            # Pure functions and the API client:
│                     # groupByGenre.ts, formatters.ts, api.ts
├── types/            # TypeScript interfaces for TVMaze API shapes (tvmaze.types.ts)
├── views/            # Route-level page components (HomeView, SearchView,
│                     # ShowDetailView). Thin shells — delegate all logic
│                     # to composables.
├── components/       # Reusable UI components with scoped CSS, no business logic.
│   ├── common/       # Shared atoms: LoadingSpinner, ErrorMessage, …
│   └── shows/        # Domain components: GenreSection, ShowCard, …
└── assets/
    └── styles/       # SCSS design system — main.scss + partials
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (`<script setup lang="ts">`) |
| Build tool | Vite 7 |
| Language | TypeScript 5 |
| Routing | Vue Router 5 |
| HTTP client | Axios |
| Styles | SCSS (Sass) |
| Testing | Vitest + `@vue/test-utils` |
| Linting | ESLint + oxlint |
| Formatting | Prettier |
| API | [TVMaze REST API](https://www.tvmaze.com/api) |
