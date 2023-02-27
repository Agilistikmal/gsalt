import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

module.exports = (client: Client) => {
  let eventsDir = join(__dirname, "../listener/events");

  readdirSync(eventsDir).forEach((file) => {
    if (!file.endsWith(".ts")) return;
    let event = require(`${eventsDir}/${file}`).default;
    event.once
      ? client.once(event.name, (...args) => event.execute(...args))
      : client.on(event.name, (...args) => event.execute(...args));
    console.log(`+ Event ${file} loaded`);
  });
};
