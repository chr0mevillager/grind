import {
	Client, IntentsBitField,
} from 'discord.js';

export const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });