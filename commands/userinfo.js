//Defining Packages and getting files
const ytdl = require('ytdl-core');
const Discord = require ("discord.js");
module.exports = {
    name: 'userinfo',
    execute(client, message, args){
  const status = { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" };
     if (message.author.presence.activities.length == 0){
      var em = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`User Information of ${message.author.tag}`)
    .setThumbnail(message.author.displayAvatarURL())
    .addField("User name:",`${message.author.username}`)
    .addField("User Id:",`${message.author.id}`)
    .addField("User Discriminator",`#${message.author.discriminator}`)
    .addField("Status",status[message.author.presence.status])
    .addField("Game:", "NONE")
    .addField("Bot:",`${message.author.bot? "Yes" : "No"}`)
    .addField("Joined server:", `${message.guild.joinedAt}`)
    .addField("Account created:",`${message.author.createdAt}`)
    .setFooter(`Requested by ${message.author.tag}`)
    .setTimestamp();
         message.channel.send(em);
     }else{
        var em = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`User Information of ${message.author.tag}`)
    .setThumbnail(message.author.displayAvatarURL())
    .addField("User name:",`${message.author.username}`)
    .addField("User Id:",`${message.author.id}`)
    .addField("User Discriminator",`#${message.author.discriminator}`)
    .addField("Status",status[message.author.presence.status])
    .addField("Game:", message.author.presence.activities)
    .addField("Bot:",`${message.author.bot? "Yes" : "No"}`)
    .addField("Joined server:", `${message.guild.joinedAt}`)
    .addField("Account created:",`${message.author.createdAt}`)
    .setFooter(`Requested by ${message.author.tag}`)
    .setTimestamp();
         message.channel.send(em);
     }
    }
}
