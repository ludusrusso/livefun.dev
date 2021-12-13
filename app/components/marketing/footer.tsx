import { getGuestImage } from "app/guests/utils"

export const MarketingFooter = () => {
  return (
    <div className="min-h-64 bg-stone-900 text-stone-200">
      <div className="m-auto max-w-lg py-10">
        <h2 className="text-center text-4xl font-black "> Su di me </h2>
        <div className="flex flex-col md:flex-row items-center mt-10 gap-4">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="rounded-full overflow-hidden aspect-square w-48 min-w-fit"
              width={200}
              height={200}
              src={getGuestImage({ github: "ludusrusso" }, 150)}
              alt="Ludovico Russo"
            />
          }
          <p className="leading-relaxed tracking-wide px-4 text-center md:text-left md:px-0">
            <span className="font-bold">Ludovico Russo</span> è uno sviluppatore, content creator e
            studente a vita. Lavora come consulente tecnologico in ambito web e cloud e scrive
            salutariamente blog su{" "}
            <a
              className="text-purple-500 underline"
              target="_blank"
              href="https://ludusrusso.cc"
              rel="noreferrer"
            >
              ludusrusso.cc
            </a>
          </p>
        </div>
      </div>
      <div className="pb-4 text-center m-auto text-stone-400">
        <a href="https://github.com/ludusrusso/livefun.dev" target="_blank" rel="noreferrer">
          source code
        </a>
      </div>
    </div>
  )
}
