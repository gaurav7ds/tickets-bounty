import { prisma } from "@/lib/prisma";

export async function getTickets() {
  return prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTicketById(id: string) {
  return prisma.ticket.findUnique({
    where: { id },
  });
}
