import Link from "next/link";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/lib/paths";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href={homePath}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Ticket className="h-5 w-5" />
          <span>Tickets Bounty</span>
        </Link>
        <Button asChild>
          <Link href={ticketsPath}>Tickets</Link>
        </Button>
      </div>
    </header>
  );
}
