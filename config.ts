if (!process.env.BOT_TOKEN) throw new Error("BOT_TOKEN is not set");
if (!process.env.PUBLIC_KEY) throw new Error("PUBLIC_KEY is not set");
if (!process.env.REGISTER_COMMANDS_KEY)
  throw new Error("REGISTER_COMMANDS_KEY is not set");
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set");

export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const PUBLIC_KEY = process.env.PUBLIC_KEY!;
export const REGISTER_COMMANDS_KEY = process.env.REGISTER_COMMANDS_KEY!;
export const MONGODB_URI = process.env.MONGODB_URI!;

console.log("HELLO FROM CONFIG FILE");
