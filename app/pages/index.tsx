import { MarketingFooter } from "app/components/marketing/footer"
import { MarketingNav } from "app/components/marketing/nav"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { twitchCli } from "app/core/twitch"
import { EventCover } from "app/events/components/Cover"
import { BlitzPage, InferGetServerSidePropsType, NotFoundError } from "blitz"
import db from "db"
import { Suspense } from "react"

const Home: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  isLive,
  viewers,
  nextEvent,
}) => {
  const user = useCurrentUser()

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <MarketingNav />
      {JSON.stringify(user)}
      <div className="m-auto">
        <pre>
          {nextEvent?.title} {viewers}
        </pre>
        {isLive ? (
          <iframe
            className="aspect-video"
            src="https://player.twitch.tv/?channel=ludusrusso&parent=localhost"
            width="500"
            allowFullScreen={true}
          ></iframe>
        ) : (
          <div className="scale-50">
            <EventCover
              event={nextEvent!}
              guests={nextEvent?.guests!.map((g) => g.guest)!}
              host={nextEvent?.host!}
            />
          </div>
        )}
      </div>
      <MarketingFooter />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => (
  <Suspense fallback="loading">
    <Layout title="Home">{page}</Layout>
  </Suspense>
)

export default Home

export const getServerSideProps = async () => {
  const user = await twitchCli.users.getUserByName("ludusrusso")
  if (!user) {
    throw new NotFoundError()
  }
  const stream = await twitchCli.streams.getStreamByUserId(user.id)

  const nextEvent = await db.event.findFirst({
    where: {
      scheduledAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
    include: {
      guests: {
        include: {
          guest: true,
        },
      },
      host: true,
    },
  })

  return {
    props: {
      nextEvent,
      viewers: stream?.viewers,
      isLive: stream !== null,
    },
  }
}
