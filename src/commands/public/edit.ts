import { ApplicationCommandType, GuildMember, MessageContextMenuCommandInteraction, TextInputStyle } from "discord.js";
import { commandData, CustomCommand } from "../../exports/types";
import logMessage from "../../exports/error";
import * as colors from "../../exports/colors";
import { client } from "../../exports/client";
import permissions from "../../exports/perms";
import { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } from "@discordjs/builders";

const inputModalTitle = new ActionRowBuilder<TextInputBuilder>()
	.addComponents(
		new TextInputBuilder()
			.setCustomId("title")
			.setLabel("What should the new title be?")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setMaxLength(256),
	);

const inputModalDescription = new ActionRowBuilder<TextInputBuilder>()
	.addComponents(
		new TextInputBuilder()
			.setCustomId("description")
			.setLabel("What should the new description be?")
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)
			.setMaxLength(4000),
	);

const inputModalImage = new ActionRowBuilder<TextInputBuilder>()
	.addComponents(
		new TextInputBuilder()
			.setCustomId("image")
			.setLabel("What should the image be?")
			.setStyle(TextInputStyle.Short)
			.setRequired(false)
			.setMaxLength(300)
			.setPlaceholder("https://my-image.com"),
	);

let modal = (interactionID: string) => new ModalBuilder()
	.setTitle("Message Editor")
	.setCustomId("Edit::" + interactionID + "::modal")
	.setComponents(inputModalTitle, inputModalDescription, inputModalImage)

let edit: CustomCommand = {
	data: {
		name: "Edit",
		type: ApplicationCommandType.Message,
		defaultMemberPermissions: "ManageMessages",
	},

	commandHelp: {
		name: "edit",
		fullName: "•Edit",
		keywords: [
			"edit",
			"mod",
			"change",
		],
		module: "embeds",
		helpMessage: new EmbedBuilder()
			.setThumbnail("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/command_icons/edit.png?raw=true")
			.setColor(colors.clearColor)
			.setTitle("Edit")
			.setDescription("```Edit a previously sent message!```")
			.addFields([
				{
					name: "For PC",
					value: "```js\n1. Right click on the message ``````2. Going to the \"Apps\" catagory. ``````js\n3. Click \"Edit\" ``````js\n4. Type in your updated message.```",
					inline: true,
				},
				{
					name: "For Mobile",
					value: "```js\n1. Hold down on the message``````js\n2. Going to the \"Apps\" catagory. ``````js\n3. Tap \"Edit\" ``````js\n4. Type in your updated message.```",
					inline: true,
				},
			]),
	},

	commandData: {
		uses: 0,
		buttons: {
			send: 0,
		}
	},

	async contextMenuExecute(interaction) {
		try {
			(edit.commandData as commandData).uses++;
			if ((interaction as MessageContextMenuCommandInteraction).targetMessage.author.id == client.application.id) {
				if (!interaction.channel) {
					await interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setColor(colors.cancelColor)
								.setTitle("This Command can Only be Used in Servers!")
								.setDescription("You must be an administrator to edit a message.")
						],
						ephemeral: true,
					});
					return;
				}
				else if (!(interaction.member as GuildMember).permissions.has("Administrator")) {
					await interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setColor(colors.cancelColor)
								.setTitle("Missing Admin Permissions!")
								.setDescription("You must be an administrator to edit a message.")
						],
						ephemeral: true,
					});
					return;
				}
				await interaction.showModal(modal((interaction as MessageContextMenuCommandInteraction).targetMessage.id));
			} else {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setColor(colors.cancelColor)
							.setTitle("You can only Edit Messages Sent by Me!")
							.setDescription("This command cannot be used with messages from other users.")
					],
					ephemeral: true,
				});
			}
		} catch (error) {
			logMessage(error, "Edit Command", interaction);
		}
	},

	async modalExecute(interaction) {
		try {
			(edit.commandData as commandData).buttons["send"]++;
			const [command, messageID, modal] = (interaction.customId).split("::");

			let title = interaction.fields.getTextInputValue("title");
			let description = interaction.fields.getTextInputValue("description");
			let image = "";

			if (interaction.fields.getTextInputValue("image") && interaction.fields.getTextInputValue("image").match(/^((https:\/\/)|(http:\/\/))[a-z A-Z 1-9]+\.[a-z A-Z 1-9]+/gm)) image = interaction.fields.getTextInputValue("image");

			if (title.length > 256) title = title.slice(0, 256);
			if (description.length > 3998) description = description.slice(0, 3998);

			try {
				description = JSON.parse('"' + description.replace(/"/g, '\\"') + '"');
			} catch { }
			try {
				title = JSON.parse('"' + title.replace(/"/g, '\\"') + '"');
			} catch { }

			if (image == "" && interaction.user.id != process.env.OWNER_ID) description += "\n" + "\u200b";
			if (description.match(/^[\n\u2800\u200b\s]*$/s)) {
				if (image == "") {
					description = "\n\u200b";
				} else {
					description = "";
				}
			}
			if (interaction.channel.permissionsFor(client.user).toArray().includes("ViewChannel") && interaction.channel.permissionsFor(client.user).toArray().includes("EmbedLinks") && interaction.channel.permissionsFor(client.user).toArray().includes("SendMessages") && interaction.channel.permissionsFor(client.user).toArray().includes("SendMessagesInThreads")) {
				try {
					(await interaction.channel).messages.fetch(messageID).then(message => {
						try {
							message.edit({
								embeds: [
									new EmbedBuilder()
										.setTitle(title)
										.setDescription(description)
										.setFooter({ text: "Edited By: " + interaction.user.username, iconURL: interaction.user.avatarURL() })
										.setColor(colors.clearColor)
										.setImage(image)
								]
							})
						} catch { }
					});

				} catch (error) {
					logMessage(error, "Edit Message", interaction);
				}
			} else {
				await interaction.reply({
					embeds: [permissions.message],
					ephemeral: true,
				});
				return;
			}

			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle("Message Updated!")
						.setColor(colors.successColor)
				],
				ephemeral: true,
			});
		} catch (error) {
			logMessage(error, "Edit Command (modal)", interaction);
		}
	},
};

export default edit;