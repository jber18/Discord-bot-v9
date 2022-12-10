import { Client, Intents, Collection, MessageEmbed, TextChannel } from 'discord.js';
import { token, guildId } from './config.json';
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
	const madrid_icon = 'https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/288814066_2319934378164088_4999023580674858669_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WF-kxSqWYCcAX-gOWO1&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&oh=00_AfAjV2T6M3iEZL8PhCOzqWskdkUAPumOcFaN2wBGjtMFNg&oe=639807F2' 
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