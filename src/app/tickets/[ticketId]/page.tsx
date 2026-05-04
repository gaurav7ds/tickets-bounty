import { notFound } from "next/navigation";
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTicketById } from "@/features/tickets/data";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  const ticket = await getTicketById(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Ticket detail</h1>
        <p className="mt-2 text-muted-foreground">
          Review the ticket and its bounty.
        </p>
      </div>
      <TicketItem ticket={ticket} isDetail />
    </main>
  );
}
