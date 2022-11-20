import {
	CommandInteraction,
	ApplicationCommandData,
	CacheType,
	ModalSubmitInteraction,
	ButtonInteraction,
	SelectMenuInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
	ChatInputCommandInteraction,
} from 'discord.js';

export interface CustomCommand {
	data: ApplicationCommandData;
	chatExecute?(interaction: ChatInputCommandInteraction<CacheType>): void | Promise<void>;
	modalExecute?(interaction: ModalSubmitInteraction<CacheType>): void | Promise<void>;
	contextMenuExecute?(interaction: MessageContextMenuCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType>): void | Promise<void>;
	globalMessageInteractionnExecute?(interaction: ButtonInteraction<CacheType> | SelectMenuInteraction<CacheType>): void | Promise<void>;
	onReadyExecute?(): void | Promise<void>;
}