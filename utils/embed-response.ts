import { Colors, getEmbedColor } from "@/lib/game";
import { APIInteractionResponse } from "discord.js";

export class Embed {
  static error(description: string, title?: string): APIInteractionResponse {
    return {
      type: 4,
      data: {
        embeds: [
          {
            title: title || "Error Occured",
            description,
            color: getEmbedColor("red"),
          },
        ],
      },
    };
  }

  static success(title: string, description: string): APIInteractionResponse {
    return {
      type: 4,
      data: {
        embeds: [
          {
            title,
            description,
            color: getEmbedColor("green"),
          },
        ],
      },
    };
  }

  static betPlaced(
    title: string,
    message: string,
    color: Colors
  ): APIInteractionResponse {
    let embedColor = getEmbedColor(color);
    return {
      type: 4,
      data: {
        embeds: [
          {
            title: title,
            description: message,
            color: embedColor,
          },
        ],
      },
    };
  }
}
