import "./exports/vars";
import { client } from "./exports/client";
import commands from "./commands";

// Find the function to run when any type of interaction is created
client.on("interactionCreate", async (interaction) => {
	if (interaction.isChatInputCommand()) {
		const command = commands[interaction.commandName];

		if (command && command.data.name == (interaction.commandName)) {
			try {
				await command.chatExecute(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	} else if (interaction.isModalSubmit()) {
		const command = commands[(interaction.customId).substring(0, (interaction.customId).indexOf(":"))];
		if (command && command.data.name == ((interaction.customId).substring(0, (interaction.customId).indexOf(":")))) {
			try {
				await command.modalExecute(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	} else if (interaction.isButton() || interaction.isSelectMenu()) {
		const command = commands[(interaction.customId).substring(0, (interaction.customId).indexOf(":"))];

		if (command && command.data.name == ((interaction.customId).substring(0, (interaction.customId).indexOf(":")))) {
			try {
				await command.globalMessageInteractionExecute(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	} else if (interaction.isContextMenuCommand()) {
		const command = commands[interaction.commandName];
		if (command && command.data.name == (interaction.commandName)) {
			try {
				await command.contextMenuExecute(interaction);
			} catch (error) {
				console.error(error);
			}
		}

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