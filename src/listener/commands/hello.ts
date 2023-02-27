import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from "discord.js";

const command = {
  command: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Check bot ping"),
  execute: (interaction: CommandInteraction) => {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Hello")
          .setDescription(`Check Ping: ${interaction.client.ws.ping}`)
          .setColor(
            interaction.client.ws.ping < 100
              ? "Green"
              : interaction.client.ws.ping > 300
              ? "Red"
              : "Yellow"
          ),
      ],
    });
  },
};

export default command;
