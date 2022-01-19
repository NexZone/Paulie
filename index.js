// Packages
import { Client, Collection, Intents } from 'discord.js';
import dotenv from 'dotenv';
// Commands
import { ping } from './commands/ping.js';
import { generate } from './commands/generate.js';

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.commands = new Collection();
client.commands.set(ping.data.name, ping);
client.commands.set(generate.data.name, generate);

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try { await command.execute(interaction);
    } catch (error) {
        console.log(`\n Error occured with command "/${interaction.commandName}" \n`, error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

});

client.login(process.env.TOKEN);
