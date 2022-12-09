const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageCard } = require('./lib/msg_card');
const { apiKey } = require('../config.json');
const { Configuration, OpenAIApi } = require('openai');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('assistant')
        .setDescription('Your discord bot virtual assistant')
        .addStringOption(artst =>
            artst.setName('prompt')
                .setDescription('Specified your prompt in detailed!')
                .setRequired(true)),
    async execute(interaction) {

        const getPrompt = interaction.options.getString('prompt')
        await interaction.deferReply();


        if (!interaction.member.roles.cache.some(role => 
            ['Master','Moderator','Admin'].some(values => 
                values.includes(role.name)))) {

            return await interaction.editReply('Sorry you are not qualified to use this feature')
        }

        const configuration = new Configuration({
            apiKey: apiKey,
        });
        const openai = new OpenAIApi(configuration);


        (async (prompt) => {
            const openai_icon = 'https://i.insider.com/62b4cfc19f5e550019aa685b?width=1136&format=jpeg'
            const madrid_icon = 'https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/288814066_2319934378164088_4999023580674858669_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WF-kxSqWYCcAX-gOWO1&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&oh=00_AfAjV2T6M3iEZL8PhCOzqWskdkUAPumOcFaN2wBGjtMFNg&oe=639807F2' 
            const baseCompletion = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: prompt,
                temperature: 0.9,
                max_tokens: 300,
            });

            const basePromptOutput = baseCompletion.data.choices.pop();

            const embed = new MessageCard(
                cardAuthor = 'Madrid AI',
                cardTitle = "AI Assistant",
                cardDescription = `**Prompt:** "***${prompt}***"\n` + 'Response: ```' + basePromptOutput?.text + '```',
                cardFooter = "Powered by: Open AI",
                cardThumbnail = madrid_icon,undefined,
                cardAuthorIcon = madrid_icon,
                cardFooterIcon = openai_icon
            )
            await interaction.editReply({ embeds: [await embed.messageCardMsgs()] })
        })(getPrompt)
    },
};

