import { resolver } from "blitz"
import db from "db"
import { CreateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async ({ guestId, hostId, ...input }) => {
    console.log(input)
    const event = await db.event.create({
      data: {
        ...input,
        slug: "asd",
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
