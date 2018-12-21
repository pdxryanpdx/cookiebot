const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");


client.on("ready", () => {
    console.log('Ready!')
});

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on("message", async message => {
    const swearWords = ["fuck", "nigger", "pussy", "shite"];
    if( swearWords.some(word => message.content.includes(word)) ) {
      message.reply("Oh no you said a bad word!!!")
      message.delete();
    }
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === "ping") {

        const msg = await message.channel.send('**Pong!**');
        msg.edit('**Pong!** ' + "`" + Math.round(client.ping) + "ms`")

    }
    
    if(cmd === 'help') {
        
        const embed = new discord.RichEmbed()
        .setTitle('Cookie Bot Help')
        .setDescription('Cookie Bot is a small discord bot designed to make your time on discord better \n \n **!serverinfo** The  server info command allows you to see about the server you are in\n **!ping** This command allows you to see the reponse time of the bot\n**!invite** Invite me to your server! \n**!8ball:** A 8Ball command to see your fate \n**!coinflip**: Flip a coin! \nThanks for using Cookie Bot, it is very much appreciated. <3 -pdxryanpdx*')
        .setColor('#DAA520')
              message.channel.send(embed)
 
    }

    
    if(cmd === 'invite') {
    
        const embed = new discord.RichEmbed()
        .setTitle('Invite Me! | Cookie Bot')
        .setDescription(`Cookie Bot is a small discord bot designed to make your time on discord better \n Please invite Cookie Bot to your server! It would mean a ton to me. \n *https://bit.ly/cbinvite*\n Huge thanks to InfinityMage#0001 for being a mentor.\n -pdxryanpdx <3`)
        .setColor('#DAA520')
            message.channel.send(embed)

}


if(cmd === "serverinfo") {

    const embed = new discord.RichEmbed()
    .setTitle('Server Information')
    .setColor('#DAA520')
    .setDescription(`**Name:** ${message.guild.name}\n**Members:** ${message.guild.members.size}\n**Owner:** <@${message.guild.ownerID}>\n**Emojis:** ${message.guild.emojis.size}\n**Roles:** ${message.guild.roles.size}\n**Server Created:** ${message.guild.createdAt}\n **You joined at:** ${message.guild.joinedAt}`)

    message.channel.send(embed)

} 
if(cmd === '8ball') {
    const array = ["I don't think so!", "Definitely!", "Probably not."]
    const embed = new discord.RichEmbed()
    .setTitle('8Ball | Cookie Bot ')
    .setDescription(array[randomNum(0, array.length-1)])
    .setColor('#DAA520')
          message.channel.send(embed)

}
if(cmd === 'coinflip') {
    const array = ["Heads!","Tails!"]
    const embed = new discord.RichEmbed()
    .setTitle('Coin Flip | Cookie Bot ')
    .setDescription(array[randomNum(0, array.length-1)])
    .setColor('#DAA520')
          message.channel.send(embed)
}
if(cmd === 'kick') {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.kick('Optional reason that will display in the audit logs').then(() => {
          
            message.reply(`Successfully kicked ${user.tag}`);
          }).catch(err => {
            message.reply(`I cant kick ${user.tag}`);
            console.error(err);
          });
        } else {
          message.reply('That user isn\'t in this guild!');
        }
      } else {
        message.reply('You didn\'t mention the user to kick!');
        }
    } 
  });
  client.login(config.token)
 
