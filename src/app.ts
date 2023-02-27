import { Client, Collection } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";

config();

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
