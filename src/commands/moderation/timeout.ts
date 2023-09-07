import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export = <Command>{
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout a member from the server")
        .addUserOption(option => option.setName("user").setDescription("The user to timeout").setRequired(true))
        .addNumberOption(option => option.setName("duration").setDescription("The duration of the timeout in minutes").setRequired(false))
        .addStringOption(option => option.setName("reason").setDescription("The reason for timing out the user").setRequired(false))
        .addBooleanOption(option => option.setName("silent").setDescription("Whether to send a message to the user").setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    category: "moderation",
    execute: async interaction => {
        await interaction.deferReply();
        const user = interaction.options.getUser("user");
        const duration = interaction.options.getNumber("duration") ?? null;
        const reason = interaction.options.getString("reason") ?? "No reason provided";
        const silent = interaction.options.getBoolean("silent") ?? false;

        if (!interaction.guild) return interaction.editReply("This command can only be used in a server");
        if (!user) return interaction.editReply("You must provide a user to timeout");

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.editReply("That user is not in this server");

        await member.timeout(duration, reason);

        if (!silent) await user.send(`You have been timed out from **${interaction.guild.name}** for **${reason}**`);
        await interaction.editReply(`Timed out **${user.tag}** for **${reason}**`);
    }
};