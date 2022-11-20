import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";
import * as emoji from "./emoji";

export const buttonRow = (uuid: string) => new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId(uuid + "::send")
			.setLabel("Send")
			.setEmoji(emoji.white.confirm)
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setCustomId(uuid + "::cancel")
			.setLabel("Cancel")
			.setEmoji(emoji.white.cancel)
			.setStyle(ButtonStyle.Danger),
	);
export const buttonRowDisabled = (uuid: string) => new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId(uuid + "::send")
			.setLabel("Send")
			.setEmoji(emoji.white.confirm)
			.setStyle(ButtonStyle.Success)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(uuid + "::cancel")
			.setLabel("Cancel")
			.setEmoji(emoji.white.cancel)
			.setStyle(ButtonStyle.Danger)
			.setDisabled(true),
	);