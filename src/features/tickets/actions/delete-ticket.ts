"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/lib/paths";
import type { ActionResult } from "@/lib/action-result";

const schema = z.object({ id: z.string().min(1) });

export async function deleteTicket(
  input: { id: string },
): Promise<ActionResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errorMessage: "Invalid ticket id" };
  }

  try {
    await prisma.ticket.delete({ where: { id: parsed.data.id } });
  } catch {
    return { success: false, errorMessage: "Failed to delete ticket" };
  }

  revalidatePath(ticketsPath);
  return { success: true, data: null };
}
