import {
	CommandInteraction,
	ApplicationCommandData,
	CacheType,
	ModalSubmitInteraction,
	ButtonInteraction,
	SelectMenuInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
	EmbedBuilder,
	ChatInputCommandInteraction,
} from 'discord.js';

export interface CustomCommand {
	data: ApplicationCommandData;
	commandData?: Array<commandData> | commandData;
	commandHelp?: Array<commandHelp> | commandHelp;
	execute?(interaction: ChatInputCommandInteraction<CacheType>): void | Promise<void>;
	modalExecute?(interaction: ModalSubmitInteraction<CacheType>): void | Promise<void>;
	contextMenuExecute?(interaction: MessageContextMenuCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType>): void | Promise<void>;
	globalMessageInteractionnExecute?(interaction: ButtonInteraction<CacheType> | SelectMenuInteraction<CacheType>): void | Promise<void>;
	onReadyExecute?(): void | Promise<void>;
}

export type mode = "normal" | "update" | "warning";

export type activities = Array<activity>;
export type activity = {
	emoji: string,
	type: string,
	text: string,
	duration: number,
};

export type commandHelp = {
	name: string,
	fullName?: string,
	module: string,
	keywords: any[],
	helpMessage: EmbedBuilder,
};

export type commandData = {
	uses: number,
	buttons?: {

	},
};

export type announcementMessage = {
	title: string,
	description: string,
	button?: {
		title: string,
		link: string,
	}
}