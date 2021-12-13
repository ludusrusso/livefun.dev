import { Event, Guest } from "@prisma/client"
import { getGuestImage } from "app/guests/utils"
import { Image } from "blitz"

interface EventCoverProps {
  event: Event
  host: Guest
  guest?: Guest
}

export const EventCover = ({ event, host, guest }: EventCoverProps) => {
  return (
    <div className="aspect-video w-[1024px] bg-zinc-100 grid grid-rows-[1fr_auto]">
      <div className="relative">
        <div className="w-1/2 h-full  grid place-content-center">
          <h2 className="text-blue-800 text-5xl leading-tight font-bold pl-10 ">
            <div
              dangerouslySetInnerHTML={{
                __html: event.title.replace(
                  /\*([^\*]+)\*/g,
                  (data, ar) => `<span class="px-2 bg-green-300">${ar}</span>`
                ),
              }}
            ></div>
          </h2>
        </div>
        {guest ? (
          <>
            <div className="absolute right-10 bottom-20">
              <SmallUser guest={host} />
            </div>
            <div className="absolute right-52 bottom-28">
              <BigUser guest={guest} />
            </div>
          </>
        ) : (
          <div className="absolute right-40 bottom-28">
            <BigUser guest={host} />
          </div>
        )}
      </div>
      <div className="bg-blue-800 h-12 px-4 text-green-300 flex justify-between items-center">
        <p className="text-xl">{date2EventCoverTime(event.scheduledAt)}</p>
        <p className="text-2xl font-bold">Livefun.dev</p>
      </div>
    </div>
  )
}

const SmallUser = ({ guest }: { guest: Guest }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[200px] aspect-square overflow-hidden rounded-full border-[6px] border-solid border-green-500">
        <Image
          className="object-cover"
          width={200}
          height={200}
          src={getGuestImage(guest)}
          alt={guest.name}
        />
      </div>
      <p className="text-blue-800 mt-2 text-center text-2xl w-[180px] font-black">{guest.name}</p>
    </div>
  )
}

const BigUser = ({ guest }: { guest: Guest }) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="rounded-full w-[300px] aspect-square overflow-hidden block border-[6px] border-solid border-green-500">
        <Image
          className="object-cover"
          width={300}
          height={300}
          src={getGuestImage(guest)}
          alt={guest.name}
        />
      </div>

      <p className="text-blue-800 mt-2 text-2xl text-center w-[270px] font-black"> {guest.name} </p>
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
