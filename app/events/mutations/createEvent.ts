import { resolver } from "blitz"
import db from "db"
import { slug } from "../utils"
import { CreateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async ({ guestId, hostId, ...input }) => {
    const event = await db.event.create({
      data: {
        ...input,
        slug: slug(input.title),
        hostId: hostId,
        guests: {
          create: {
            guestId: guestId,
          },
        },
      },
    })
    return event
  }
)
