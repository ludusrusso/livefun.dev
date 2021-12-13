import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { FormSpy } from "react-final-form"
import { z } from "zod"
import { getGuestImage } from "../utils"
export { FORM_ERROR } from "app/core/components/Form"

export function GuestForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props} className="max-w-2xl m-auto">
      <div className="space-y-8 divide-y divide-stone-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-stone-900">Aggiungi Guest</h3>
            <p className="mt-1 text-sm text-stone-500">Informazioni sul guest degli eventi</p>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <LabeledTextField name="name" type="text" label="Name" placeholder="Name" />
            <LabeledTextField name="email" type="email" label="Email" placeholder="Email" />
            <LabeledTextField name="bio" type="text" label="Bio" placeholder="frontend developer" />
            <LabeledTextField
              name="twitter"
              type="text"
              label="Twitter"
              placeholder="frontend developer"
            />
            <LabeledTextField
              name="youtube"
              type="text"
              label="YouTube"
              placeholder="frontend developer"
            />
            <LabeledTextField
              name="linkedin"
              type="text"
              label="Linkedin"
              placeholder="frontend developer"
            />
            <div className="flex items-center gap-2">
              <LabeledTextField
                name="github"
                type="text"
                label="GitHub Account"
                placeholder="xxx"
              />
              <FormSpy
                render={({ values }) => {
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="block aspect-square rounded-full cover h-[50px]"
                      src={getGuestImage(values as any, 50)}
                      alt={values.github}
                    />
                  )
                }}
              ></FormSpy>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
