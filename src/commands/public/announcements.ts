import { commandData, CustomCommand } from "../../exports/types";
import * as colors from "../../exports/colors";
import * as announceMessage from "../../exports/announce";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

let announcements: CustomCommand = {
	data: {
		name: "announcements",
		description: "View the latest information, polls, and more!",
	},

	commandHelp: {
		name: "announcements",
		module: "general",
		keywords: [
			"announce",
			"update",
			"info",
			"late",
			"anno",
		],
		helpMessage: new EmbedBuilder()
			.setThumbnail("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/command_icons/announcements.png?raw=true")
			.setColor(colors.clearColor)
			.setTitle("Announcements")
			.setDescription("```View the latest information, polls, and more!```"),
	},

	commandData: {
		uses: 0,
	},

	async execute(interaction) {
		(announcements.commandData as commandData).uses++;

		let buttons = [];
		if (announceMessage.announcement.button) {
			buttons.push(new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel(announceMessage.announcement.button.title)
						.setStyle(ButtonStyle.Link)
						.setURL(announceMessage.announcement.button.link),
				),
			);
		}

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(colors.mainColor)
					.setTitle(announceMessage.announcement.title)
					.setDescription(announceMessage.announcement.description)
			],
			components: buttons,
			ephemeral: true,
		});
	},
};

export default announcements;
