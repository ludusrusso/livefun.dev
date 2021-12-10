import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateGuestSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateGuestSchema),
  resolver.authorize(),
  async (input) => {
    const guest = await db.guest.create({ data: input })
    return guest
  }
)
