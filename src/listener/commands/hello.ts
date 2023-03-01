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
          .setDescription(
            `${
              interaction.client.ws.ping < 100
                ? "<:voicePingConnection1:1080416757912707085> "
                : interaction.client.ws.ping > 300
                ? "<:voicePingConnection1:1080416757912707085> "
                : "<:voicePingConnection2:1080416760450273290> "
            } Check Ping: \`${interaction.client.ws.ping} ms\``
          )
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
