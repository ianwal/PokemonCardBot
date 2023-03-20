const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('says hi'),
        async execute(interaction) {
        await interaction.reply('Hello');
        return;
    }
}