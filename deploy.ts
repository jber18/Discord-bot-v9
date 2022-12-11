import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import { clientId, guildId, token } from './config.json';

const rest = new REST({ version: '10' }).setToken(token);

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


//to make commands not global Routes.applicationGuildCommands(clientId,guildId)
//to make commands global Routes.applicationCommands(clientId)
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);
	
			// The put method is used to fully refresh all commands in the guild with the current set
			const data:any = await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);
	
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();