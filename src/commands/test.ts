import { ApplicationCommandType } from "discord.js";
import { CustomCommand } from "../exports/types";

let test: CustomCommand = {
	data: {
		name: "test",
		description: "test description",
		type: ApplicationCommandType.ChatInput,
	},

	async chatExecute(interaction) {
		//Execute code when this command is used
		interaction.reply("test complete!");
	},

	async globalMessageInteractionnExecute(interaction) {
		//Execute code when a button/dropdown that has the customID of "test::something..." is hit
	},

	async modalExecute(interaction) {
		//Execute code when a model that has the customID of "test::something..." is submitted
	},
};

export default test;

//Remember it import this into the index!