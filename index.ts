import { Client, Intents, Collection, MessageEmbed, TextChannel } from 'discord.js';
import { token, guildId } from './config.json';
import { madrid_icon } from './commands/strings/string.json'
import fs from 'fs';
import { MessageCard } from './commands/lib/msg_card';

const client: any = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Bot is Ready!');
});

client.on('messageCreate', async (message: any) => {
	if (message.author == client.user) {
		return
	}
});


client.on('guildMemberAdd', async (member: any) => {
	const msg = new MessageCard(
		'Madrid AI',
		'Welcome sa server ka Madrid Fam!',
		`Hi ${member.user}! Welcome ka dito ka madrid nation!`,
		'Powered by: Madrid Bot',
		madrid_icon,
		madrid_icon,
		madrid_icon,
		madrid_icon
	);
	member.guild.channels.cache.find((i:any) => i.name === 'general').send({ embeds: [await msg.messageCardGreetings()]})

	// // (member.channels.cache.get('961530357495246861') as TextChannel).send({ embeds: [embed]});
	// member.guild.channels.cache.find((i:any) => i.name === 'general').send({ embeds: [embed]})

	const role = member.guild.roles.cache.find((x:any) => x.name === 'Newbie'); 
	member.roles.add(role)

});

//Command Interaction
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});





// Login to Discord with your client's token
client.login(token);