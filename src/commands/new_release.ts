import { ApplicationCommandOptionType, ApplicationCommandType, ForumChannel, GuildChannel, GuildChannelType, GuildTextBasedChannel, ThreadChannel, ThreadChannelType } from "discord.js";
import { client } from "../exports/client";
import { CustomCommand } from "../exports/types";

//Timeline of events
/*

1. Create a new forum post
2. Post in forum
  - Banner image
  - Title, short description, ty video in a message
  - Download link + mcpedl link in buttons
  - Ask for questions, suggestions, bug report in message
  - Pin banner image
3. Make announcement
  - Ping everyone
  - Title, short description in a message
  - Link to forum post
*/

let new_release: CustomCommand = {
	data: {
		name: "new_release",
		description: "Post a new release!",
		type: ApplicationCommandType.ChatInput,
		defaultMemberPermissions: "Administrator",
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
				name: "download_link",
				description: "What is the download link of the release? (Link)",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
			{
				name: "mcpedl_link",
				description: "What is the MCPEDL link of the release? (Link)",
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
		],
	},

	async chatExecute(interaction) {
		await (interaction.options.getChannel("forum_channel") as any as ForumChannel).threads.create({ name: "e", message: { content: "crazy" }, });
	},

	async globalMessageInteractionExecute(interaction) {
		//Get user's a download
	},

};

export default new_release;