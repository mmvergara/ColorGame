import { BetSession } from "./models";

export const getBetSession = async (guildId: string) => {
  let betSession = await BetSession.findOne({ guildId: guildId });
  if (!betSession) {
    betSession = await new BetSession({
      id: guildId,
      guildId: guildId,
      red: [],
      blue: [],
      green: [],
      white: [],
      yellow: [],
      pink: [],
    }).save();
  }
  return betSession;
};
