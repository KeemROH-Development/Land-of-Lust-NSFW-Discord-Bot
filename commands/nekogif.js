const superagent = require("snekfetch");
const Discord = require("discord.js");
const config = require('../config.json')
module.exports = {
    name : 'nekogif',
    execute(client, message, args, db){
    //command
     if(!message.content.startsWith(config.prefix)) return;
    if (!message.channel.nsfw)
      return message.channel.send(
        "You can use this command in an NSFW Channel!"
      );
    superagent.get("https://nekos.life/api/v2/img/nsfw_neko_gif").end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
        .setTitle("Sexi Neko UwU")
        .setImage(response.body.url)
        .setColor(`#000000`)
        .setFooter(`Tags: Neko`)
        .setURL(response.body.url);//Helo?
      message.channel.send(lewdembed);//ok what is it?
    });
  }
};
