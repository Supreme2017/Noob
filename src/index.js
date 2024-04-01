require('dotenv').config();
const { inspect, } = require ('util');
const{Client,IntentsBitField, EmbedBuilder, Routes, DataResolver, ActivityType, Emoji, Embed, ReactionEmoji, GuildEmoji}=require('discord.js')
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
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
  
  


  // Links delete
  const exemptRoleIDs = ['1212820572724264990', '1223748824699244644', '1210943307111211038','1212431099028971555','1223429887839309844','1190374142403416074','1219633686908239932', '1210962834029158460'];
  const allowedChannelID = '1210955522421817385';
  client.on('messageCreate', message => {


    //Asim Uncle
    const contentLowercase = message.content.toLowerCase();
   if (contentLowercase.includes("asim muneer")||contentLowercase.includes("army")||contentLowercase.includes("asim munir")) {
      message.reply("https://media.tenor.com/Va1kCZB5Ot4AAAAM/cop-police.gif");
  };

  //links shit

    if (message.channel.id !== allowedChannelID) {
      return;
  }

    if (message.author.bot || exemptRoleIDs.some(roleID => message.member.roles.cache.has(roleID))) {
        return;
    }

    if (message.content.match(/https?:\/\/\S+/)) {
        message.delete()
            .then(deletedMessage => {
                console.log(`Deleted message from ${deletedMessage.author.username}: ${deletedMessage.content}`);
                // Send a message mentioning the user
                message.channel.send(`<@${deletedMessage.author.id}>, You're not allowed to send links here.`)
                    .then(sentMessage => {
                        // Delete the message after 4 seconds
                        setTimeout(() => {
                            sentMessage.delete().catch(error => console.error('Error deleting message:', error));
                        }, 4000);
                    })
                    .catch(error => console.error('Error sending message:', error));
            })
            .catch(error => console.error('Error deleting message:', error));
    }
});




// welcome command
const welcomeChannelID="1210955522421817385"
const guildID="1189591582375166114"
client.on('guildMemberAdd', member => {
  if (member.guild.id !== guildID) return;
  const channel = member.guild.channels.cache.get(welcomeChannelID);
  if (!channel) return;
  channel.send(`Welcome to the Supreme Family, ${member}!`);
});






















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

    // warn command 
    const {ownerid} = require("../config.json")  ; 
    const reason = "has been warned for the reason:" 

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;
    
      if (interaction.commandName === 'warn') {
        const input = interaction.options.getUser('member');
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