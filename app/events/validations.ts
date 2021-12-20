import { z } from "zod"

export const CreateEvent = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(200),
  scheduledAt: z.string().refine((d: string) => !Number.isNaN(new Date(d).getTime()), {
    message: "Invalid date",
  }),
  repo: z.string().optional(),
  guestId1: z.number(),
  guestId2: z.number(),
  hostId: z.number(),
})
