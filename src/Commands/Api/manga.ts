import { Command } from "@Interfaces/index";
import { SearchResult } from "@Interfaces/Manga";
import getLocale from "@Locales/index";
import axios from "axios";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

export const command: Command = {
	name: "manga",
	description: "Get data about manga",
	options: [
		{
			name: "query",
			description: "Query for search",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const query = interaction.options.getString("query");
		const { mangaLocale } = await getLocale(interaction.guildId);

		const response: SearchResult[] = (
			await axios.get(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`)
		).data;

		if (response.length == 0)
			return await interaction.reply({
				content: mangaLocale.notFound,
				ephemeral: true
			});

		await interaction.deferReply();

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response[0].name)
			.addFields({
				name: mangaLocale.lastChapter,
				value: response[0].lastChapter,
				inline: true
			})
			.setImage(response[0].thumbnail)
			.setURL(response[0].url)
			.setAuthor({ name: response[0].author });

		const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setURL(response[0].url)
				.setLabel(mangaLocale.readManga)
				.setStyle(ButtonStyle.Link)
		]);

		return await interaction.followUp({
			embeds: [embed],
			components: [buttonsRow]
		});
	}
};
