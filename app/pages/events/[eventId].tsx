import Layout from "app/core/layouts/Layout"
import { EventCover } from "app/events/components/Cover"
import getEvent from "app/events/queries/getEvent"
import { BlitzPage, Head, Link, Routes, useParam, useQuery, useRouter } from "blitz"
import { Suspense, useRef } from "react"
import { exportComponentAsPNG } from "react-component-export-image"

export const Event = () => {
  const eventId = useParam("eventId", "string")
  const [event] = useQuery(getEvent, { id: eventId })
  const coverRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Head>
        <title>Event {event.id}</title>
      </Head>

      <div>
        <h1>Event {event.id}</h1>
        <div className="m-auto p-10 grid place-content-center">
          <div ref={coverRef} className="bg-red-500">
            <EventCover
              event={event}
              host={event.host}
              guests={event.guests.map((g) => g.guest)!}
            />
          </div>
        </div>

        <Link href={Routes.EditEventPage({ eventId: event.id })}>
          <a>Edit</a>
        </Link>

        <button onClick={() => exportComponentAsPNG(coverRef)}>Export As PNG</button>
      </div>
    </>
  )
}

const ShowEventPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.EventsPage()}>
          <a>Events</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Event />
      </Suspense>
    </div>
  )
}

ShowEventPage.authenticate = true
ShowEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEventPage
