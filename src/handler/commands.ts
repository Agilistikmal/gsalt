import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdirSync } from "fs";
import { join } from "path";

module.exports = (client: Client) => {
  const slashCommands: SlashCommandBuilder[] = [];

  let slashCommandsDir = join(__dirname, "../listener/commands");

  readdirSync(slashCommandsDir).forEach((file) => {
    if (!file.endsWith(".ts")) return;
    let command = require(`${slashCommandsDir}/${file}`).default;
    slashCommands.push(command.command);

    // @ts-ignore
    client.slashCommands.set(command.command.name, command);
  });

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN as string
  );

  rest
    .put(
      Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID as string),
      {
        body: slashCommands.map((command) => command.toJSON()),
      }
    )
    .then((data: any) => {
      data.forEach((cmd: any) => {
        console.log(`+ Command /${cmd.name} loaded`);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
