import { TicketItem } from "@/features/tickets/components/ticket-item";
import type { TicketModel } from "@/generated/prisma/models";

export function TicketList({ tickets }: { tickets: TicketModel[] }) {
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
