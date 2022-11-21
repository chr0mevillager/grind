import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, ButtonStyle } from "discord.js";
import { clearColor, mainColor } from "../exports/colors";
import { CustomCommand } from "../exports/types";
import emojis from "../exports/emoji";

let send: CustomCommand = {
	data: {
		name: "send",
		description: "Send a button, message, or image.",
		type: ApplicationCommandType.ChatInput,
		defaultMemberPermissions: "Administrator",
		options: [
			{
				name: "button",
				description: "Send a button.",
				type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "label",
						description: "What should the button say?",
						type: ApplicationCommandOptionType.String,
						required: true,
					},
					{
						name: "link",
						description: "What should the button link to?",
						type: ApplicationCommandOptionType.String,
						required: true,
					},
					{
						name: "emoji",
						description: "What should the button's emoji be?",
						type: ApplicationCommandOptionType.String,
						required: false,
					}
				]
			},
			{
				name: "image",
				"description": "Send an image.",
				type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "image",
						description: "What image would you like to send?",
						type: ApplicationCommandOptionType.Attachment,
						required: true,
					}
				]
			},
			{
				name: "message",
				description: "Send an embedded message.",
				type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "title",
						description: "What should the title of the message be?",
						type: ApplicationCommandOptionType.String,
						maxLength: 256,
						required: true,
					},
					{
						name: "description",
						description: "What should the description of the message be?",
						type: ApplicationCommandOptionType.String,
						maxLength: 4096,
						required: false,
					},
					{
						name: "icon",
						description: "What should the icon of the message be?",
						type: ApplicationCommandOptionType.Attachment,
						required: false,
					},
					{
						name: "banner",
						description: "What should the banner image of the message be?",
						type: ApplicationCommandOptionType.Attachment,
						required: false,
					},
				]
			},
			{
				name: "ping",
				description: "Ping everyone.",
				type: ApplicationCommandOptionType.Subcommand,
			}
		]
	},

	async chatExecute(interaction) {
		if (interaction.options.getSubcommand() == "button") {
			const responseEmbed = new EmbedBuilder()
				.setTitle("Button Sent")
				.setColor(mainColor)
			interaction.reply({
				embeds: [responseEmbed],
				ephemeral: true,
			});

			if (interaction.options.getString("emoji")) {
				const buttonRow = new ActionRowBuilder<ButtonBuilder>()
					.addComponents(
						new ButtonBuilder()
							.setStyle(ButtonStyle.Link)
							.setURL(interaction.options.getString("link"))
							.setLabel(interaction.options.getString("label"))
							.setEmoji(emojis[interaction.options.getString("emoji")])
					)
				interaction.channel.send({
					components: [buttonRow],
				});
			} else {
				const buttonRow = new ActionRowBuilder<ButtonBuilder>()
					.addComponents(
						new ButtonBuilder()
							.setStyle(ButtonStyle.Link)
							.setURL(interaction.options.getString("link"))
							.setLabel(interaction.options.getString("label"))
					)

				interaction.channel.send({
					components: [buttonRow],
				});
			}
		} else if (interaction.options.getSubcommand() === "image") {
			const responseEmbed = new EmbedBuilder()
				.setTitle("Image Sent")
				.setColor(mainColor)

			interaction.reply({
				embeds: [responseEmbed],
				ephemeral: true,
			});

			const attachment = new AttachmentBuilder(interaction.options.getAttachment("image").attachment)
			interaction.channel.send({
				files: [attachment],
			});
		} else if (interaction.options.getSubcommand() === "message") {
			const responseEmbed = new EmbedBuilder()
				.setTitle("Message Sent")
				.setColor(mainColor)

			interaction.reply({
				embeds: [responseEmbed],
				ephemeral: true,
			});

			let message = new EmbedBuilder()
				.setTitle(interaction.options.getString("title"))
				.setColor(clearColor)

			if (interaction.options.getString("description")) message.setDescription("```" + interaction.options.getString("description") + "```");
			if (interaction.options.getAttachment("icon")) message.setThumbnail(interaction.options.getAttachment("icon").attachment);
			if (interaction.options.getAttachment("banner")) message.setImage(interaction.options.getAttachment("banner").attachment);

			interaction.channel.send({
				embeds: [message]
			});
		} else if (interaction.options.getSubcommand() === "ping") {
			const responseEmbed = new EmbedBuilder()
				.setTitle("Ping Sent")
				.setColor(mainColor)

			interaction.reply({
				embeds: [responseEmbed],
				ephemeral: true,
			});

			interaction.channel.send({
				content: "@everyone"
			});
		}
	},
};

export default send;