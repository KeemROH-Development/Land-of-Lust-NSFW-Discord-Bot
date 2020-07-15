const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'rob',
  execute(client, message, args, db){
    let blacklist;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
      }
   if(!blacklist) blacklist = false
    if(blacklist == true) return message.channel.send('you\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
   let member = message.mentions.members.first();
  db.collection('Userinfo').doc(message.author.id).get().then((q) => {
    if (!q.exists) {
  return message.channel.send("Your Account is not registered on our database please register by doing the start command")
    }
if(q.exists){
  if(!member) return message.channel.send("Provide an user to rob")
    if(member.id == message.author.id) return message.channel.send("You cannot rob yourself dumb-dumb")
  db.collection('Userinfo').doc(member.user.id).get().then((q) => {
    if (!q.exists) {
        return message.channel.send("Your Mentioned Users Account is not registered on our database please register by doing the `start <mention>`")
    }
       let wcash;
      let w1cash;
       db.collection('Userinfo').doc(message.author.id).get().then((q) => {
    if (q.exists) {
     wcash = q.data().coins
    }
          db.collection('Userinfo').doc(member.user.id).get().then((q) => {
    if (q.exists) {
     w1cash = q.data().coins
    }
  if(!w1cash) w1cash = 0
  if (!wcash) wcash = 0
        if(w1cash < 500) return message.channel.send("The user doesnt even have 500 coins. Not Worth it")
         if(wcash < 500) return message.channel.send("You need atleast 500 coins to rob ")
         let random = Math.round(Math.random(0,1)); 
         let scash = Math.floor(Math.random()* w1cash);
         if(random == 1){
           db.collection('Userinfo').doc(message.author.id).update({
             'coins' : wcash-= 500
           }).then(() =>{
                    message.channel.send("You been caught!. You Paid 500 coins!")
                    })
           db.collection('Userinfo').doc(member.user.id).update({
             'coins' : w1cash +=500
           })
         }
         if(random == 0){
             db.collection('Userinfo').doc(message.author.id).update({
             'coins' : wcash+= scash
           }).then(() =>{
                    message.channel.send(`Your Payout was ${scash} coins`)
                    })
           db.collection('Userinfo').doc(member.user.id).update({
             'coins' : w1cash -=scash
           })
         }
       })
         })
       })
}
     })
    })
  }
}
