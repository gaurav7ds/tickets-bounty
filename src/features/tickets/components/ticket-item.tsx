import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ticketPath } from "@/lib/paths";
import type { Ticket } from "@/features/tickets/data";

const statusVariant = {
  open: "default",
  in_progress: "secondary",
  completed: "outline",
} as const;

const statusLabel = {
  open: "Open",
  in_progress: "In progress",
  completed: "Completed",
} as const;

export function TicketItem({
  ticket,
  isDetail = false,
}: {
  ticket: Ticket;
  isDetail?: boolean;
}) {
  const card = (
    <Card className={isDetail ? "w-full max-w-3xl" : "w-full max-w-xl flex-1"}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base">{ticket.title}</CardTitle>
          <Badge variant={statusVariant[ticket.status]}>
            {statusLabel[ticket.status]}
          </Badge>
        </div>
        <CardDescription>
          Posted by {ticket.postedBy} · {ticket.createdAt}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <p className="text-sm text-muted-foreground">{ticket.description}</p>
        <span className="shrink-0 text-lg font-semibold">${ticket.bounty}</span>
      </CardContent>
    </Card>
  );

  if (isDetail) {
    return card;
  }

  return (
    <div className="flex items-start gap-2">
      {card}
      <Button asChild size="icon" variant="outline" aria-label="Open ticket">
        <Link href={ticketPath(ticket.id)}>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
