# Coding Standards

## Stack rules
- **Framework:** Next.js (App Router only — no Pages Router).
- **Database:** Supabase (Postgres). Auth via Supabase Auth.
- **ORM:** Prisma. All DB access goes through Prisma — no raw Supabase client queries for data unless realtime/auth requires it.
- **Language:** TypeScript only.
- **UI:** shadcn/ui components.
- **Styling:** Tailwind CSS v4. No CSS modules, no styled-components.
- **Icons:** lucide-react.

## TypeScript
- Use **type inference** wherever the type is obvious. Don't annotate when the right side already tells the story.
  - Good: `const tickets = await prisma.ticket.findMany()`
  - Bad: `const tickets: Ticket[] = await prisma.ticket.findMany()`
- **Never** use `any`. If you need an escape hatch, use `unknown` and narrow.
- Prefer `type` over `interface` unless you need declaration merging.
- Function return types: annotate only at module/public boundaries (server actions, exported helpers). Internal helpers can rely on inference.
- Use `satisfies` instead of `as` casts when validating shapes.

## Component rules
- **One component = one task / one file.** If a file does two things, split it.
- **Server Components by default.** Only add `"use client"` when you actually need:
  - hooks (`useState`, `useEffect`, etc.)
  - browser APIs
  - event handlers
- Push the `"use client"` boundary as low as possible. A page should usually stay server; only the interactive leaf becomes client.
- **Split aggressively.** A page that renders a list, filters, and a form is at least 3 files: `page.tsx`, `ticket-list.tsx`, `ticket-filters.tsx`, `create-ticket-form.tsx`.
- **Use shadcn primitives wherever they fit.** Don't hand-roll a button, dialog, dropdown, input, card, or form — `npx shadcn@latest add <component>` first.

## Folder structure
- **Routes** live in `src/app/<route>/page.tsx` and stay thin — pages compose feature pieces, they don't own logic.
- **Features** live in `src/features/<feature-name>/`:
  - `src/features/<feature-name>/components/` — all components for that feature (`ticket-item.tsx`, `ticket-list.tsx`, etc.).
  - `src/features/<feature-name>/actions/` — server actions for that feature (`create-ticket.ts`, `claim-ticket.ts`).
  - `src/features/<feature-name>/types.ts` — feature-local types if not already covered by Prisma-generated types.
- **Data Access Layer (DAL)** lives in `src/data/<feature-name>.ts` — one file per feature, all Prisma reads for that feature (`getTickets`, `getTicketById`). Auth checks live here too once auth is wired up. Pages and actions go through the DAL — they never call `prisma` directly.
- **Shared, cross-feature** components → `src/components/`. shadcn primitives → `src/components/ui/`.
- A page imports from its feature folder; features don't import from `app/`.

## Server actions
- All forms and mutations use **server actions**, not API routes.
- Validate input with zod inside the action. Never trust the form payload.
- **Return shape — `ActionResult<T>` discriminated union (from `@/lib/action-result`):**
  ```ts
  export type ActionResult<T = null> =
    | { success: true; data: T }
    | { success: false; errorMessage: string };
  ```
  - Always annotate the action's return type as `Promise<ActionResult<T>>` — no `as const` needed; the annotation gives the right contextual narrowing.
  - Use `data: null` when there's nothing meaningful to return (deletes, etc.). For creates/updates, `T` is the row type from Prisma.
  - On the client, branch on `result.success` — TypeScript narrows `data` and `errorMessage` automatically.
  - Don't throw for expected user errors (validation, not-found, permission denied) — return `{ success: false, errorMessage }`. Reserve throws for genuinely unexpected failures.
- `revalidatePath` / `revalidateTag` after mutations.
- **Don't `redirect()` from inside an action when the caller needs to react to the result** (e.g. show a toast). Return `{ success: true }` and let the client `router.push(...)` after handling the response. Only redirect from the action for non-JS form posts.

## Data layer
- Single Prisma client instance in `src/lib/prisma.ts` (the standard Next.js singleton pattern).
- Queries live in `src/lib/db/<entity>.ts` or co-located with the route. Don't scatter `prisma.foo.findMany` across components.
- Mutations always go through server actions, never client-side.

## Styling
- Tailwind v4 utility classes only. No arbitrary `<style>` blocks.
- **Dark mode is the default** — apply `class="dark"` on `<html>`. Light mode is opt-in (toggle later).
- Use the shadcn theme tokens (`bg-background`, `text-foreground`, `border-border`, etc.) — don't hardcode colors.
- Use `cn()` from `@/lib/utils` to compose conditional classes.

## Path constants
- All route paths live in `src/lib/paths.ts`.
- **One export per path.** Named exports, camelCase, `Path` suffix:
  ```ts
  export const ticketsPath = "/tickets";
  export const ticketPath = (id: string) => `/tickets/${id}`;
  ```
  No grouping object, no enum, no default export.
- **Never** hardcode a route string in:
  - `<Link href="...">` → `<Link href={ticketsPath}>`.
  - `redirect("...")` (from `next/navigation`) → `redirect(ticketsPath)`.
  - `revalidatePath("...")` → `revalidatePath(ticketsPath)`.
  - `router.push/replace("...")` → `router.push(ticketsPath)`.
- Dynamic routes are functions (`ticketPath(id)`), not template literals at the call site.
- Add a new export to `paths.ts` the moment you add a new route — don't let strings sneak in.

## Files & naming
- Component files: `kebab-case.tsx` (`ticket-card.tsx`).
- Component exports: `PascalCase` (`export function TicketCard`).
- Hooks: `use-foo.ts`, exporting `useFoo`.
- Server actions: lowercase verb names (`createTicket`, `claimBounty`).

## Error handling
- Don't wrap things in try/catch unless you have a specific recovery path. Let Next.js error boundaries handle the rest.
- Use `error.tsx` and `not-found.tsx` per route segment.
- For server actions, return errors; don't throw.

## Don'ts
- No `useEffect` for data fetching — fetch in server components.
- No client-side mutations via `fetch('/api/...')` when a server action works.
- No premature abstraction. Three similar lines beat a wrong helper.
- No comments that describe *what* the code does. Only the non-obvious *why*.
