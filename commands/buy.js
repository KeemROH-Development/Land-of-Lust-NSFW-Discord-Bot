const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'buy',
  execute(client, message, args, db){
   db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(!q.exists){
      return message.channel.send("register in our database with m!start before using this command ")
      }
     if(q.exists){
    let blacklist;
    let coin;
    let premium;
       let nloot;
       let eloot;
       let mloot;
       let lloot;
       let pistol;
       let taser;
       let bullet;
       let emb;
       let rifle;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
        coin = q.data().coins
        premium = q.data().premium
         nloot = q.data().nlootbox
        eloot = q.data().elootbox
        mloot = q.data().mlootbox
        lloot = q.data().llootbox
       pistol = q.data().pistol
        bullet = q.data().bullet
        taser = q.data().taser
        emb = q.data().emb
        rifle = q.data().assault
      }
   if(!blacklist) blacklist = false
      if(!coin) coin = 0;
      if(!premium)premium = false
      if(!nloot) nloot = 0;
         if(!eloot) eloot = 0;
         if(!mloot) mloot = 0;
         if(!lloot) lloot = 0;
      if(!pistol) pistol = false;
      if(!taser) taser = false
      if(!bullet) bullet = 0;
      if(!emb) emb = 0;
      if(!rifle) rifle = false
    if(blacklist == true) return message.channel.send('You\'re blacklisted')
      let  arg = message.content.split(" ").slice(1)
      let tbuy = arg.join(' ')
      if(arg.length == 0 )return message.channel.send("Provide something to buy")
      if(tbuy.includes("normal lootbox")){
      let n = message.content.split(" ").slice(3)
         if(n.length == 0) return message.channel.send("Supply a number of lootboxes to buy")
         let nl = parseInt(n)
         if(isNaN(nl))return message.channel.send("Not a valid no of lootboxes to buy")
          if(coin < 10000*nl) return message.channel.send("You dont have enough coins")
         db.collection('Userinfo').doc(message.author.id).update({
           'nlootbox' : nloot +=nl,
           'coins' : coin -=nl*10000
         }).then(() => {
           message.channel.send(`You successfully bought ${nl} Normal lootboxes`)
         })
        
        
      }
       if(tbuy.includes("epic lootbox")){
         let n = message.content.split(" ").slice(3)
         if(n.length == 0) return message.channel.send("Supply a number of lootboxes to buy")
         let nl = parseInt(n)
         if(isNaN(nl))return message.channel.send("Not a valid number of lootboxes to buy")
          if(coin < 20000*nl) return message.channel.send("You dont have enough coins")
         db.collection('Userinfo').doc(message.author.id).update({
           'elootbox' : eloot +=nl,
           'coins' : coin -=nl*20000
         }).then(() => {
           message.channel.send(`You successfully bought ${nl} Epic lootboxes`)
         })
         
      }
       if(tbuy.includes("mythic lootbox")){
            let n = message.content.split(" ").slice(3)
         if(n.length == 0) return message.channel.send("Supply a number of lootboxes to buy")
         let nl = parseInt(n)
         if(isNaN(nl))return message.channel.send("Not a valid number of lootboxes to buy")
          if(coin < 25000*nl) return message.channel.send("You dont have enough coins")
         db.collection('Userinfo').doc(message.author.id).update({
           'mlootbox' : mloot +=nl,
           'coins' : coin -=nl*25000
         }).then(() => {
           message.channel.send(`You successfully bought ${nl} Mythic lootboxes`)
         })
      }
       if(tbuy.includes("legendary lootbox")){
         let n = message.content.split(" ").slice(3)
         if(n.length == 0) return message.channel.send("Supply a number of lootboxes to buy")
         let nl = parseInt(n)
         if(isNaN(nl))return message.channel.send("Not a valid number of lootboxes to buy")
          if(coin < 40000*nl) return message.channel.send("You dont have enough coins")
         db.collection('Userinfo').doc(message.author.id).update({
           'llootbox' : lloot +=nl,
           'coins' : coin -=nl*40000
         }).then(() => {
           message.channel.send(`You successfully bought ${nl} Legendary lootboxes`)
         })
      }
    })
     }
   })
  }
}