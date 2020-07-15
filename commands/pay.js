const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'pay',
  execute(client, message, args, db){
      let blacklist;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
      }
   if(!blacklist) blacklist = false
    if(blacklist == true) return message.channel.send('You\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
   db.collection('Userinfo').doc(message.author.id).get().then((q) => {
    if (!q.exists) {
         return message.channel.send("Your Account is not registered on our database please register by doing the start command")
    }
          if(q.exists){
        let member = message.mentions.members.first();
        if(!member)return message.channel.send("Provide an user to transfer money")
  db.collection('Userinfo').doc(member.user.id).get().then((q) => {
    if (!q.exists) {
         return message.channel.send("Your Mentioned Users Account is not registered on our database please register by doing the `start <mention>`")
    }
    if(member.user.id === message.author.id) return message.channel.send("You cannot send yourself coins")
       let wcash;
       db.collection('Userinfo').doc(message.author.id).get().then((q) => {
    if (q.exists) {
     wcash = q.data().coins
   
    }
         let mcash;
       db.collection('Userinfo').doc(member.user.id).get().then((q) => {
    if (q.exists) {
     mcash = q.data().coins
    }
    if (!wcash) wcash = 0;
     if(!mcash)mcash = 0;
   let arg = message.content.split(" ").slice(3)
   let gcash = parseInt(arg) 
   if (isNaN(gcash)) return message.reply('That was not a valid number!')
   if(gcash > wcash) return message.channel.send("You dont have that much money with you")
          db.collection('Userinfo').doc(message.author.id).update({
    'coins': wcash -=gcash
          })
    db.collection('Userinfo').doc(member.user.id).update({
    'coins': mcash +=gcash
    }).then( () => {
      message.channel.send(`Amount of ${gcash} coins  has been given to ${member.user.tag}`)
    })
       })
       })
        })
        }
            })
    })
}
}
