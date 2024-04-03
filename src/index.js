require('dotenv').config();
const { inspect, } = require ('util');
const{Client,IntentsBitField, WebhookClient, EmbedBuilder, Routes, DataResolver, ActivityType, Emoji, Embed, ReactionEmoji, GuildEmoji}=require('discord.js')
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
  const exemptRoleIDs = ['1212820572724264990', '1223748824699244644', '1210943307111211038','1212431099028971555','1223429887839309844','1190374142403416074','1219633686908239932', '1210962834029158460','1224673398840365157','1224673501613395969','1224673745524887572','1224673991244120104','1224674246446288917','1224674491049709588','1224791423430299678'];
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






























//RUlesssssssssssss
// // Event for when a message is received
// client.on('messageCreate', message => {
//   // Check if the message starts with !rules
//   if (message.content.startsWith('!rules')) {
//       // Create an embed for general rules
//       const generalEmbed = {
//           title: 'Server Rules',
//           description: 'Please adhere to the following rules:',
//           color: parseInt('ff0000', 16), // Convert hexadecimal color code to integer
//           fields: [
//               { name: '1. Follow Discord Policies', value: 'This rule must be followed at all times.' },
//               { name: '2. Be Respectful', value: 'Be respectful to someone who you don’t know. If the person complains, you might receive a penalty.' },
//               { name: '3. No Sexism', value: 'Usage of excessive extreme racial/sexist slurs is prohibited and will result in mute or ban.' },
//               { name: '4. No Pedophilia', value: 'This includes pedophilia grooming jokes, remarks, references, pictures, etc.' },
//               { name: '5. No Gore/NSF', value: 'No gore or NSFW content allowed, including your profile picture, status, and name.' },
//               { name: '6. No Leaking', value: 'No doxing or posting someone\'s personal information or photos without their consent.' },
//               { name: '7. No Malicious Links', value: 'Sending or linking any harmful material such as viruses, IP grabbers, or phishing links will result in an immediate and permanent ban.' },
//               { name: '8. No Advertising', value: 'Posting invite links or self-promoting is not allowed. Promotion must be approved by Mods.' },
//               { name: '9. No Religious Arguments', value: 'Respect others\' beliefs and avoid religious arguments.' }
//           ]
//       };

//       // Create an embed for the last rule
//       const lastRuleEmbed = {
//           title: 'Complaints or Questions',
//           description: 'If you have any complaints or questions, you can contact the moderators.',
//           color: parseInt('0000ff', 16) // Convert hexadecimal color code to integer
//       };

//       // Send the general rules embed to the channel
//       message.channel.send({ embeds: [generalEmbed] });

//       // Send the last rule embed to the channel
//       message.channel.send({ embeds: [lastRuleEmbed] });
//   }
// });

// // Event for when a message is received
// client.on('messageCreate', message => {
//   // Check if the message starts with !levels
//   if (message.content.startsWith('!levels')) {
//       // Create an embed using the embed builder syntax
//       const embed = {
//           title: 'Perks',
//           description: 'Here are the perks you can get by staying active in the chat:',
//           color: 0x00FF00, // Green color
//           fields: [
//               { name: 'Level 10', value: '- External emojis + stickers' },
//               { name: 'Level 20', value: '- Slash Commands' }, // Swapped with Level 20
//               { name: 'Level 30', value: '- Attach Files + Message Threads + Activities' }, // Swapped with Level 30
//               { name: 'Level 40', value: '- Manage Nicknames + Soundboard' },
//               { name: 'Level 50', value: '- Send Links' },
//               { name: 'Level 60', value: '- Timeout perms + Voice messages' },
//               { name: 'Level 70', value: '- Visible role + Private Channels access' },
//               { name: 'Level 80', value: '- Visible role + Special Role Icon + Kick/Timeout members' },
//               { name: 'Level 90', value: '- Visible role + Role Icon + Moderator' },
//               { name: 'Level 100', value: '- Visible role + Role icon + Admin Power' }
//           ]
//       };

//       // Send the embed to the channel
//       message.channel.send({ embeds: [embed] });
//   }
// });

