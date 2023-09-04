import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export = <Command>{
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Check availability"),
	category: "utility",
	execute: async interaction => {
		await interaction.reply("At your service, sir!");
	},
};
