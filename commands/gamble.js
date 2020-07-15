const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'gamble',
  execute(client, message, args, db){
      let blacklist;
    let coin;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
        coin = q.data().coins
      }
   if(!blacklist) blacklist = false
      if(!coin) coin = 0
    if(blacklist == true) return message.channel.send('you\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
      let arg = message.content.split(" ").slice(1)
      if(arg.length == 0)return message.channel.send("You need to enter to number coins to gamble")
      let gcoin = parseInt(arg)
      if(isNaN(gcoin)) return message.channel.send("Not a valid number of coins")
let randomn = Math.floor(Math.random()*100)
      if(gcoin > coin)return message.channel.send("You dont have that many coins.")
      if(randomn > 50){
      db.collection('Userinfo').doc(message.author.id).update({
        'coins' : coin +=gcoin
      }).then(()=>{
        message.channel.send(`You have rolled ${randomn}%! Congratulations :tada:`)
      })
      }
      if(randomn < 50){
          db.collection('Userinfo').doc(message.author.id).update({
        'coins' : coin -=gcoin
      }).then(()=>{
        message.channel.send(`You have rolled ${randomn}%! Better luck next time :sob:, you Lost ${gcoin}`)
      })
      }
      if(randomn == 50){
        let hcoin = gcoin/2
          db.collection('Userinfo').doc(message.author.id).update({
        'coins' : coin -=hcoin
      }).then(()=>{
        message.channel.send(`You have rolled ${randomn}%! . Game tied you lost ${hcoin} `)
      })
      }
    })
  }
}