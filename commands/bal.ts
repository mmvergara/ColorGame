import { SlashCommandBuilder } from "@discordjs/builders";
import type { executeCommand } from "@/types";
import { getUser } from "@/lib/Users";
import dbConnect from "@/lib/mongodb";
import { Embed } from "@/utils/embed-response";

export const register = new SlashCommandBuilder()
  .setName("bal")
  .setDescription("Check your balance");

export const execute: executeCommand = async (interaction) => {
  // Fetch the registered commands from discord api
  await dbConnect();

  const userid = interaction.member?.user.id;
  if (!userid) return Embed.error("User not found");

  const user = await getUser(userid);
  return Embed.success("Balance", `Your balance is ${user.balance}`);
};
