import { ClientEvents } from "discord.js";

export interface BotEvent {
  name: keyof ClientEvents;
  once?: boolean | false;
  execute: (...args: any) => void;
}
