import { SlashCommandBuilder } from "@discordjs/builders";
import { executeCommand } from "@/types";
import dbConnect from "@/lib/mongodb";
import { BetSession, Colors, UserData } from "@/lib/models";
import { APIApplicationCommandInteractionDataRoleOption } from "discord.js";
import {
  EmbedFailedResponse,
  EmbedSuccessBetResponse,
} from "@/utils/embed-response";
import { getUser } from "@/lib/Users";
import { getBetSession } from "@/lib/BetSessions";
import { getRandomSarcasticQuote } from "@/utils/sarcastic-quote";
// 🟨🟩🟪🟥🟦🟧
export const register = new SlashCommandBuilder()
  .setName("bet")
  .addIntegerOption((option) =>
    option.setName("amount").setDescription("Amount to bet").setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("color")
      .setDescription("Color to bet on")
      .setRequired(true)
      .addChoices([
        { name: "🟥 Red", value: "red" },
        { name: "🟦 Blue", value: "blue" },
        { name: "🟩 Green", value: "green" },
        { name: "🐻‍❄️ White", value: "white" },
        { name: "🟨 Yellow", value: "yellow" },
        { name: "🟪 Pink", value: "pink" },
      ])
  )
  .setDescription("Bet on a color");

export const execute: executeCommand = async (interaction) => {
  // You have access to do interaction object
  // https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object

  await dbConnect();
  // find user
  const userid = interaction.member?.user.id;
  if (!userid) return EmbedFailedResponse("User not found");
  const user = await getUser(userid);

  //@ts-ignore
  const amount = interaction.data?.options?.find(
    (option: any) => option.name === "amount"
  )?.value as number;
  //@ts-ignore
  const color = interaction.data?.options?.find(
    (option: any) => option.name === "color"
  )?.value as Colors;

  if (amount <= 0) {
    return EmbedFailedResponse("Amount should be greater than 0");
  }

  if (!amount || !color) {
    return EmbedFailedResponse("Invalid input");
  }

  if (amount > user.balance) {
    return EmbedFailedResponse("You don't have enough balance");
  }

  // Find Bet Session or create new one
  if (!interaction.guild_id) {
    return EmbedFailedResponse("Guild not found");
  }
  const betSession = await getBetSession(interaction.guild_id);
  // add bet
  //@ts-ignore
  betSession[color].push({
    userId: interaction.member?.user.id,
    global_name: interaction.member?.user.global_name,
    betAmount: amount,
  });

  // deduct balance
  user.balance -= amount;

  await user.save();
  await betSession.save();

  const username = interaction.member?.user.global_name || "User";

  return EmbedSuccessBetResponse(
    `${interaction.member?.user.global_name} bets $${amount} on ${color}`,
    getRandomSarcasticQuote(username, "$" + amount, color) +
      "\n\n" +
      `Bal: $${user.balance}`,
    color
  );
};
