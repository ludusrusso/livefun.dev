import { resolver } from "blitz"
import db from "db"
import { slug } from "../utils"
import { CreateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async ({ guestId1, guestId2, hostId, scheduledAt, ...input }) => {
    const guests = [guestId1, guestId2].filter((g) => !!g).map((g) => ({ guestId: g }))
    const event = await db.event.create({
      data: {
        ...input,
        slug: slug(input.title),
        hostId: hostId,
        scheduledAt: new Date(scheduledAt),
        guests: {
          createMany: { data: guests },
        },
      },
    })
    return event
  }
)
