---
name: Design Name Generator
overview: Set up a new Next.js app in a subfolder, install shadcn/ui, implement the single-page Design Name Generator UI and behavior, and connect the project to the existing GitHub repo.
todos:
  - id: init-next-app
    content: Create Next.js app in design-name-generator (npm)
    status: pending
  - id: install-shadcn
    content: Init shadcn/ui and add card/button
    status: pending
  - id: implement-page
    content: Build page UI + generator + copy behavior
    status: pending
  - id: link-github
    content: Connect repo, commit, push to main
    status: pending
isProject: false
---

## Recommended model

Use GPT-5.2 Codex High (default) for the setup and multi-file changes.

## Scope

Create a new Next.js app in `/Users/charles_rowe/Build AI Product Sense/design-name-generator`, install shadcn/ui, implement the `/` page UI and behavior, and link to the existing GitHub repo at `https://github.com/Creativerowe/test`.

## Steps

1. Initialize a new Next.js 14+ app in the `design-name-generator` subfolder using npm with App Router, TypeScript, and Tailwind. Keep the default `app/` structure so the main page lives at `app/page.tsx`.
2. Install and initialize shadcn/ui, then add the `card` and `button` components.
3. Implement the UI and behavior in `app/page.tsx`:
  - Dark-only layout, centered Card, max width around 640px.
  - H1 and description text exactly as specified.
  - Generate button (large, primary blue) that picks randomly from 30+ names without repeating the previous name.
  - Output area hidden until first click; show large generated name and a Copy button.
  - Subtle Tailwind-only animation on name change (opacity/scale transition).
  - Clipboard copy with 1.2s “Copied” label, then revert.
4. Verify imports and shadcn component usage; ensure `"use client"` is set for state and clipboard access.
5. Initialize git (if not already), set the remote to the existing repo, commit, and push to `main`.

## Files to edit/create

- `app/page.tsx`
- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `lib/utils.ts` (if created by shadcn init)
- `tailwind.config.ts` / `globals.css` (only if shadcn init updates them)

## Deliverables

- Setup commands (Next.js + shadcn/ui)
- Full file contents for `app/page.tsx` and any new files created
- Short run instructions (e.g., `npm install` and `npm run dev`)
