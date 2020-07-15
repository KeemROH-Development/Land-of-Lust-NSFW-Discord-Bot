const Discord = require('discord.js')
const config = require('../config.json');
module.exports = {
  name: 'with',
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
      if(q.exists){
       let wcash;
      let bcash;
       db.collection('Userinfo').doc(message.author.id).get().then((q) => {
    if (q.exists) {
     wcash = q.data().coins
    bcash = q.data().bank
    }
    if (!wcash) wcash = 0;
   if(!bcash) bcash = 0;
   let arg = message.content.split(" ").slice(1)
   let wicash = parseInt(arg)
   if (isNaN(wicash)) return message.reply('That was not a valid number!')
   if (wicash < 0) return message.reply(' Did you really think that would work? lol.')
   if(wicash > bcash) return message.channel.send("You dont have that much money with you")
    db.collection('Userinfo').doc(message.author.id).update({
    'coins': wcash +=wicash,
      'bank' : bcash -=wicash
    }).then( () => {
      message.channel.send(`Amount of ${wicash} coins  has been withdrawn from your bank account`)
    })
       })
      }
  })
    })
  }
}
