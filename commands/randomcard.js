const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('node:fs');
const obj = JSON.parse(fs.readFileSync('./baseset1.json'));
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomcard')
        .setDescription('pulls a 10 random cards from base set1'),
    async execute(interaction) {
         value = Math.floor(Math.random() * (101-0+1) + 0); // (max - min + 1) + min) -> array so subtract 1 from each value and 102 cards in base set
         await interaction.reply(obj[value].images.large);
         for (let i = 0; i < 9; i++) {
            await wait(5000);
            value = Math.floor(Math.random() * (101-0+1) + 0); // (max - min + 1) + min) -> array so subtract 1 from each value
              await interaction.editReply(obj[value].images.large);
            }
         return;
    }
}