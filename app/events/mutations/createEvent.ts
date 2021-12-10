import { resolver } from "blitz"
import db from "db"
import { CreateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async ({ guestIds, hostId, ...input }) => {
    const event = await db.event.create({
      data: {
        ...input,
        slug: "asd",
        hostId: hostId,
        guests: {
          createMany: {
            data: guestIds.map((id) => ({
              guestId: id,
            })),
          },
        },
      },
    })
    return event
  }
)
