import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteGuest = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteGuest), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const guest = await db.guest.deleteMany({ where: { id } })

  return guest
})
