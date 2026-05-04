# Tickets Bounty

A platform where users post tickets (tasks/bugs/requests) with a bounty attached, and other users complete those tickets to earn the bounty.

## Stack
- **Framework:** Next.js (App Router)
- **Database:** Supabase (Postgres + Auth)
- **ORM:** Prisma
- **Language:** TypeScript
- **UI:** shadcn/ui (Radix-based)
- **Styling:** Tailwind CSS v4
- **Theme:** Dark mode by default

## Project context
Read these before starting any task:
- [context/coding-standards.md](context/coding-standards.md) — code conventions, component rules, server/client boundaries
- [context/ai-communication.md](context/ai-communication.md) — how to talk to the user, when to ask, when to stop

## Working agreement
- Default to **server components**; opt into client only for interactivity.
- Use **server actions** for forms and mutations.
- One component = one task. Split into smaller pieces, lean on shadcn primitives.
- Type inference where obvious; never use `any`.
- Ask before any large refactor or anything ambiguous (see ai-communication.md).
