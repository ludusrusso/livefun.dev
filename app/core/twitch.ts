import * as twurple from "@twurple/api"
import * as twurpleAuth from "@twurple/auth"

const authProvider = new twurpleAuth.StaticAuthProvider(
  process.env.TWITCH_CLIENT_ID!,
  process.env.TWITCH_ACCESS_TOKEN!
)
export const twitchCli = new twurple.ApiClient({
  authProvider,
})
