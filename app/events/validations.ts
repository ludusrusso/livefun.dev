import { z } from "zod"

export const CreateEvent = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(200),
  scheduledAt: z.string().transform((s) => new Date(s)),
  repo: z.string().optional(),
  guestId: z.number(),
  hostId: z.number(),
})
