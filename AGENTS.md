# Agent Instructions

## Project Overview

This is Ayush Amin's personal portfolio built with Next.js App Router, React,
TypeScript, Tailwind CSS, shadcn-style UI components, Magic UI components, and
next-themes.

The portfolio should present Ayush as a backend and AI engineer. Content changes
should preserve that positioning and avoid drifting toward a generic student or
frontend-only profile.

## Common Commands

- Install dependencies: `npm install`
- Start local development: `npm run dev`
- Run lint: `npm run lint`
- Run production build: `npm run build`

## Code Style

- Keep components small and readable.
- Prefer existing local UI components from `components/ui`.
- Prefer Tailwind utility classes over custom CSS unless the style is shared or
complex.
- Use `next/image` for local images.
- Use `next/link` for navigation links.
- Use `lucide-react` icons when a suitable icon exists.
- Keep content data close to the section component unless it grows large enough
to justify moving into a shared data file.

## Portfolio Content Rules

- Intro copy should emphasize backend systems, AI/LLM engineering, automation,
observability, cloud infrastructure, and developer tooling.
- Work experience should be reverse chronological.
- Current roles should appear first and use the active timeline dot.
- External links must be visually obvious in both light and dark mode.
- Avoid placeholder or copied third-party content. If a section has no real
content yet, render nothing or add real owner-specific data.

## Frontend Expectations

- Test both light and dark mode after visual changes.
- Check mobile and desktop layouts when editing the dock, cards, timeline, or
contact form.
- Do not use negative z-index on main content sections because it can interfere
with selection and click behavior.
- Buttons and links should have a clear clickable area, not only icon-level click
handlers.

## Git And Review

- Keep unrelated changes out of commits.
- Prefer one focused commit per bug fix or content update.
- Before opening a PR, run `npm run lint` and `npm run build`.
