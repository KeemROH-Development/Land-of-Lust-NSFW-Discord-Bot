const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'dep',
  execute(client, message, args, db){
      let blacklist;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
      }
   if(!blacklist) blacklist = false
    if(blacklist == true) return message.channel.send('you\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
 db.collection('Userinfo').doc(message.author.id).get().then((q) => {
    if (!q.exists) {
    return message.channel.send("Your Account is not registered on our database please register by doing the start command")
    }
       let wcash;
      let bcash;
       db.collection('Userinfo').doc(message.author.id).get().then((q) => {
    if (q.exists) {
     wcash = q.data().coins
    bcash = q.data().bank
    var all = wcash
    }
    if (!wcash) wcash = 0;
   if(!bcash) bcash = 0;
   let arg = message.content.split(" ").slice(1)
   let dcash = parseInt(arg)
   if (isNaN(dcash)) return message.reply('That was not a valid number!')
   if (dcash < 0) return message.reply(" Did you really think that would work? lol.")
   if(dcash > wcash) return message.channel.send("You dont have that much money with you")
    db.collection('Userinfo').doc(message.author.id).update({
    'coins': wcash -=dcash,
      'bank' : bcash +=dcash
    }).then( () => {
      message.channel.send(`Amount of ${dcash} coins  has been credited to your bank account`)
    })
       })
      })
    })
}
                                                                }