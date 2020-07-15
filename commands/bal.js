const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: 'bal',
  execute(client, message, args, db){
    let blacklist;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
      }
   if(!blacklist) blacklist = false
    if(blacklist == true) return message.channel.send(' you\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
 const member = message.mentions.members.first();
      if(!member) {
      let wcash;
      let bcash;
          db.collection('Userinfo').doc(message.author.id).get().then((q) => {
        if(q.exists){
   wcash = q.data().coins
  bcash = q.data().bank
        }
         if(!wcash) wcash = 0
        if(!bcash) bcash = 0
              message.channel.send(new Discord.MessageEmbed () .setTitle(`${message.author.username}\'s Balance`) .setColor(config.embed.color) .addField("**Wallet:**",`${wcash}`) .addField("**Bank**",`${bcash}`))
          })
      }
    if(member){  db.collection('Userinfo').doc(member.user.id).get().then((q) => {
    if (!q.exists) {
       db.collection("Userinfo").doc(member.user.id).set({
   'Name': message.author.username,
      'coins' : 0,
         'bank' : 0,
          'limit' : 2000,
           'rep' : 0,
         'premium' : false,
         'class' : null,
         'bank': 0
  })
    }
  })
      let wcash;
      let bcash;
      db.collection('Userinfo').doc(member.user.id).get().then((q) => {
        if(q.exists){
   wcash = q.data().coins
  bcash = q.data().bank
        }
         if(!wcash) wcash = 0
        if(!bcash) bcash = 0
       message.channel.send(new Discord.MessageEmbed () .setTitle(`${member.user.username}\'s Balance`) .setColor("GREEN") .addField("**Wallet:**",`${wcash}`) .addField("**Bank**",`${bcash}`))
      })
              }
    })
              }
}
