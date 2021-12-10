import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetGuestsInput extends Pick<Prisma.GuestFindManyArgs, "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ skip = 0, take = 250 }: GetGuestsInput) => {
    const {
      items: guests,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.guest.count(),
      query: (paginateArgs) =>
        db.guest.findMany({
          ...paginateArgs,
          select: {
            id: true,
            name: true,
            github: true,
          },
        }),
    })

    return {
      guests,
      nextPage,
      hasMore,
      count,
    }
  }
)
