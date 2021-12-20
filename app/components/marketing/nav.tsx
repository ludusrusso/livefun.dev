import { Disclosure, Menu, Transition } from "@headlessui/react"
import { XIcon, MenuIcon, BellIcon } from "@heroicons/react/outline"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Link } from "blitz"
import { Fragment } from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export const MarketingNav = () => {
  const user = useCurrentUser()

  let navigation = [{ name: "Dashboard", href: "#", current: true }]

  if (user) {
    navigation = [
      ...navigation,
      { name: "Events", href: "/events", current: false },
      { name: "Guests", href: "/guests", current: false },
    ]
  }

  return (
    <Disclosure as="nav" className="bg-stone-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex-shrink-0 flex items-center">
                  <p className="text-stone-200 text-2xl font-black">{"{...fun}"}</p>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-stone-900 text-white"
                            : "text-stone-300 hover:bg-stone-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      item.current
                        ? "bg-stone-900 text-white"
                        : "text-stone-300 hover:bg-stone-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
