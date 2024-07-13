import { SlashCommandBuilder } from "@discordjs/builders";
import { executeCommand } from "@/types";
import dbConnect from "@/lib/mongodb";
import { Embed } from "@/utils/embed-response";
import { getUser } from "@/lib/Users";
import { getBetSession } from "@/lib/BetSessions";
import { getRandomSarcasticQuote } from "@/utils/sarcastic-quote";
import { Colors } from "@/lib/game";
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
  const userId = interaction.member?.user.id;
  if (!userId) return Embed.error("User not found");
  const global_name = interaction.member?.user.global_name;
  if (!global_name) return Embed.error("User not found");

  const user = await getUser(userId);

  //@ts-ignore
  const amount = interaction.data?.options?.find(
    (option: any) => option.name === "amount"
  )?.value as number;
  //@ts-ignore
  const color = interaction.data?.options?.find(
    (option: any) => option.name === "color"
  )?.value as Colors;

  if (amount <= 0) {
    return Embed.error("Amount should be greater than 0");
  }

  if (!amount || !color) {
    return Embed.error("Invalid input");
  }

  if (amount > user.balance) {
    return Embed.error("You don't have enough balance");
  }

  // Find Bet Session or create new one
  if (!interaction.guild_id) {
    return Embed.error("Guild not found");
  }
  const betSession = await getBetSession(interaction.guild_id);
  // add bet
  //@ts-ignore
  betSession[color].push({
    userId,
    global_name,
    betAmount: amount,
  });

  // deduct balance
  user.balance -= amount;

  await user.save();
  await betSession.save();

  const username = interaction.member?.user.global_name || "User";

  return Embed.betPlaced(
    `${interaction.member?.user.global_name} bets $${amount} on ${color}`,
    getRandomSarcasticQuote(username, "$" + amount, color) +
      "\n\n" +
      `Bal: $${user.balance}`,
    color
  );
};
