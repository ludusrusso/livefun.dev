import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { Guest } from "@prisma/client"
import { getGuestImage } from "app/guests/utils"
import { Image } from "blitz"
import { Field, FormSpy, useField } from "react-final-form"
import { slug } from "../utils"
import DatePicker from "app/core/components/Datepicker"

type GuestListData = Pick<Guest, "id" | "name" | "github">

export function EventForm<S extends z.ZodType<any, any>>({
  guests,
  ...props
}: FormProps<S> & { guests: GuestListData[] }) {
  return (
    <Form<S> {...props} className="max-w-2xl m-auto">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Aggiungi Evento</h3>
            <p className="mt-1 text-sm text-gray-500">Inserisci le info dell&apos;evento</p>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <LabeledTextField
              name="title"
              type="text"
              label="Title"
              placeholder="Il miglior titolo"
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
            <SelectGuest guests={guests}></SelectGuest>
            <DatePicker />
          </div>
        </div>
      </div>
    </Form>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function SelectGuest({ guests }: { guests: GuestListData[] }) {
  return (
    <Field
      name="hostId"
      render={({ input }) => {
        const selected = guests.find((g) => g.id === input.value)
        return (
          <Listbox value={input.value} onChange={(value) => input.onChange(value?.id)}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                  Hosted by to
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {selected ? (
                      <GuestSelectedItem guest={selected} />
                    ) : (
                      <span className="block truncate"> select one </span>
                    )}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                      {guests.map((guest) => (
                        <Listbox.Option
                          key={guest.id}
                          className={({ active }) =>
                            classNames(
                              active ? "text-white bg-indigo-600" : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={guest}
                        >
                          {({ selected, active }) => (
                            <GuestSelectedItem guest={guest} selected={selected} active={active} />
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

const GuestSelectedItem = ({
  guest,
  active = false,
  selected = false,
}: {
  guest: GuestListData
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
          src={getGuestImage(guest, 30)}
          alt={guest.name}
        />{" "}
        <span
          className={classNames(selected ? "font-semibold" : "font-normal", "block truncate ml-4")}
        >
          {guest.name}
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
