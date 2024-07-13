import { Colors } from "@/lib/models";
import { APIInteractionResponse } from "discord.js";
import { title } from "process";

export const EmbedFailedResponse = (
  message?: string
): APIInteractionResponse => {
  return {
    type: 4,
    data: {
      embeds: [
        {
          title: `Error occured`,
          description: message || "",
          color: 0xd93321,
        },
      ],
    },
  };
};

export const EmbedSuccessBetResponse = (
  title: string,
  message: string,
  color: Colors
): APIInteractionResponse => {
  let embedColor = 0x34d9d9;
  if (color === "red") embedColor = 0xd93321;
  if (color === "green") embedColor = 0x21d933;
  if (color === "blue") embedColor = 0x2196f3;
  if (color === "white") embedColor = 0xffffff;
  if (color === "yellow") embedColor = 0xffff00;
  if (color === "pink") embedColor = 0xffc0cb;

  return {
    type: 4,
    data: {
      embeds: [
        {
          title: title || `Success`,
          description: message,
          color: embedColor,
        },
      ],
    },
  };
};
