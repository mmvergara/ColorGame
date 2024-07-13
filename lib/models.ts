import mongoose, { Document, Model } from "mongoose";

// UserData Interface
interface IUserData extends Document {
  id: string;
  balance: number;
  wins: number;
  last_claimed_daily: Date | null;
}

// UserData Schema
const UserDataSchema = new mongoose.Schema<IUserData>({
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

// Bet Interface
interface IBet {
  userId: string;
  global_name: string;
  betAmount: number;
}

// BetSession Interface
interface IBetSession extends Document {
  id: string;
  guildId: string;
  red: IBet[];
  blue: IBet[];
  green: IBet[];
  white: IBet[];
  yellow: IBet[];
  pink: IBet[];
}

// BetSession Schema
const BetSessionSchema = new mongoose.Schema<IBetSession>({
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
  red: [{ userId: String, global_name: String, betAmount: Number }],
  blue: [{ userId: String, global_name: String, betAmount: Number }],
  green: [{ userId: String, global_name: String, betAmount: Number }],
  white: [{ userId: String, global_name: String, betAmount: Number }],
  yellow: [{ userId: String, global_name: String, betAmount: Number }],
  pink: [{ userId: String, global_name: String, betAmount: Number }],
});

// Create models with type safety
export const UserData: Model<IUserData> =
  mongoose.models.UserData ||
  mongoose.model<IUserData>("UserData", UserDataSchema);
export const BetSession: Model<IBetSession> =
  mongoose.models.BetSession ||
  mongoose.model<IBetSession>("BetSession", BetSessionSchema);
