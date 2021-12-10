import { Guest } from "@prisma/client"
import { AppLayout } from "app/core/layouts/app.layout"
import getGuests from "app/guests/queries/getGuests"
import { getGuestImage } from "app/guests/utils"
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const GuestsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ guests, hasMore }] = usePaginatedQuery(getGuests, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <GuestLists guests={guests} />

      <button
        className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 disabled:bg-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={page === 0}
        onClick={goToPreviousPage}
      >
        Previous
      </button>
      <button
        className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 disabled:bg-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={!hasMore}
        onClick={goToNextPage}
      >
        Next
      </button>
    </div>
  )
}

const GuestsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Guests</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewGuestPage()}>
            <a>Create Guest</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <GuestsList />
        </Suspense>
      </div>
    </>
  )
}

GuestsPage.authenticate = true
GuestsPage.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default GuestsPage

const GuestLists = ({ guests }: { guests: Guest[] }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <ul
          role="list"
          className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
        >
          {guests.map((guest) => (
            <li key={guest.name}>
              <Link href={Routes.ShowGuestPage({ guestId: guest.id })}>
                <a className="flex items-center space-x-4 lg:space-x-6 p-2 rounded hover:bg-indigo-200">
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                      src={getGuestImage(guest, 50)}
                      alt=""
                    />
                  }
                  <div className="font-medium text-lg leading-6 space-y-1">
                    <h3>{guest.name}</h3>
                    <p className="text-indigo-600">{guest.bio}</p>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
