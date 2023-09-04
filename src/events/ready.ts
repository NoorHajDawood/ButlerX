import { Events } from "discord.js";
import { BotEvent } from "../types";

export = <BotEvent>{
	name: Events.ClientReady,
	once: true,
	execute: client => {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
