import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export = <Command>{
    data: new SlashCommandBuilder()
        .setName("nickname")
        .setDescription("Change a member's nickname")
        .addUserOption(option => option.setName("user").setDescription("The user to change the nickname of").setRequired(true))
        .addStringOption(option => option.setName("nickname").setDescription("The new nickname. None for username").setRequired(false))
        .addStringOption(option => option.setName("reason").setDescription("The reason for timing out the user").setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .setDMPermission(false),
    category: "moderation",
    execute: async interaction => {
        await interaction.deferReply();
        const user = interaction.options.getUser("user");
        const nickname = interaction.options.getString("nickname") ?? null;
        const reason = interaction.options.getString("reason") ?? "No reason provided";

        if (!interaction.guild) return interaction.editReply("This command can only be used in a server");
        if (!user) return interaction.editReply("You must provide a user to change the nickname of");
        if (!nickname) return interaction.editReply("You must provide a nickname");

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.editReply("That user is not in this server");

        await member.setNickname(nickname, reason);

        await interaction.editReply(`Changed **${user.tag}**'s nickname to **${nickname}**`);
    }
};