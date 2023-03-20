const {Client, Collection, Events, GatewayIntentBits, Message} = require('discord.js');
const {token} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
    }
}

client.once(Events.ClientReady, () => {
    console.log(`${client.user.tag} is online`);
});

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

	// if (interaction.commandName === 'randomcard') {
    //     const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
	// 	const row = new ActionRowBuilder()
	// 		.addComponents(
	// 			new ButtonBuilder()
	// 				.setCustomId('secondary')
	// 				.setLabel('Previous Card')
	// 				.setStyle(ButtonStyle.Secondary),                
    //             new ButtonBuilder()
	// 				.setCustomId('primary')
	// 				.setLabel('Next Card')
	// 				.setStyle(ButtonStyle.Primary),
	// 		);
            
	// 	interaction.channel.send({ components: [row] });

    // const collector = interaction.channel.createMessageComponentCollector();

    // collector.on('collect', async i => {
    //     await i.update({ components: [row] });
    // });

    // }

    try {   
        await command.execute(interaction);
    }
    catch(error) {
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!' + error, ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!' + error, ephemeral: true });
        }
    }
});

client.login(token);