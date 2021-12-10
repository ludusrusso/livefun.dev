import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetGuestsInput
  extends Pick<Prisma.GuestFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetGuestsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: guests,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.guest.count({ where }),
      query: (paginateArgs) => db.guest.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      guests,
      nextPage,
      hasMore,
      count,
    }
  }
)
