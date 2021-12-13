import { ReactNode, PropsWithoutRef, useState, useCallback } from "react"
import { Form as FinalForm, FormProps as FinalFormProps, FormSpy } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  children?: ReactNode
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError, invalid }) => (
        <form onSubmit={handleSubmit} {...props}>
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <button
              type="submit"
              className="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 disabled:bg-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={invalid || submitting}
            >
              {submitText}
            </button>
          )}
          {process.env.NODE_ENV === "development" && (
            <FormSpy
              render={({ values, errors }) => {
                return <DebugForm values={{ values, errors }}></DebugForm>
              }}
            ></FormSpy>
          )}
        </form>
      )}
    />
  )
}

export default Form

export const DebugForm = ({ values }: { values: any }) => {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen((o) => !o), [setOpen])

  return (
    <div className="fixed right-0 top-0 bottom-0 h-screen grid place-content-center max-w-md">
      {!open && <button type="button" className="h-20 w-6 bg-red-500" onClick={toggle}></button>}
      {open && (
        <div className="h-screen bg-white shadow">
          <button
            className="w-md bg-stone-700 text-white w-8 h-8 absolute top-0 right-0"
            onClick={toggle}
          >
            x
          </button>
          <pre className="p-2">{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
