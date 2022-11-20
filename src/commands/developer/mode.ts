import logMessage from "../../exports/error";
import { CustomCommand, mode } from "../../exports/types";
import { setMode } from "../../exports/mode";
import { client } from "../../exports/client";
import * as colors from "../../exports/colors";
import { ApplicationCommandOptionType } from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";

let mode: CustomCommand = {
	data: {
		name: "mode",
		description: "Set the mode of the bot.",
		options: [
			{
				name: "normal",
				description: "Would you like to give the bot normal behavior? (default)",
				type: 1,
				options: [
					{
						name: "confirm",
						description: "Are you sure you want to change the bot's mode?",
						type: 5,
						required: true,
					}
				]
			},
			{
				name: "update",
				description: "Would you like to warn users of an upcoming update?",
				type: 1,
				options: [
					{
						name: "confirm",
						description: "Are you sure you want to change the bot's mode?",
						type: 5,
						required: true,
					}
				]
			},
			{
				name: "warning",
				description: "Would you like to warn users of an issue or outage?",
				type: 1,
				options: [
					{
						name: "warning",
						description: "What would you like to warn the users of? (ex. a fire)",
						type: ApplicationCommandOptionType.String,
						required: true,
					},
					{
						name: "confirm",
						description: "Are you sure you want to change the bot's mode?",
						type: 5,
						required: true,
					}
				]
			},
		]
	},

	async execute(interaction) {
		try {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(colors.mainColor)
						.setTitle("Enabling " + interaction.options.getSubcommand() + " mode")
				],
				ephemeral: true,
			});

			if (!interaction.options.getBoolean("confirm")) return;
			if (interaction.user.id != process.env.OWNER_ID) return;

			if (interaction.options.getSubcommand() == "warning") {
				setMode(interaction.options.getSubcommand() as mode, interaction.options.getString("warning"));
			} else if (interaction.options.getSubcommand() == "update") {
				setMode(interaction.options.getSubcommand() as mode, "an upcoming update");
			} else {
				setMode(interaction.options.getSubcommand() as mode);
			}

			if (client.application.id == "942083941307912193") {
				if (interaction.options.getSubcommand() == "normal") {
					(client.channels.cache.find((channel) => (channel as any).id === process.env.STATUS_CHANNEL) as any).send({
						embeds: [
							new EmbedBuilder()
								.setColor(colors.successColor)
								.setTitle("Entering Normal Mode")
								.setDescription("```All services should now work properly.```")
						],
						ephemeral: true,
					});
				} else {
					(client.channels.cache.find((channel) => (channel as any).id === process.env.STATUS_CHANNEL) as any).send({
						embeds: [
							new EmbedBuilder()
								.setColor(colors.cancelColor)
								.setTitle("Entering " + interaction.options.getSubcommand().charAt(0).toUpperCase() + interaction.options.getSubcommand().slice(1) + " Mode")
								.setDescription("```Some services may stop working unexpectedly. While using some commands, make sure to read all warnings.```")
						],
						ephemeral: true,
					});
				}
			}

		} catch (error) {
			logMessage(error, "set developer command", interaction);
		}
	},
};
export default mode;