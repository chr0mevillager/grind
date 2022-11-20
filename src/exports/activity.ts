import { ActivityType } from "discord-api-types";
import { PresenceData } from "discord.js";
import { client } from "./client";
import { activities } from "./types";

export let activityRotation;
export let activityIndex;
let currentActivityInxex;

/* 15 Seconds for testing (15000) */

const activities: activities = [
	{ // Called on bot startup
		emoji: "🔼",
		type: "Streaming",
		text: "my new update!",
		duration: 900000,
	},
	{ //Start of loop
		emoji: "❔",
		type: "Listening",
		text: "/help",
		duration: 1800000,
	},
	{
		emoji: "📊",
		type: "Watching",
		text: "messages",
		duration: 600000,
	},
	{
		emoji: "📨",
		type: "Watching",
		text: "polls",
		duration: 600000,
	},
	{
		emoji: "🎁",
		type: "Watching",
		text: "giveaways",
		duration: 600000,
	},
	{
		emoji: "⌛",
		type: "Watching",
		text: "timers",
		duration: 600000,
	},
]

/** Set the activity of the bot.*/
export function setBotActivity() {
	if (!activityRotation) return;
	currentActivityInxex = activityIndex;

	client.user.setActivity("\u2800" + activities[activityIndex].emoji + "\u2800" + activities[activityIndex].text, { type: activities[activityIndex].type as any });

	activityIndex++;
	if (activityIndex > activities.length - 1) activityIndex = 1;
	setTimeout(setBotActivity, activities[currentActivityInxex].duration, activityIndex);

}

export function setRotateStatus(rotate: boolean) {
	activityRotation = rotate;
}

export function setNextStatus(index: number) {
	activityIndex = index;
	setRotateStatus(true);
	setBotActivity();
}