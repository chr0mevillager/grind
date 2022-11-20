import { commandData, CustomCommand } from "../../exports/types";
import * as profileInfo from "../../exports/profile_info";
import * as colors from "../../exports/colors";
import * as inviteURL from "../../exports/invite_url";
import { ApplicationCommandType, ButtonStyle, MessageActionRowComponentBuilder } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";

let info: CustomCommand = {
	data: {
		name: "info",
		description: "See information about me!",
		type: ApplicationCommandType.ChatInput,
	},

	commandHelp: {
		name: "info",
		module: "general",
		keywords: [
			"info",
			"detail",
			"data",
			"general",
		],
		helpMessage: new EmbedBuilder()
			.setThumbnail("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/command_icons/info.png?raw=true")
			.setColor(colors.clearColor)
			.setTitle("Info")
			.setDescription("```Get information about me!```"),
	},

	commandData: {
		uses: 0,
	},

	async execute(interaction) {
		(info.commandData as commandData).uses++;

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(colors.clearColor)
					.setTitle("\u200b")

					.setImage("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/banners/info.png?raw=true"),

				new EmbedBuilder()
					.setColor(colors.clearColor)
					.setTitle("Coyote#7040")
					.setDescription("Run `/help` for help.\n\nRun `/announcements` for polls and news.\n\nRun `/permissions` for permission information.")
					.addFields(
						{
							name: "Version",
							value: "```\n" + profileInfo.versionNumber.replaceAll(".", ".\n") + "```",
							inline: true,
						},
						{
							name: "Release Notes",
							value: "```\n" + profileInfo.releaseNotes + "```",
							inline: true,
						},
						{
							name: "Features",
							value: "```\n" + profileInfo.featureText + "```",
							inline: true,
						},
					)
			],
			components: [
				new ActionRowBuilder<MessageActionRowComponentBuilder>()
					.addComponents([
						new ButtonBuilder()
							.setLabel("Add to Server")
							.setStyle(ButtonStyle.Link)
							.setURL(inviteURL.inviteURL + inviteURL.permissions.everything),
						new ButtonBuilder()
							.setLabel("Support Server")
							.setStyle(ButtonStyle.Link)
							.setURL("https://discord.gg/E2gYnrtaDB"),
						new ButtonBuilder()
							.setLabel("Github")
							.setStyle(ButtonStyle.Link)
							.setURL("https://github.com/chr0mevillager/coyote"),
					])
			],
			ephemeral: true,
		});
	},
};

export default info;
