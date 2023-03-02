import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalSubmitInteraction,
} from "discord.js";
import type { BotEvent } from "../../types";

const event: BotEvent = {
  name: "interactionCreate",
  once: false,
  execute: (interaction: ModalSubmitInteraction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId == "deposit") {
      const amount = parseInt(interaction.fields.getTextInputValue("amount"));

      const embed = new EmbedBuilder()
        .setTitle("GSalt Deposit")
        .setDescription(
          `You will deposit a balance of \`🧂 ${amount} gsalt (Rp${Intl.NumberFormat(
            "id-ID"
          ).format(amount * 1000)})\`` +
            "\n" +
            "To confirm, click confirm button below. You will be sent a message by the bot to make a payment (QRIS), make sure you enable Direct Messages access from this server."
        )
        .setColor("White");

      const components = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("confirm")
          .setEmoji("<:guildCheckmark:1080844340143861890>")
          .setLabel("Confirm")
          .setStyle(ButtonStyle.Secondary)
      );

      interaction.reply({
        embeds: [embed],
        // @ts-ignore
        components: [components],
        ephemeral: true,
      });
    }
  },
};

export default event;
