import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandOptionType, ApplicationCommandType, ButtonStyle, ForumChannel, TextChannel, } from "discord.js";
import { clearColor, mainColor } from "../exports/colors";
import emojis from "../exports/emoji";
import { CustomCommand } from "../exports/types";

//Timeline of events
/*

1. Post in forum channel
  - Banner image
  - Title, short description in a message
  - Download link + mcpedl link in buttons, video link
  - Ask for questions, suggestions, bug report in message
2. Post direct download link in a message
  - Link to forum post
3. Make announcement
  - Ping everyone
  - Title, short description in a message
  - Link to forum post
*/

let dev_toolkit_entry: CustomCommand = {
	data: {
		name: "dev_toolkit_entry",
		description: "Post a new developer toolkit entry!",
		type: ApplicationCommandType.ChatInput,
		defaultMemberPermissions: "Administrator",
		dmPermission: false,
		options: [
			{
				name: "title",
				description: "What is the name of the release?",
				type: ApplicationCommandOptionType.String,
				maxLength: 256,
				required: true,
			},
			{
				name: "short_description",
				description: "What is the quick description of the release?",
				type: ApplicationCommandOptionType.String,
				maxLength: 1024,
				required: true,
			},
			{
				name: "version",
				description: "What version was this release made on?",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
			{
				name: "modification_instructions",
				description: "How should users use this addon?",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
			{
				name: "banner_image",
				description: "What is the banner of the release?",
				type: ApplicationCommandOptionType.Attachment,
				required: true,
			},
			{
				name: "yt-video",
				description: "What is the youtube trailer of the release? (Link)",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
			{
				name: "direct_download_link",
				description: "What is the direct download link of the release? (Link)",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
			{
				name: "linkvertise_download_link",
				description: "What is the linkvertise download link of the release? (Link)",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
			{
				name: "ping",
				description: "Should @everyone be pinged?",
				type: ApplicationCommandOptionType.Boolean,
				required: true,
			},
			{
				name: "forum_channel",
				description: "What is the forum channel to post to?",
				type: ApplicationCommandOptionType.Channel,
				required: true,
			},
			{
				name: "direct_download_channel",
				description: "What is the direct download channel to post to?",
				type: ApplicationCommandOptionType.Channel,
				required: true,
			},
			{
				name: "announcement_channel",
				description: "What is the announcement channel to post to?",
				type: ApplicationCommandOptionType.Channel,
				required: true,
			},
		],
	},

	async chatExecute(interaction) {
		let responseEmbed = new EmbedBuilder()
			.setTitle("Releasing...")
			.setColor(clearColor)
		interaction.reply({
			embeds: [responseEmbed],
			ephemeral: true,
		});

		let postId;
		await (interaction.options.getChannel("forum_channel") as any as ForumChannel).threads.create({
			name: interaction.options.getString("title"),
			message: {
				files: [
					interaction.options.getAttachment("banner_image").attachment,
				],
				embeds: [
					new EmbedBuilder()
						.setTitle(interaction.options.getString("title"))
						.setDescription("```" + interaction.options.getString("short_description") + "```")
						.setColor(clearColor)
						.addFields([
							{
								name: "Installation Instructions",
								value: "```To install this entry, first download the file below. Then, open the file and view it in the com.mojang folder.``` To find the com.mojang folder, view [this article](https://wiki.bedrock.dev/guide/project-setup.html#the-com-mojang-folder).",
								inline: false,
							},
							{
								name: "Modification Instructions",
								value: "```" + interaction.options.getString("modification_instructions") + "```",
								inline: false,
							},
							{
								name: "Feedback",
								value: "```Find any bugs or have any suggestions? Let us know below!```",
								inline: true,
							},
							{
								name: "Version Support",
								value: "```This release was designed for version " + interaction.options.getString("version") + ". Using this on other versions may lead to unexpected behavior.```",
								inline: true,
							},
						])
					//.setThumbnail()
				],
				components: [
					new ActionRowBuilder<ButtonBuilder>()
						.addComponents(
							new ButtonBuilder()
								.setStyle(ButtonStyle.Link)
								.setURL(interaction.options.getString("yt-video"))
								.setLabel("Youtube Video")
								.setEmoji(emojis.youtube),
							new ButtonBuilder()
								.setStyle(ButtonStyle.Link)
								.setURL(interaction.options.getString("linkvertise_download_link"))
								.setLabel("Download")
								.setEmoji(emojis.downArrow),
						)
				],
			}
		}).then((thread) => postId = thread.id);

		await (interaction.options.getChannel("direct_download_channel") as any as TextChannel).send({
			files: [
				interaction.options.getAttachment("banner_image").attachment,
			],
			embeds: [
				new EmbedBuilder()
					.setTitle(interaction.options.getString("title"))
					.setDescription("```" + interaction.options.getString("short_description") + "```")
					.setColor(clearColor)
					.setThumbnail("https://github.com/chr0mevillager/grind/blob/master/src/artwork/devToolkit.png?raw=true")
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>()
					.addComponents(
						new ButtonBuilder()
							.setStyle(ButtonStyle.Link)
							.setURL(interaction.options.getString("direct_download_link"))
							.setLabel("Download")
							.setEmoji(emojis.premiumDownArrow),
						new ButtonBuilder()
							.setStyle(ButtonStyle.Link)
							.setURL("https://discord.com/channels/" + interaction.guildId + "/" + interaction.options.getChannel("forum_channel").id + "/" + postId)
							.setLabel("More Information")
							.setEmoji(emojis.premiumInformation),
					)
			],
		});

		await (interaction.options.getChannel("announcement_channel") as any as TextChannel).send({
			content: interaction.options.getBoolean("ping") ? "@everyone" : "",
			files: [
				interaction.options.getAttachment("banner_image").attachment,
			],
			embeds: [
				new EmbedBuilder()
					.setTitle(interaction.options.getString("title"))
					.setDescription("```" + interaction.options.getString("short_description") + "```")
					.setColor(clearColor)
					.setThumbnail("https://github.com/chr0mevillager/grind/blob/master/src/artwork/devToolkit.png?raw=true")
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>()
					.addComponents(
						new ButtonBuilder()
							.setStyle(ButtonStyle.Link)
							.setURL(interaction.options.getString("linkvertise_download_link"))
							.setLabel("Download")
							.setEmoji(emojis.downArrow),
						new ButtonBuilder()
							.setStyle(ButtonStyle.Link)
							.setURL("https://discord.com/channels/" + interaction.guildId + "/" + interaction.options.getChannel("forum_channel").id + "/" + postId)
							.setLabel("More Information")
							.setEmoji(emojis.information),
					)
			],
		});

		responseEmbed = new EmbedBuilder()
			.setTitle("Content Released")
			.setColor(mainColor)
		interaction.editReply({
			embeds: [responseEmbed],
		});
	},

};

export default dev_toolkit_entry;