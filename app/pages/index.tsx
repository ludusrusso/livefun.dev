import { MarketingFooter } from "app/components/marketing/footer"
import { MarketingNav } from "app/components/marketing/nav"
import Layout from "app/core/layouts/Layout"
import { twitchCli } from "app/core/twitch"
import { EventCover } from "app/events/components/Cover"
import { BlitzPage, InferGetServerSidePropsType, NotFoundError } from "blitz"
import db from "db"

const Home: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  isLive,
  viewers,
  nextEvent,
}) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <MarketingNav />
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
              guest={nextEvent?.guests[0]!.guest}
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
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

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
