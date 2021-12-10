import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateGuest = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateGuest),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const guest = await db.guest.update({ where: { id }, data })

    return guest
  }
)
