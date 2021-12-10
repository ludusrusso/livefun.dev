import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGuest from "app/guests/queries/getGuest"
import deleteGuest from "app/guests/mutations/deleteGuest"

export const Guest = () => {
  const router = useRouter()
  const guestId = useParam("guestId", "number")
  const [deleteGuestMutation] = useMutation(deleteGuest)
  const [guest] = useQuery(getGuest, { id: guestId })

  return (
    <>
      <Head>
        <title>Guest {guest.id}</title>
      </Head>

      <div>
        <h1>Guest {guest.id}</h1>
        <pre>{JSON.stringify(guest, null, 2)}</pre>

        <Link href={Routes.EditGuestPage({ guestId: guest.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteGuestMutation({ id: guest.id })
              router.push(Routes.GuestsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowGuestPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.GuestsPage()}>
          <a>Guests</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Guest />
      </Suspense>
    </div>
  )
}

ShowGuestPage.authenticate = true
ShowGuestPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowGuestPage
