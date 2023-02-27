import { Client } from "discord.js";

const event = {
  name: "ready",
  once: true,
  execute: (client: Client) => {
    console.log(`[BOT] ${client.user?.tag} is ready!`);
  },
};

export default event;
