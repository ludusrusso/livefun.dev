import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGuest from "app/guests/queries/getGuest"
import updateGuest from "app/guests/mutations/updateGuest"
import { GuestForm, FORM_ERROR } from "app/guests/components/GuestForm"

export const EditGuest = () => {
  const router = useRouter()
  const guestId = useParam("guestId", "number")
  const [guest, { setQueryData }] = useQuery(
    getGuest,
    { id: guestId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateGuestMutation] = useMutation(updateGuest)

  return (
    <>
      <Head>
        <title>Edit Guest {guest.id}</title>
      </Head>

      <div>
        <h1>Edit Guest {guest.id}</h1>
        <pre>{JSON.stringify(guest, null, 2)}</pre>

        <GuestForm
          submitText="Update Guest"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateGuest}
          initialValues={guest}
          onSubmit={async (values) => {
            try {
              const updated = await updateGuestMutation({
                id: guest.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowGuestPage({ guestId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditGuestPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditGuest />
      </Suspense>

      <p>
        <Link href={Routes.GuestsPage()}>
          <a>Guests</a>
        </Link>
      </p>
    </div>
  )
}

EditGuestPage.authenticate = true
EditGuestPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditGuestPage
