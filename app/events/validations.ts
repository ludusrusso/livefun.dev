import { z } from "zod"

export const CreateEvent = z.object({
  title: z.string().min(2).max(40),
  description: z.string().min(10).max(200),
  scheduledAt: z.date(),
  body: z.string().optional(),
  repo: z.string().optional(),
  guestIds: z.number().array(),
  hostId: z.number(),
})
