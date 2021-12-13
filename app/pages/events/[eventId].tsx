import Layout from "app/core/layouts/Layout"
import { EventCover } from "app/events/components/Cover"
import getEvent from "app/events/queries/getEvent"
import { BlitzPage, Head, Link, Routes, useParam, useQuery, useRouter } from "blitz"
import { Suspense, useRef } from "react"
import html2canvas from "html2canvas"

export const Event = () => {
  const eventId = useParam("eventId", "string")
  const [event] = useQuery(getEvent, { id: eventId })
  const coverRef = useRef<any>()

  const handleDownloadImage = async () => {
    const element = coverRef.current
    const canvas = await html2canvas(element)

    const data = canvas.toDataURL("image/jpg")
    const link = document.createElement("a")

    if (typeof link.download === "string") {
      link.href = data
      link.download = "image.jpg"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.open(data)
    }
  }

  return (
    <>
      <Head>
        <title>Event {event.id}</title>
      </Head>

      <div>
        <h1>Event {event.id}</h1>
        {/* <pre>{JSON.stringify(event, null, 2)}</pre> */}
        <div className="m-auto p-10 grid place-content-center">
          <div ref={coverRef}>
            <EventCover event={event} host={event.host} guest={event.guests[0]?.guest!} />
          </div>
        </div>

        <button onClick={handleDownloadImage}> download cover</button>

        <Link href={Routes.EditEventPage({ eventId: event.id })}>
          <a>Edit</a>
        </Link>
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
