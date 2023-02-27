import { Client, Collection } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import { join } from "path";

config();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb database"))
  .catch((err: Error) => console.log(err));

const bot = new Client({
  intents: ["Guilds", "MessageContent", "GuildMessages", "GuildMembers"],
});

// @ts-ignore
bot.slashCommands = new Collection<string, any>();

const handlersDir = join(__dirname, "./handler");
readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(bot);
});

bot.login(process.env.DISCORD_BOT_TOKEN);
