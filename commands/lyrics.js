const { getLyrics, getSong } = require('genius-lyrics-api')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageCard } = require('./lib/msg_card');
const { lyricsApi, MadridFamRoles } = require('../config.json')
const { unqualified_roles, madrid_icon, author_name } = require('./strings/string.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Will fetch lyrics available in the library.')
    .addStringOption(ttle =>
      ttle.setName('title')
        .setDescription('Enter music title')
        .setRequired(true))
    .addStringOption(artst =>
      artst.setName('artist')
        .setDescription('To get the specific lyrics you are looking, Enter the artist name')
        .setRequired(true)),
  async execute(interaction) {

	const thumbnail = 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1435674560/mjmgr50tv69vt5pmzeib.png'
    const getTitle = interaction.options.getString('title')
    const getArtist = interaction.options.getString('artist')

    await interaction.deferReply();
	if (!interaction.member.roles.cache.some(role => 
    MadridFamRoles.some(values => 
			values.includes(role.name)))) {

		return await interaction.editReply(unqualified_roles)
	}

    //Begin function lyrics
    try {
      const options = {
        apiKey: lyricsApi,
        title: getTitle,
        artist: getArtist,
        optimizeQuery: true
      }

      getSong(options).then(async (song) => {
		const embed = new MessageCard(
			cardAuthor = author_name,
			cardTitle = song.title,
			cardDescription = song.lyrics,
			cardFooter = "Powered by: LyricGenius",
			cardThumbnail = thumbnail, undefined,
			cardAuthorIcon = madrid_icon,
			cardFooterIcon = thumbnail
		)
		await interaction.editReply({ embeds: [await embed.messageCardMsgs()] });

      }).catch(error => {
        	interaction.reply("Unable to find lyrics, Please be specific with words");
      });

    } catch (error) {
      interaction.reply("Something went wrong...");
    }


  },
};