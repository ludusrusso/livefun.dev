import { Footer } from "app/components/footers"
import { Nav } from "app/components/nav"
import { Head, BlitzLayout } from "blitz"

export const AppLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "livefun.dev"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
