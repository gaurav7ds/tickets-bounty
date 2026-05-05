import { TicketList } from "@/features/tickets/components/ticket-list";
import { getTickets } from "@/data/tickets";

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Tickets</h1>
        <p className="mt-2 text-muted-foreground">
          Open tickets available to claim and complete for a bounty.
        </p>
      </div>
      <TicketList tickets={tickets} />
    </main>
  );
}
