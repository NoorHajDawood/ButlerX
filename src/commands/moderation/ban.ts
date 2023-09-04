import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export = <Command>{
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member from the server")
        .addUserOption(option => option.setName("user").setDescription("The user to ban").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for banning the user").setRequired(false))
        .addBooleanOption(option => option.setName("silent").setDescription("Whether to send a message to the user").setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    category: "moderation",
    execute: async interaction => {
        await interaction.deferReply();
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") ?? "No reason provided";
        const silent = interaction.options.getBoolean("silent") ?? false;

        if (!interaction.guild) return interaction.editReply("This command can only be used in a server");
        if (!user) return interaction.editReply("You must provide a user to ban");

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.editReply("That user is not in this server");

        if (!member.bannable) return interaction.editReply("That user cannot be banned");

        await member.ban({ reason });

        if (!silent) await user.send(`You have been banned from **${interaction.guild.name}** for **${reason}**`);
        await interaction.editReply(`Banned **${user.tag}** for **${reason}**`);
    }
};