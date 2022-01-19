import { SlashCommandBuilder } from "@discordjs/builders";

const generate = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Generates a random number between 0 and 100'),
    async execute(interaction) {
            let randomNumber = String(Math.floor(Math.random() * 100));
            await interaction.reply(randomNumber);
    }
};
export default generate;