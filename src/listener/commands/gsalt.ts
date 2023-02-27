import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from "discord.js";
import { getTopGsalt } from "../../lib/database/util/gsalt";

const command = {
  command: new SlashCommandBuilder()
    .setName("gsalt")
    .setDescription("GSalt commands.")
    .addStringOption((option) => {
      return option.setName("action").setDescription("Choose action");
    }),
  execute: async (interaction: CommandInteraction) => {
    const action =
      interaction.options.get("action")?.value?.toString().toLowerCase() ||
      "help";

    switch (action) {
      case "help":
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("GSalt Commands Help")
              .setDescription(
                "GSalt is the currency created for GPrestore. `🧂 10 gsalt` is equal to Rp10.000."
              )
              .setFields([
                {
                  name: "🧂 /gsalt help",
                  value: "Show this page",
                  inline: true,
                },
                {
                  name: "🧂 /gsalt top",
                  value: "Show list top gsalt balance",
                  inline: true,
                },
              ])
              .setColor("DarkButNotBlack"),
          ],
        });
        break;
      case "top":
        const top = await getTopGsalt();

        const embed = new EmbedBuilder()
          .setTitle("GSalt Top Balance")
          .setDescription("Top 10 users with the most gsalts.")
          .setColor("White");

        top.forEach((t, index) => {
          embed.addFields({
            name: `${index + 1}. ${
              interaction.client.users.cache.get(t.user_id)?.tag || t.user_id
            }`,
            value: `\`🧂 ${t.balance} gsalt\``,
          });
        });
        interaction.reply({
          embeds: [embed],
        });
    }
  },
};

export default command;
