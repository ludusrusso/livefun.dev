import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetGuest = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetGuest), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const guest = await db.guest.findFirst({ where: { id } })

  if (!guest) throw new NotFoundError()

  return guest
})
