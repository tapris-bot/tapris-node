import { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "about",
  description: "Learn more about me",
  run: async (client, interaction) => {
    await interaction.deferReply();
    const { aboutLocale } = await getLocale(interaction.guildId);

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(interaction.guild.name)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(aboutLocale.description)
      .addFields([
        {
          name: aboutLocale.amountOfGuilds,
          value: (await client.shard.fetchClientValues("guilds.cache.size"))
            .reduce((acc: number, guildCount: number) => acc + guildCount, 0)
            .toString(),
          inline: true
        },
        {
          name: aboutLocale.amountOfCommands,
          value: client.commands.size.toString(),
          inline: true
        }
      ]);

    return await interaction.followUp({ embeds: [Embed] });
  }
};
