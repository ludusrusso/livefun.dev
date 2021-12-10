import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createGuest from "app/guests/mutations/createGuest"
import { GuestForm, FORM_ERROR } from "app/guests/components/GuestForm"
import { AppLayout } from "app/core/layouts/app.layout"
import { CreateGuestSchema } from "app/guests/validations"

const NewGuestPage: BlitzPage = () => {
  const router = useRouter()
  const [createGuestMutation] = useMutation(createGuest)

  return (
    <div>
      <h1>Create New Guest</h1>

      <GuestForm
        submitText="Create Guest"
        schema={CreateGuestSchema}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const guest = await createGuestMutation(values)
            router.push(Routes.ShowGuestPage({ guestId: guest.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.GuestsPage()}>
          <a>Guests</a>
        </Link>
      </p>
    </div>
  )
}

NewGuestPage.authenticate = true
NewGuestPage.getLayout = (page) => <AppLayout title={"Create New Guest"}>{page}</AppLayout>

export default NewGuestPage
