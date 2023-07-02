import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";

export default async function grantRole(req: NextApiRequest, res: NextApiResponse) {
// Get the Next Auth session so we can use the user ID as part of the discord API request
const session = await getServerSession(req, res, authOptions)

if (!session) {
  res.status(401).json({ error: "Not logged in" });
  return;
}

const discordServerId = "1068823795688816741";

// @ts-ignore
const { userId } = session;

console.log(userId)

const roleId = "1085164951603265536";
console.log(`https://discordapp.com/api/guilds/${discordServerId}/members/${userId}/roles/${roleId}`)
const response = await fetch(
  // Discord Developer Docs for this API Request: https://discord.com/developers/docs/resources/guild#add-guild-member-role
  `https://discordapp.com/api/guilds/${discordServerId}/members/${userId}/roles/${roleId}`,
  {
    headers: {
      // Use the bot token to grant the role
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
    method: "PUT",
  }
);

// Check if the API call is resolved successfully
alert("Role granted");
}
