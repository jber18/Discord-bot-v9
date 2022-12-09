const { getLyrics, getSong } = require('genius-lyrics-api')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageCard } = require('./lib/msg_card');
const { lyricsApi } = require('../config.json')

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
		['Master','Moderator','Admin','Madrid Fam','Classmate','marites'].some(values => 
			values.includes(role.name)))) {

		return await interaction.editReply('Sorry you are not qualified to use this feature')
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
		const madrid_icon = 'https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/288814066_2319934378164088_4999023580674858669_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WF-kxSqWYCcAX-gOWO1&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&oh=00_AfAjV2T6M3iEZL8PhCOzqWskdkUAPumOcFaN2wBGjtMFNg&oe=639807F2' 
		const embed = new MessageCard(
			cardAuthor = "SPM Bot",
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