# Agent Guide

## Project Overview

This is Ayush Amin's personal portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, shadcn-style UI primitives, lucide-react icons, and next-themes.

The site is mostly static content with small client-side interactions for theme switching and the contact form.

## Key Paths

- `app/page.tsx`: main portfolio layout and section order.
- `app/layout.tsx`: metadata, fonts, and global providers.
- `app/globals.css`: Tailwind layers and small custom utilities.
- `components/Intro.tsx`: hero/profile introduction.
- `components/WorkExperience.tsx`: timeline-style professional experience.
- `components/Education.tsx`: education timeline.
- `components/Skills.tsx`: skill tags.
- `components/Projects.tsx`: static project cards.
- `components/ContactForm.tsx`: Web3Forms-powered contact form.
- `components/CustomDock.tsx`: floating navigation, social links, and theme toggle.
- `components/ui/*`: local UI primitives. Prefer reusing these before adding new component styles.

## Commands

- `npm run dev`: start the local Next.js dev server.
- `npm run lint`: run Next.js linting.
- `npm run build`: run production build and type checks.

Run `npm run lint` and `npm run build` before considering code changes complete.

## Implementation Notes

- Keep portfolio content in the component data arrays unless a broader data abstraction is needed.
- Use TypeScript types for structured portfolio data.
- Prefer Tailwind classes already used in the repo.
- Use `lucide-react` for common icons.
- Keep UI compact and readable; this portfolio should feel professional and backend/AI focused, not like a marketing landing page.
- Do not add unrelated visual effects or large layout rewrites when editing content.

## Content Guidelines

- Intro copy should position Ayush around backend engineering, AI systems, LLM workflows, automation, and production reliability.
- Work experience should remain reverse-chronological.
- Project copy should be concise, outcome-focused, and technically specific.
- Avoid copied placeholder content from templates or other creators.

## Environment

The contact form expects:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
```

If the key is missing, the UI should show a clear fallback message directing visitors to email directly.

## GitHub Integration Direction

Future GitHub integration should be server-side where possible:

- Use a server-only `GITHUB_TOKEN`, never a `NEXT_PUBLIC_*` token.
- Put GitHub fetch helpers in `lib/github.ts`.
- Cache GitHub requests with Next.js revalidation to avoid rate-limit issues.
- Show recent projects, active repositories, contribution stats, and streak information in a dedicated section.
