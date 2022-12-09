import { SlashCommandBuilder } from '@discordjs/builders';
import fs from 'node:fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './config.json';

const rest = new REST({ version: '9' }).setToken(token);

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


//to make commands not global Routes.applicationGuildCommands(clientId,guildId)
//to make commands global Routes.applicationCommands(clientId)
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);