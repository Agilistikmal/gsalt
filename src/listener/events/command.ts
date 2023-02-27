// @ts-nocheck

import { Interaction } from "discord.js";
import type { BotEvent } from "../../types";

const event: BotEvent = {
  name: "interactionCreate",
  execute: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let command = interaction.client.slashCommands.get(interaction.commandName);
    if (!command) return;

    command.execute(interaction);
  },
};

export default event;
