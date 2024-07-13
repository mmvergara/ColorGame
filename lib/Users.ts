import { UserData } from "./models";

export const getUser = async (id: string) => {
  let user = await UserData.findOne({ id });
  if (!user) {
    console.log("New User detected, creating new user");
    user = await new UserData({
      id,
      balance: 500,
      wins: 0,
      last_claimed_daily: null,
    }).save();
  }

  return user;
};
