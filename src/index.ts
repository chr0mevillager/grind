import "./exports/vars";
import { client } from "./exports/client";
import commands from "./commands";
import { InteractionType } from "discord.js";

//Commands
client.on("interactionCreate", async (interaction) => {
	// Find the function to run when any type of interaction is created
	if (interaction.isChatInputCommand()) {
		const command = commands[interaction.commandName];

		if (command && command.data.name == (interaction.commandName)) {
			try {
				await command.chatExecute(interaction);
			} catch (error) { }
		}
		// }





		// else if (interaction.type === InteractionType.ModalSubmit) {
		// 	const publicCommands = commands[(interaction.customId).substring(0, (interaction.customId).indexOf(":"))];
		// 	const developerCommands = commands.developerCommands[(interaction.customId).substring(0, (interaction.customId).indexOf(":"))];

		// 	if (publicCommands && publicCommands.data.name == ((interaction.customId).substring(0, (interaction.customId).indexOf(":")))) {
		// 		try {
		// 			await publicCommands.modalExecute(interaction);
		// 		} catch (error) {
		// 			await logMessage(error, "index (modal response)");
		// 		}
		// 	} else {
		// 		try {
		// 			await developerCommands.modalExecute(interaction);
		// 		} catch (error) {
		// 			await logMessage(error, "index (modal response) & dev command");
		// 		}
		// 	}
		// } else if (interaction.isButton() || interaction.isSelectMenu()) {
		// 	const publicCommands = commands[(interaction.customId).substring(0, (interaction.customId).indexOf(":"))];
		// 	const developerCommands = commands.developerCommands[(interaction.customId).substring(0, (interaction.customId).indexOf(":"))];

		// 	if (publicCommands && publicCommands.data.name == ((interaction.customId).substring(0, (interaction.customId).indexOf(":")))) {
		// 		try {
		// 			if (!publicCommands.globalMessageInteractionnExecute) return;
		// 			await publicCommands.globalMessageInteractionnExecute(interaction);
		// 		} catch (error) {
		// 			await logMessage(error, "index (button response)");
		// 		}
		// 	} else if (developerCommands && developerCommands.data.name == ((interaction.customId).substring(0, (interaction.customId).indexOf(":")))) {
		// 		try {
		// 			if (!developerCommands.globalMessageInteractionnExecute) return;
		// 			await developerCommands.globalMessageInteractionnExecute(interaction);
		// 		} catch (error) {
		// 			await logMessage(error, "index (global button response) & dev command");
		// 		}
		// 	}
		// } else if (interaction.isContextMenuCommand()) {
		// 	const publicCommands = commands[interaction.commandName];
		// 	const developerCommands = commands.developerCommands[interaction.commandName];

		// 	if (publicCommands && publicCommands.data.name == (interaction.commandName)) {
		// 		try {
		// 			await publicCommands.contextMenuExecute(interaction);
		// 		} catch (error) {
		// 			await logMessage(error, "index (context command)");
		// 		}
		// 	} else {
		// 		try {
		// 			await developerCommands.contextMenuExecute(interaction);
		// 		} catch (error) {
		// 			await logMessage(error, "index & dev command (context command)");
		// 		}
		// 	}
	}
});

//On login
client.once("ready", () => {

	//Run command functions on start
	for (let i = 0; i < Object.keys(commands).length; i++) {
		if (commands[Object.keys(commands)[i]].onReadyExecute) commands[Object.keys(commands)[i]].onReadyExecute();
	}

	//Create commands in all guilds
	Object.values(commands).forEach((command) => {
		client.application.commands.create(command.data);
	});

});

//Login
client.login(process.env.DISCORD_AUTH);