import { SlashCommandBuilder } from "@discordjs/builders";
import type { executeCommand } from "@/types";
import { getUser } from "@/lib/Users";
import dbConnect from "@/lib/mongodb";
import { Embed } from "@/utils/embed-response";
import { getColorEmoji, getTwoRandomColors } from "@/lib/game";
import { getBetSession } from "@/lib/BetSessions";

export const register = new SlashCommandBuilder()
  .setName("spin")
  .setDescription("The moment of truth!");

export const execute: executeCommand = async (interaction) => {
  // Fetch the registered commands from discord api
  await dbConnect();

  const userid = interaction.member?.user.id;
  if (!userid) return Embed.error("User not found");

  const [color1, color2] = getTwoRandomColors();
  const multiplier = color1 === color2 ? 4 : 2;

  // Find Bet Session or create new one
  if (!interaction.guild_id) {
    return Embed.error("Guild not found");
  }
  const betSession = await getBetSession(interaction.guild_id);
  const winners: string[] = [];
  if (color1 === color2) {
    betSession[color1].forEach(async (bet) => {
      console.log(bet);
      const user = await getUser(bet.userId);
      user.balance += bet.betAmount * multiplier;
      winners.push(bet.global_name + "Won $" + bet.betAmount * multiplier);
      user.save();
    });
  } else {
    betSession[color1].forEach(async (bet) => {
      console.log(bet);
      const user = await getUser(bet.userId);
      user.balance += bet.betAmount * multiplier;
      winners.push(bet.global_name + "Won $" + bet.betAmount * multiplier);
      user.save();
    });
    betSession[color2].forEach(async (bet) => {
      console.log(bet);
      const user = await getUser(bet.userId);
      user.balance += bet.betAmount * multiplier;
      winners.push(bet.global_name + "Won $" + bet.betAmount * multiplier);
      user.save();
    });
  }

  await betSession.deleteOne();

  console.log(winners);
  console.log(winners);
  console.log(winners);
  return Embed.success(
    `Result ${getColorEmoji(color1)} ${getColorEmoji(color2)}`,
    `Winners:\n${winners.join("\n")}`
  );
};
