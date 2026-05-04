import { TicketItem } from "@/features/tickets/components/ticket-item";
import type { Ticket } from "@/features/tickets/data";

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No tickets yet.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
