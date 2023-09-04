import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export = <Command>{
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member from the server")
        .addUserOption(option => option.setName("user").setDescription("The user to kick").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for kicking the user").setRequired(false))
        .addBooleanOption(option => option.setName("silent").setDescription("Whether to send a message to the user").setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    category: "moderation",
    execute: async interaction => {
        await interaction.deferReply();
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") ?? "No reason provided";
        const silent = interaction.options.getBoolean("silent") ?? false;

        if (!interaction.guild) return interaction.editReply("This command can only be used in a server");
        if (!user) return interaction.editReply("You must provide a user to kick");

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.editReply("That user is not in this server");

        if (!member.kickable) return interaction.editReply("That user cannot be kicked");

        await member.kick(reason);

        if (!silent) await user.send(`You have been kicked from **${interaction.guild.name}** for **${reason}**`);
        await interaction.editReply(`Kicked **${user.tag}** for **${reason}**`);
    },
};
