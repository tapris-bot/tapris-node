import { Command } from '../../Interfaces'
import { validateURL } from 'ytdl-core'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const youtubeSr = require('youtube-sr').default

export const command: Command = {
	name: 'add',
	description: 'Add YouTube Music to Queue',
	options: [
		{
			name: 'music',
			description: 'Name or link',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const musicItem = interaction.options.getString('music')

		if (validateURL(musicItem))
			client.music.queue = [...client.music.queue, musicItem]
		if (!validateURL(musicItem)) {
			const result = await youtubeSr.search(musicItem, { limit: 1 })

			if (result.length == 0)
				return interaction.reply('Music not found! :no_entry_sign:')

			client.music.queue = [
				...client.music.queue,
				`https://www.youtube.com/watch?v=${result[0].id}`
			]
		}

		return interaction.reply('Added to queue :musical_note:')
	}
}
