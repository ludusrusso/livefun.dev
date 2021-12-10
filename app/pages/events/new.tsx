import { Link, useRouter, useMutation, BlitzPage, Routes, useQuery, Head } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEvent from "app/events/mutations/createEvent"
import { EventForm, FORM_ERROR } from "app/events/components/EventForm"
import getGuestsForList from "app/guests/queries/getGuestsForList"
import { Suspense } from "react"
import { CreateEvent } from "app/events/validations"

const NewEvent: BlitzPage = () => {
  const router = useRouter()
  const [{ guests }] = useQuery(getGuestsForList, {})
  const [createEventMutation] = useMutation(createEvent)

  return (
    <div>
      <h1>Create New Event</h1>

      <EventForm
        submitText="Create Event"
        guests={guests}
        schema={CreateEvent}
        initialValues={{}}
        onSubmit={async (values) => {
          console.log(values)
          try {
            const event = await createEventMutation(values)
            router.push(Routes.ShowEventPage({ eventId: event.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.EventsPage()}>
          <a>Events</a>
        </Link>
      </p>
    </div>
  )
}

const NewEventPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Events</title>
      </Head>

      <div>
        <h1>Create New Event</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <NewEvent />
        </Suspense>
      </div>
    </>
  )
}

NewEventPage.authenticate = true
NewEventPage.getLayout = (page) => <Layout title={"Create New Event"}>{page}</Layout>

export default NewEventPage
