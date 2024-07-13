import mongoose from "mongoose";
export type Colors = "red" | "blue" | "green" | "white" | "yellow" | "pink";

// UserData Model
const UserDataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  wins: {
    type: Number,
    default: 0,
  },
  last_claimed_daily: {
    type: Date,
    default: null,
  },
});

const Bets = [
  {
    userId: String,
    global_name: String,
    betAmount: Number,
  },
];

// BetSession Model
const BetSessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  red: Bets,
  blue: Bets,
  green: Bets,
  white: Bets,
  yellow: Bets,
  pink: Bets,
});

// Create models
export const UserData =
  mongoose.models.UserData || mongoose.model("UserData", UserDataSchema);
export const BetSession =
  mongoose.models.BetSession || mongoose.model("BetSession", BetSessionSchema);
