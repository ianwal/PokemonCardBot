const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('node:fs');
const obj = JSON.parse(fs.readFileSync('./baseset1.json'));
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction } = require('discord.js');
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('basesetpack')
        .setDescription('pulls a 10 random cards from base set1'),
    async execute(interaction) {

    if (interaction.commandName === 'basesetpack') {
		const row = new ActionRowBuilder()
            .addComponents(
                    new ButtonBuilder()
                        .setCustomId('primary')
                        .setLabel('Next Card')
                        .setStyle(ButtonStyle.Primary)

            );
			
    
	await interaction.channel.send({content: "", components: [row]});

    
    const filter = (interaction) =>                                   //ONLY message sender can access button 
                interaction.user.id === message.author.id;

    const collector = interaction.channel.createMessageComponentCollector({
        // filter
    });

    energyValues = [96,97,98,99,100,101];  // scuffed brute force to find all basic energies in json file
    value = Math.floor(Math.random() * energyValues.length);
    index = energyValues[value]
    await interaction.reply(obj[index].images.large);  // first card is gaurenteed to be a basic energy

    let counter = 1;
    collector.on('collect', async i => { // on button press -> new card
        newValue = Math.floor(Math.random() * (101-0+1) + 0); // (max - min + 1) + min) -> array so subtract 1 from each value and 102 cards in base set
        await interaction.editReply(obj[newValue].images.large);
        if (counter >=10) {                                         // 9 clicks till button is disabled (1 initial card + 9 more cards for a pack)
            row.components[0].setDisabled(true);
            await i.update({content: ' ', components: [row] });
            collector.stop()
        } else {
            counter++;
            await i.update({content: ' ', components: [row] });
        }
    });   
    
    return;
    
    }   
    }
}


