const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');
const { MessageCard } = require('./lib/msg_card');
const { apiKey, Adminroles } = require('../config.json');
const { unqualified_roles, madrid_icon, openai_icon, author_name } = require('./strings/string.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('assistant')
        .setDescription('Your discord bot virtual assistant')
        .addStringOption(artst =>
            artst.setName('prompt')
                .setDescription('Ask me anything, please be specific')
                .setRequired(true)),
    async execute(interaction) {

        const getPrompt = interaction.options.getString('prompt')
        await interaction.deferReply();

        //Checks if member has qualified roles
        if (!interaction.member.roles.cache.some(role => 
            Adminroles.some(values => 
                values.includes(role.name)))) {

            return await interaction.editReply(unqualified_roles)
        }

        const configuration = new Configuration({
            apiKey: apiKey,
        });
        const openai = new OpenAIApi(configuration);


        (async (prompt) => {
            const baseCompletion = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: prompt,
                temperature: 0.9,
                max_tokens: 300,
            });

            const basePromptOutput = baseCompletion.data.choices.pop();
            const embed = new MessageCard(
                cardAuthor = author_name,
                cardTitle = "AI Assistant",
                cardDescription = `${interaction.user}: "***${prompt}***"\n` + 'Response: ```' + basePromptOutput?.text + '```',
                cardFooter = "Powered by: Open AI",
                cardThumbnail = madrid_icon,undefined,
                cardAuthorIcon = madrid_icon,
                cardFooterIcon = openai_icon
            )
            await interaction.editReply({ embeds: [await embed.messageCardMsgs()] })
        })(getPrompt)
    },
};

