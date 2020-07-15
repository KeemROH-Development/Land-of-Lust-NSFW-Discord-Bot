const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'shop',
  execute(client, message, args, db){
   db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(!q.exists){
      return message.channel.send("register in our database with l!start before using this command ")
      }
     if(q.exists){
      let blacklist;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
      }
   if(!blacklist) blacklist = false
    if(blacklist == true) return message.channel.send('You\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
      let shopembed = new Discord.MessageEmbed()
      .setTitle("SHOP (Lootboxes Disabled)")
      .addField("Lootboxes","**Normal Lootbox** - 10000 Coins\n**Epic Lootbox** - 20000 Coins\n**Mythic Lootbox** - 25000 Coins\n**Legendary Lootbox** - 40000 Coins\n")
      .setColor(config.embed.color)//can u put the lootbox price and i added pistol,bullet,taser, emb(electro magnetic battery)bullet for taser
      .setFooter(config.embed.footer)//done
      message.channel.send(shopembed)
    })
     }
   })
  }
}