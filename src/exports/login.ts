import { EmbedBuilder } from "@discordjs/builders";
import * as activity from "./activity";
import { client } from "./client";
import * as colors from "./colors";
import { setMode } from "./mode";
import * as profileInfo from "./profile_info";

export default async function () {
	//Send login message
	if (client.application.id == "942083941307912193") {
		(client.channels.cache.find((channel) => (channel as any).id === process.env.LOGGING_CHANNEL) as any).send({
			content: "@everyone",
			embeds: [
				new EmbedBuilder()
					.setColor(colors.mainColor)
					.setTitle("Bot Online!")
					.setDescription("Online at <t:" + Math.floor(client.readyAt.getTime() / 1000) + ":D> <t:" + Math.floor(client.readyAt.getTime() / 1000) + ":T>\n\n||`" + Math.floor(client.readyAt.getTime() / 1000) + "`||\n\n" + "Version `" + profileInfo.versionNumber + "`")
			],
		});
		(client.channels.cache.find((channel) => (channel as any).id === process.env.STATUS_CHANNEL) as any).send({
			embeds: [
				new EmbedBuilder()
					.setColor(colors.successColor)
					.setTitle("Coyote Online")
					.setDescription("```Some features that were initiated previously may stop working unexpectedly.\n\nGoing forward, all features should work properly.\n\nVersion " + profileInfo.versionNumber + "```")
			],
		});
	} else {
		console.log("Bot online!");
	}

	//Set mode
	setMode("normal", "");

	//Set activity
	activity.setRotateStatus(true);
	activity.setNextStatus(0);
}