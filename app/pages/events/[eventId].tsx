import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
  Image,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import deleteEvent from "app/events/mutations/deleteEvent"
import { Event as EventModel, Guest } from "@prisma/client"
import { getGuestImage } from "app/guests/utils"
import styled from "@emotion/styled"

export const Event = () => {
  const router = useRouter()
  const eventId = useParam("eventId", "string")
  // const [deleteEventMutation] = useMutation(deleteEvent)
  const [event] = useQuery(getEvent, { id: eventId })

  return (
    <>
      <Head>
        <title>Event {event.id}</title>
      </Head>

      <div>
        <h1>Event {event.id}</h1>
        {/* <pre>{JSON.stringify(event, null, 2)}</pre> */}
        <div className="m-auto p-10">
          <EventCover event={event} host={event.host} guest={event.guests[0]?.guest!} />
        </div>

        <Link href={Routes.EditEventPage({ eventId: event.id })}>
          <a>Edit</a>
        </Link>
      </div>
    </>
  )
}

const AvatarImage = styled(Image)`
  border: 6px solid rgb(74 222 128) !important;
`

interface EventCoverProps {
  event: EventModel
  host: Guest
  guest: Guest
}

const EventCover = ({ event, host, guest }: EventCoverProps) => {
  return (
    <div className="aspect-video w-[1024px] bg-zinc-100 grid grid-rows-[1fr_auto]">
      <div className="relative">
        <div className="w-1/2 h-full  grid place-content-center">
          <h2 className="text-blue-800 text-5xl font-bold pl-10">{event.title}</h2>
        </div>
        <div className="absolute flex flex-col items-center right-10 bottom-20">
          <AvatarImage
            className="block rounded-full border-4 border-solid border-gray-900"
            width={200}
            height={200}
            src={getGuestImage(host)}
            alt={host.name}
          />
          <p className="text-blue-800 mt-2 text-center text-2xl w-[180px] font-black">
            {" "}
            {host.name}
          </p>
        </div>
        <div className="absolute flex flex-col items-center right-52 bottom-28">
          <AvatarImage
            className="rounded-full block border-4 border-solid border-gray-900"
            width={300}
            height={300}
            src={getGuestImage(guest)}
            alt={host.name}
          />
          <p className="text-blue-800 mt-2 text-2xl text-center w-[270px] font-black">
            {" "}
            {guest.name}{" "}
          </p>
        </div>
      </div>
      <div className="bg-blue-800 h-12 px-4 text-green-300 flex justify-between items-center">
        <p className="text-xl">{date2EventCoverTime(event.scheduledAt)}</p>
        <p className="text-2xl font-bold">Livefun.dev</p>
      </div>
    </div>
  )
}

const mounths = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
]

const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]

const date2EventCoverTime = (date: Date) => {
  return `${days[date.getDay()]} ${date.getDate()} ${
    mounths[date.getMonth()]
  } ${date.getFullYear()} - ${padTime(date.getHours())}.${padTime(date.getMinutes())}`
}

const padTime = (num: number) => {
  return `00${num}`.slice(-2)
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
