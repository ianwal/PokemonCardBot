const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('node:fs');
var obj = JSON.parse(fs.readFileSync('./baseset1.json'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomcard')
        .setDescription('pulls a random card from base set1'),
    async execute(interaction) {
        value = Math.floor(Math.random() * (101-0+1) + 0); // (max - min + 1) + min) -> array so subtract 1 from each value
        await interaction.reply(obj[value].images.large);
        return;
    }
}