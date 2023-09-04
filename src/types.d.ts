import { AutocompleteInteraction, ChatInputCommandInteraction, Collection, Message, PermissionResolvable, SlashCommandBuilder } from "discord.js"

export interface Command {
    data: SlashCommandBuilder,
    category: string,
    execute: (interaction: ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    cooldown?: number // in seconds
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args: any) => void
}

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}