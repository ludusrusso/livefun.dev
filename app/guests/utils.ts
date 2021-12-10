import { Guest } from "@prisma/client"

export const getGuestImage = (guest: Pick<Guest, "github">, size: number = 500) => {
  return `https://avatars.githubusercontent.com/${guest.github}?s=${size}`
}
