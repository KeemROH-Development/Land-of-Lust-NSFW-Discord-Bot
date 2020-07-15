const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "invite",
  execute(client, message, args, db){
      let blacklist;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
      }
   if(!blacklist) blacklist = false
    if(blacklist == true) return message.channel.send('you\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
    var inviteEmbed = new Discord.MessageEmbed()
        .setAuthor("Add me to your server!")
        .setColor('#49d5ff')
        .addField('Use this link to invite me!', '[Click Here To Add Me](https://discord.com/api/oauth2/authorize?client_id=718254862156169236&permissions=8&scope=bot)')
      message.channel.send(inviteEmbed);
    })
    }
}
