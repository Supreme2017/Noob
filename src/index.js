require('dotenv').config();
const { inspect, } = require ('util');
const{Client,IntentsBitField, EmbedBuilder, Routes, DataResolver, ActivityType, Emoji, Embed, ReactionEmoji, GuildEmoji}=require('discord.js')
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessageTyping,
    ]
});

client.on('ready',(c)=>{
    console.log(`🔥 ${c.user.username} is online`)
})

client.on('ready', () => {
    client.user.setStatus("idle");
    client.user.setActivity({
        type: ActivityType.Custom,
        name: "Serving my master: Supreme Leader 🔥"
    })
  })
  

client.on ('messageCreate',(message)=>{
    if (message.author.bot){
        return;
    }
    const contentLowercase = message.content.toLowerCase();
    //Asim Uncle
     if (contentLowercase.includes("asim muneer")||contentLowercase.includes("army")||contentLowercase.includes("asim munir")) {
        message.reply("https://media.tenor.com/Va1kCZB5Ot4AAAAM/cop-police.gif");
    };


})


//slash commands
const { admin } = require('../config.json');
client.on('interactionCreate', (interaction) => {
    if (!admin.includes(interaction.user.id)) {
        interaction.reply("This command is only for the Owner :skull_crossbones: ");
        return;
    }

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping'){
    interaction.reply(`🏓 Pong! ${client.ws.ping}ms`);
    }     





    const {ownerid} = require("../config.json")  ; 
    const reason = "has been warned for the reason:" 

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;
    
      if (interaction.commandName === 'warn') {
        const input = interaction.options.getString('member');
        const reasonn = interaction.options.getString('reason');
    
        if (!input) {
          await interaction.reply({ content: 'Please provide an input.', ephemeral: true });
        } else if (ownerid.includes(interaction.user.id) && !interaction.replied && !interaction.deferred) {
          try {
            await interaction.reply("Warn success ✔").then(msg => { msg.delete(); })
            interaction.channel.send(`${input} ${reason} \`${reasonn}\``)
          }catch (error) {
            console.error(`Failed to reply to interaction: ${error.message}`);
          }
        } else {
          await interaction.reply({ content: 'You are not allowed to warn any member.', ephemeral: true });
        }
      }
    });
});


client.login(process.env.key);