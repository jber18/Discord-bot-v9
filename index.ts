import { Client, Intents, Collection, MessageEmbed, TextChannel } from 'discord.js';
import { token, guildId } from './config.json';
import fs from 'fs';

const client:any = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('SkyNet is Ready!');
});

client.on('messageCreate', async (message:any) => {
  if (message.author == client.user) {
    return
  }

  if(message.channel.type !== 'GUILD_TEXT'){
	console.log('true')
  }else console.log('False')
});


client.on('guildMemberAdd', async (member:any) => {
	const title:string = 'Someone has joined the server!';
	const description:string = `Please welcome ***${member.user.username}***!`;
	const footer:string = 'Enjoy lang po sa server!';
	const avatar:string = 'https://img.freepik.com/free-vector/colorful-welcome-composition-with-origami-style_23-2147919827.jpg?w=2000';
	console.log(avatar)
	// console.log(avatar);

	// const msgCard = new MessageCard(title,description,avatar,footer);
	// const embed = await msgCard.CardMessage();

	// // (member.channels.cache.get('961530357495246861') as TextChannel).send({ embeds: [embed]});
	// member.guild.channels.cache.find((i:any) => i.name === 'general').send({ embeds: [embed]})

	// console.log('User ' + member.user.username + ' has joined the server!');
	
	// var role = member.guild.roles.cache.find((x:any) => x.name === 'Newbie'); 
	
	// member.roles.add(role)
	
	});

//Command Interaction
client.on('interactionCreate', async (interaction:any) => {
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