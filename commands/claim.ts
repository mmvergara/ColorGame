import { SlashCommandBuilder } from "@discordjs/builders";
import type { executeCommand } from "@/types";
import { getUser } from "@/lib/Users";

import dbConnect from "@/lib/mongodb";
import { Embed } from "@/utils/embed-response";

export const register = new SlashCommandBuilder()
  .setName("claim")
  .setDescription("Claim your daily reward");

export const execute: executeCommand = async (interaction) => {
  // Fetch the registered commands from discord api
  await dbConnect();
  const userid = interaction.member?.user.id;
  if (!userid) return Embed.error("Error Occured", "User not found");

  const user = await getUser(userid);
  // Can only claim once a day
  if (!user.last_claimed_daily) {
    return Embed.error("User not found", "Error Occured");
  }
  const lastClaimedDateTime = new Date(user.last_claimed_daily).getTime();
  if (lastClaimedDateTime > Date.now() - 86400000) {
    const hoursRemaining = Math.floor(
      (lastClaimedDateTime + 86400000 - Date.now()) / 3600000
    );

    return Embed.error(
      `You can claim again in the next ${hoursRemaining}hours`,
      `You have already claimed your daily reward`
    );
  }

  user.balance += 500;
  user.last_claimed_daily = new Date(Date.now());

  await user.save();

  return Embed.success("Reward Claimed", `Your balance is ${user.balance}`);
};
