import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Interaction,
} from "discord.js";
import {
  createQris,
  generateQrisImgPath,
  getQris,
} from "../../lib/payment/xendit";
import type { BotEvent } from "../../types";
import randomstring from "randomstring";
import fs from "fs";

const event: BotEvent = {
  name: "interactionCreate",
  once: false,
  execute: async (interaction: Interaction) => {
    // Deposit Modal
    if (interaction.isModalSubmit() && interaction.customId == "deposit") {
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
          .setCustomId(`depositConfirm-${amount}`)
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

    // Deposit Confirm
    if (
      interaction.isButton() &&
      interaction.customId.includes("depositConfirm")
    ) {
      const amount = parseInt(interaction.customId.split("-")[1]);
      const order_id = randomstring.generate(7);
      const qris = await createQris(order_id, amount * 1000);
      const qris_path = generateQrisImgPath(qris);
      const qris_img = new AttachmentBuilder(qris_path, {
        name: "qris.jpg",
      });

      const embed = new EmbedBuilder()
        .setTitle(
          `Deposit ${amount} gsalt (Rp${Intl.NumberFormat("id-ID").format(
            amount * 1000
          )})`
        )
        .setDescription(
          "Scan QRIS dibawah ini menggunakan e-Wallet, atau Mobile Banking untuk pembayaran. Klik tombol `Sudah bayar` jika sudah melakukan pembayaran"
        )
        .setImage("attachment://qris.jpg")
        .setFooter({ text: `Order ID: ${order_id}` })
        .setColor("White");

      const components = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`checkStatus-${order_id}`)
          .setEmoji("<:guildCheckmark:1080844340143861890>")
          .setLabel("Sudah bayar")
          .setStyle(ButtonStyle.Secondary)
      );

      interaction.user.send({
        embeds: [embed],
        // @ts-ignore
        components: [components],
        files: [qris_img],
      });
      interaction.reply({
        content: "Silahkan cek DM anda",
        ephemeral: true,
      });

      setTimeout(() => {
        fs.unlinkSync(qris_path);
      }, 10000);
    }

    if (
      interaction.isButton() &&
      interaction.customId.includes("checkStatus")
    ) {
      const order_id = interaction.customId.split("-")[1];
      const qris: any = await getQris(order_id);

      if (qris.status == "ACTIVE") {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`Order ID: ${order_id}`)
              .setDescription("Status: `BELUM DIBAYAR`")
              .setColor("Yellow"),
          ],
          ephemeral: true,
        });
      } else if (qris.status == "INACTIVE") {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`Order ID: ${order_id}`)
              .setDescription(
                "Status: `SUDAH DIBAYAR`\nTerimakasih, balance gsalt anda saat ini `🧂 50`"
              )
              .setColor("Green"),
          ],
        });
      }
    }
  },
};

export default event;
