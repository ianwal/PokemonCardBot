const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('node:fs');
const obj = JSON.parse(fs.readFileSync('./baseset1.json'));
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, Message } = require('discord.js');
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers]
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

    const collector = interaction.channel.createMessageComponentCollector({
    });

    /// For loop time
    const basicEnergy = []
    const allCardsCopy = obj.slice(); // Copy of obj to remove cards from for removing duplicate card pulls

    obj.forEach((card, index) => {
        if (card.supertype === "Energy" && card.subtypes[0] === "Basic") {
            basicEnergy.push(index);
        }
    }); 

    // remove energies from the juice

    value = Math.floor(Math.random() * basicEnergy.length);
    index = basicEnergy[value]
    await interaction.reply(obj[index].images.large);  // first card is guarenteed to be a basic energy

    basicEnergy.forEach((card, index) => {
        allCardsCopy.pop(basicEnergy[index], 1);
    });

    let counter = 1;
    collector.on('collect', async i => { // on button press -> new card
    if (interaction.user.id === i.user.id) {   
        newValue = Math.floor(Math.random() * (101-0+1) + 0); // (max - min + 1) + min) -> array so subtract 1 from each value and 102 cards in base set
        await interaction.editReply(allCardsCopy[newValue].images.large);
        if (counter >=10) {                                         // 9 clicks till button is disabled (1 initial card + 9 more cards for a pack)
            row.components[0].setDisabled(true);
            await i.update({content: ' ', components: [row] });
            collector.stop()
        } else {
            counter++;
            await i.update({content: ' ', components: [row] });
        }
    } else {
        await i.reply({content:"You can't use this button!", ephemeral: true});
    }
    });   
    
    return;
    
    }   
    }
}

