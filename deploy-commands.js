const {REST, Routes} = require ('discord.js');
const {clientId, guildId, token, globalDeploy} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Exit if config.json is not properly set
if (!clientId || typeof clientId !== 'string' || !token || typeof token !== 'string') {
	console.log("Please set your clientId and token in config.json before deploying commands. See README for more information.");
	process.exit(1)
}

// Exit if guildId is not properly set. guildId needs to be set if deploying commands on a specific guild
if (globalDeploy === false && (!guildId || typeof guildId !== 'string')) {
	console.log("Please set your guildId in config.json to deploy commands on a specific guild. See README for more information.");
	process.exit(1)
}

const rest = new REST({version: '10'}).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
        var data;
        // Deploy commands to either a specific guild or globally depending on config
        if (globalDeploy === false) {
            console.log(`Deploying slash commands on guildId: ${guildId}`);
            data = await rest.put(
			    Routes.applicationGuildCommands(clientId, guildId),
			    {body: commands},
		    );
		} else {
            console.log(`Deploying slash commands globally`);
			data = await rest.put(
				Routes.applicationCommands(clientId),
				{body: commands},
			);
		}

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();