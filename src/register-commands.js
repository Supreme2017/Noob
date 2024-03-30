require('dotenv').config();
const{ REST,Routes,ApplicationCommandOptionType,InteractionResponse } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with the latency',
    },
    {
        name:'warn',
        description:'use me to warn a member',
        options:[
            {
                name: 'member',
                description: 'The input to repeat.',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'reason',
                description: 'warn reason',
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    }
];


const rest = new REST({ version: '10' }).setToken(process.env.key);


(async() => {
    try {
        console.log('Registering Slash Commands...');
        await rest.put(
            Routes.applicationCommands(process.env.bot_id),
            {
                body: commands
            }
        )
        console.log('Slash commands registered succesfully!')
    } catch (error){
        console.log(`There was an error: ${error}`);
    }
}) ();

