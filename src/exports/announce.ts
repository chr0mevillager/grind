import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { announcementMessage } from "./types";
import * as colors from "./colors";
import { client } from "./client";

export let announcement: announcementMessage = {
	title: "There are no Current Announcements",
	description: "```Check back later for new updates, polls, and more.```"
};

/**Reset the current announcement */
export function resetAnnouncement() {
	announcement = {
		title: "There are no Current Announcements",
		description: "```Check back later for new updates, polls, and more.```"
	};
}

/**Update the current announcement */
export function updateAnnouncement(titleMessage: string, descriptionMessage: string, buttonTitle?: string, buttonLink?: string) {
	if (!buttonTitle) {
		announcement = {
			title: titleMessage,
			description: descriptionMessage,
		};
	} else {
		announcement = {
			title: titleMessage,
			description: descriptionMessage,
			button: {
				title: buttonTitle,
				link: buttonLink,
			},
		};
	}

	let buttons = [];
	if (announcement.button) {
		buttons.push(new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel(announcement.button.title)
					.setStyle(ButtonStyle.Link)
					.setURL(announcement.button.link),
			),
		);
	}

	if (client.application.id == "942083941307912193") (client.channels.cache.find((channel) => (channel as any).id === process.env.STATUS_CHANNEL) as any).send({
		embeds: [
			new EmbedBuilder()
				.setColor(colors.mainColor)
				.setTitle(announcement.title)
				.setDescription(announcement.description)
		],
		components: buttons,
		ephemeral: true,
	});
}