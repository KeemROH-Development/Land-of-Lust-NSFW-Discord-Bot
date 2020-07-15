const Discord = require("discord.js");

module.exports = {
  name: "supreme",
  execute(client, message, args) {
   let arg = message.content.split(" ").slice(1);
    let html_args = new URLSearchParams({text: arg.join(" "), dark: "true"})
    let url = `https://api.alexflipnote.dev/supreme?${html_args}`
    message.delete();
    
    var supremembed = new Discord.MessageEmbed()
    .setTitle("Supreme")
    .setImage(url)
    .setFooter('Supreme')

    message.channel.send(supremembed);
  }
};