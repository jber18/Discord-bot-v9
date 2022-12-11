import fs from 'node:fs';
import path from 'node:path';
import { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { SelectMenu } from './commands/lib/select_menus';
import { token, MadridFamRoles } from './config.json';
import { madrid_icon, author_name } from './commands/strings/string.json';
import { option1 } from './commands/strings/options.json'
import { MessageCard } from './commands/lib/msg_card';

const client: any = new Client({ intents: [GatewayIntentBits.Guilds, 'GuildMembers'] });
client.commands = new Collection();

client.on('messageCreate', async (message: any) => {
	if (message.author == client.user) {
		return
	}
});


client.on(Events.GuildMemberAdd, async (member: any) => {

	const msg = new MessageCard(
		author_name,
		'Welcome sa server ka Madrid Fam!',
		`Hi ${member.user}! Welcome ka dito ka madrid nation!`,
		'Powered by: Madrid Bot',
		madrid_icon,
		member.user.displayAvatarURL(),
		madrid_icon,
		madrid_icon
	);

	// // (member.channels.cache.get('961530357495246861') as TextChannel).send({ embeds: [embed]});
	// member.guild.channels.cache.find((i:any) => i.name === 'general').send({ embeds: [embed]})

	const menu = new SelectMenu(
		'roles',
		'Please select your desired topics',
		option1
		);
		
	
	member.guild.channels.cache.find((i: any) => i.name === 'general').send({ embeds: [await msg.messageCardGreetings()], components: [await menu.selectMenu()]})
	const add_role = member.guild.roles.cache.find((x: any) => x.name === "Newbie" );
	member.roles.add(add_role);

});



client.on(Events.InteractionCreate, async (interaction:any) => {
	if (!interaction.isStringSelectMenu()) return;

	const selected = interaction.values[0];
	console.log(selected)
	

	if(MadridFamRoles.some(value => value.includes(selected))){
		const add_role = interaction.guild.roles.cache.find((x: any) => x.name === selected);
		interaction.member.roles.add(add_role);
		console.log(MadridFamRoles.filter(val => val !== selected))
		
		await interaction.reply({ content: `${selected} was added as your role!`, ephemeral: true})
	}

});


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});




// Login to Discord with your client's token
client.login(token);