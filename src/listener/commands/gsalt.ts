import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { getTopGsalt } from "../../lib/database/util/gsalt";

const command = {
  command: new SlashCommandBuilder()
    .setName("gsalt")
    .setDescription("GSalt commands.")
    .addStringOption((option) => {
      option.addChoices(
        { name: "Help", value: "help" },
        { name: "Top", value: "top" },
        { name: "Transfer", value: "transfer" },
        { name: "Withdraw", value: "withdraw" }
      );
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
                {
                  name: " ",
                  value: " ",
                  inline: true,
                },
                {
                  name: "🧂 /gsalt transfer",
                  value: "Transfer your gsalt to another user",
                  inline: true,
                },
                {
                  name: "🧂 /gsalt withdraw",
                  value: "Withdraw your gsalt to Bank, or e-Wallet (Rupiah)",
                  inline: true,
                },
                {
                  name: " ",
                  value: " ",
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
            name: `Top ${index + 1}`,
            value:
              `${
                index + 1 == 1
                  ? "<:guildOwner:1080417844094836800>"
                  : "<:guildMember:1080416748630704208>"
              } <@${t.user_id}>` +
              `\n` +
              `\`🧂 ${t.balance} gsalt\``,
          });
        });
        interaction.reply({
          embeds: [embed],
        });
        break;
      case "transfer":
        const modal = new ModalBuilder()
          .setCustomId("transfer")
          .setTitle("Transfer gsalt balance")
          .addComponents(
            // @ts-ignore
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("targetAccountNumber")
                .setLabel("Target Account Number")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setPlaceholder("Example: 102184")
            ),
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("amount")
                .setLabel("Amount")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setPlaceholder("Example: 5")
            )
          );

        interaction.showModal(modal);
        break;
    }
  },
};

export default command;
