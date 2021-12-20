import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { Guest } from "@prisma/client"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { getGuestImage } from "app/guests/utils"
import { Image } from "blitz"
import { Fragment } from "react"
import { Field, FormSpy } from "react-final-form"
import { z } from "zod"
import { slug } from "../utils"
export { FORM_ERROR } from "app/core/components/Form"

type UserListData = Pick<Guest, "id" | "name" | "github">

export function EventForm<S extends z.ZodType<any, any>>({
  guests,
  ...props
}: FormProps<S> & { guests: UserListData[] }) {
  return (
    <Form<S> {...props} className="max-w-2xl m-auto">
      <div className="space-y-8 divide-y divide-stone-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-stone-900">Aggiungi Evento</h3>
            <p className="mt-1 text-sm text-stone-500">Inserisci le info dell&apos;evento</p>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <LabeledTextField
              name="title"
              type="text"
              label="Title"
              placeholder="Il miglior titolo"
            />
            <LabeledTextField
              name="scheduledAt"
              type="text"
              label="Scheduled At"
              placeholder="12/12/2021 20:00"
            />
            <FormSpy
              render={({ values }) => (
                <LabeledTextField
                  name="slug"
                  value={slug(values.title || "")}
                  type="text"
                  label="Slug"
                  placeholder="slug"
                  disabled={true}
                />
              )}
            />
            <LabeledTextField
              name="description"
              type="text"
              label="Description"
              placeholder="Description"
            />
            <SelectUserProps users={guests} name="hostId" label="Select host"></SelectUserProps>
            <SelectUserProps
              users={guests}
              name="guestId1"
              label="Select first guest"
            ></SelectUserProps>
            <SelectUserProps
              users={guests}
              name="guestId2"
              label="Select second guest"
            ></SelectUserProps>
          </div>
        </div>
      </div>
    </Form>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface SelectUserProps {
  users: UserListData[]
  name: string
  label: string
}

export default function SelectUserProps({ users, name, label }: SelectUserProps) {
  return (
    <Field
      name={name}
      render={({ input }) => {
        const selected = users.find((g) => g.id === input.value)
        return (
          <Listbox value={input.value} onChange={(value) => input.onChange(value?.id)}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-stone-700">
                  {label}
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-white relative w-full border border-stone-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {selected ? (
                      <SelectUserItem guest={selected} />
                    ) : (
                      <span className="block truncate"> select one </span>
                    )}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-stone-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {users.map((user) => (
                        <Listbox.Option
                          key={user.id}
                          className={({ active }) =>
                            classNames(
                              active ? "text-white bg-indigo-600" : "text-stone-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={user}
                        >
                          {({ selected, active }) => (
                            <SelectUserItem guest={user} selected={selected} active={active} />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        )
      }}
    />
  )
}

const SelectUserItem = ({
  guest: user,
  active = false,
  selected = false,
}: {
  guest: UserListData
  active?: boolean
  selected?: boolean
}) => {
  return (
    <>
      <div className="flex items-center">
        <Image
          width={30}
          height={30}
          className="rounded-full"
          src={getGuestImage(user, 30)}
          alt={user.name}
        />{" "}
        <span
          className={classNames(selected ? "font-semibold" : "font-normal", "block truncate ml-4")}
        >
          {user.name}
        </span>
      </div>
      {selected ? (
        <span
          className={classNames(
            active ? "text-white" : "text-indigo-600",
            "absolute inset-y-0 right-0 flex items-center pr-4"
          )}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </>
  )
}
