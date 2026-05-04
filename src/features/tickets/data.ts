export type TicketStatus = "open" | "in_progress" | "completed";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  bounty: number;
  status: TicketStatus;
  postedBy: string;
  createdAt: string;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTickets(): Promise<Ticket[]> {
  await delay(1000);
  return dummyTickets;
}

export async function getTicketById(id: string): Promise<Ticket | undefined> {
  await delay(1000);
  return dummyTickets.find((ticket) => ticket.id === id);
}

export const dummyTickets: Ticket[] = [
  {
    id: "tk_001",
    title: "Fix dark mode flicker on initial page load",
    description:
      "When the app first loads there is a brief flash of light theme before dark mode applies. Need to fix the hydration order.",
    bounty: 50,
    status: "open",
    postedBy: "alice",
    createdAt: "2026-05-01",
  },
  {
    id: "tk_002",
    title: "Add CSV export for completed tickets",
    description:
      "Users should be able to download a CSV of their completed tickets including bounty totals.",
    bounty: 120,
    status: "open",
    postedBy: "bob",
    createdAt: "2026-05-02",
  },
  {
    id: "tk_003",
    title: "Migrate legacy auth tokens",
    description:
      "Old session tokens stored in localStorage need to be migrated to Supabase auth cookies.",
    bounty: 200,
    status: "in_progress",
    postedBy: "carol",
    createdAt: "2026-05-03",
  },
  {
    id: "tk_004",
    title: "Write Prisma seed script",
    description:
      "Seed dev database with sample users, tickets, and bounty submissions for local development.",
    bounty: 40,
    status: "completed",
    postedBy: "dave",
    createdAt: "2026-04-28",
  },
  {
    id: "tk_005",
    title: "Bounty payout webhook integration",
    description:
      "Wire up a webhook endpoint that releases bounty funds when a ticket is marked completed and approved.",
    bounty: 300,
    status: "open",
    postedBy: "erin",
    createdAt: "2026-05-04",
  },
];
