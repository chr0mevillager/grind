import permissions from "./perms";
import * as colors from "./colors";
import { EmbedBuilder } from "@discordjs/builders";

export const question = (image: string, extraText: string) => new EmbedBuilder()
	.setTitle("\u200b")
	.setColor(colors.clearColor)
	.setImage(image)
	.setFooter({ text: extraText + "\u200b" })

export const send = new EmbedBuilder()
	.setTitle("\u200b")
	.setColor(colors.clearColor)
	.setImage("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/send/message_sent.png?raw=true")
	.setFooter({ text: "\u200b" });

export const cancel = new EmbedBuilder()
	.setTitle("\u200b")
	.setColor(colors.clearColor)
	.setImage("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/send/canceled.png?raw=true")
	.setFooter({ text: "\u200b" });

export const timedOut = new EmbedBuilder()
	.setTitle("\u200b")
	.setColor(colors.clearColor)
	.setImage("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/send/timed_out.png?raw=true")
	.setFooter({ text: "\u200b" });

export const invalidPerms = permissions.message;

export const warning = new EmbedBuilder()
	.setTitle("\u200b")
	.setColor(colors.clearColor)
	.setImage("https://github.com/chr0mevillager/coyote/blob/master/src/artwork/send/ready_to_send.png?raw=true")
	.setFooter({ text: "\u200b" });