import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteTicketButton } from "@/features/tickets/components/delete-ticket-button";
import { ticketPath } from "@/lib/paths";
import type { TicketModel } from "@/generated/prisma/models";

export function TicketItem({
  ticket,
  isDetail = false,
}: {
  ticket: TicketModel;
  isDetail?: boolean;
}) {
  const card = (
    <Card className={isDetail ? "w-full max-w-3xl" : "w-full max-w-xl flex-1"}>
      <CardHeader>
        <CardTitle className="text-base">{ticket.title}</CardTitle>
        <CardDescription>
          {ticket.createdAt.toISOString().split("T")[0]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{ticket.content}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex items-start gap-2">
      {card}
      {isDetail ? (
        <DeleteTicketButton ticketId={ticket.id} />
      ) : (
        <Button asChild size="icon" variant="outline" aria-label="Open ticket">
          <Link href={ticketPath(ticket.id)}>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
