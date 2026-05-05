import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const tickets = [
  {
    title: "Fix dark mode flicker on initial page load",
    content:
      "When the app first loads there is a brief flash of light theme before dark mode applies. Need to fix the hydration order so the theme is set before paint.",
  },
  {
    title: "Add CSV export for completed tickets",
    content:
      "Users should be able to download a CSV of their completed tickets including totals and timestamps. Add a button on the tickets page that triggers the export.",
  },
  {
    title: "Migrate legacy auth tokens",
    content:
      "Old session tokens stored in localStorage need to be migrated to Supabase auth cookies. Build a one-time migration that runs on first load after deploy.",
  },
  {
    title: "Write Prisma seed script",
    content:
      "Seed the dev database with sample tickets so the UI has something to render during local development. Idempotent — safe to re-run.",
  },
  {
    title: "Bounty payout webhook integration",
    content:
      "Wire up a webhook endpoint that releases bounty funds when a ticket is marked completed and approved by the poster.",
  },
];

async function main() {
  console.log("Clearing existing tickets...");
  await prisma.ticket.deleteMany();

  console.log(`Inserting ${tickets.length} tickets...`);
  await prisma.ticket.createMany({ data: tickets });

  const count = await prisma.ticket.count();
  console.log(`Done. Ticket count: ${count}`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
