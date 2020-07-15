const Discord = require("discord.js");
const config = require('../config.json')
module.exports = {
    name : 'use',
    execute(client, message, args, db){
       let blacklist;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
      }
   if(!blacklist) blacklist = false
    if(blacklist == true) return message.channel.send('You\'re blacklisted')
      if(!message.content.startsWith(config.prefix)) return;
      
      message.channel.send("This command is currently disabled, sorry.");
    })
    }
}





//---------------
/* const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'use',
  execute(client, message, args, db){
      db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(!q.exists){
      return message.channel.send("register in our database with l!start before using this command ")
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
     
      if(!message.content.startsWith(config.prefix)) return;
  let arg = message.content.split(" ").slice(1)
let tou = arg.join(' ')
tou = tou.toLowerCase();
      if(tou === "normal lootbox"){
  if(nloot == 0) return message.channel.send("You have 0 Normal lootbox to open")
    let nn = Math.floor(Math.random()*10)
    console.log(nn)
    if(nn >= 7 && nn <=10){
      let nbu = Math.floor(Math.random()*5)
          db.collection('Userinfo').doc(message.author.id).update({
            'bullet' : bullet +=nbu,
            'nlootbox' : nloot -=1
          }).then(()=>{
            message.channel.send(`You earned ${nbu} bullets from the lootbox`)
          }) 
      
    }
        if(nn == 2){
          if(pistol == true)return message.channel.send("You got pistol from the lootbox unfortunately you already have one :sob:")
            db.collection('Userinfo').doc(message.author.id).update({
            'pistol' : true,
            'nlootbox' : nloot -=1
          }).then(()=>{
            message.channel.send(`You got a :gun: pistol from the lootbox`)
          })
        }
        if(nn >= 3 && nn <= 6){
          let cash = Math.floor(Math.random()*15000)
          db.collection('Userinfo').doc(message.author.id).update({
            'coins' : coin +=cash,
            'nlootbox' : nloot -=1
          }).then(()=>{
            message.channel.send(`You earned ${cash} coins from the lootbox`)
          })
        }
      }
      if(tou === "epic lootbox"){
        if(eloot == 0)return message.channel.send("You have 0 Epic lootboxes")
        let nn = Math.floor(Math.random()*10)
         if(nn >= 7 && nn <=10){
      let nbu = Math.floor(Math.random()*10)
          db.collection('Userinfo').doc(message.author.id).update({
            'emb' : emb +=nbu,
            'elootbox' : eloot -=1
          }).then(()=>{
            message.channel.send(`You earned ${nbu} Electro Magnetic battery from the lootbox`)
          })
      
    }
        if(nn == 4){
          if(taser == true)return message.channel.send("You got taser from the lootbox but unfortunately you already have one :sob:")
            db.collection('Userinfo').doc(message.author.id).update({
            'taser' : true,
            'elootbox' : eloot -=1
          }).then(()=>{
            message.channel.send(`You got a :gun: taser from the lootbox`)
          })
        }
        if(nn >= 3 && nn <= 6){
          let cash = Math.floor(Math.random()*30000)
          db.collection('Userinfo').doc(message.author.id).update({
            'coins' : coin +=cash,
            'elootbox' : eloot -=1
          }).then(()=>{
            message.channel.send(`You earned **${cash}** coins from the lootbox`)
          })
        }
      }
        if(tou === "mythic lootbox"){
        if(mloot == 0)return message.channel.send("You have 0 mythic lootboxes")
        let nn = Math.floor(Math.random()*10)
         if(nn >= 7 && nn <=10){
      let nbu = Math.floor(Math.random()*10)
          db.collection('Userinfo').doc(message.author.id).update({
            'emb' : emb +=nbu,
            'mlootbox' : mloot -=1
          }).then(()=>{
            message.channel.send(`You earned ${nbu} Electro Magnetic batteries from the lootbox`)
          })
      
    }
        if(nn == 6){
          if(rifle == true)return message.channel.send("You got an Assault rifle from the lootbox unfortunately you already have one :sob:")
            db.collection('Userinfo').doc(message.author.id).update({
            'assault' : true,
            'mlootbox' : mloot -=1
          }).then(()=>{
            message.channel.send(`You got a Assault rifle from the lootbox`)
          })
        }
        if(nn >= 3 && nn <= 6){
          let cash = Math.floor(Math.random()*45000)
          db.collection('Userinfo').doc(message.author.id).update({
            'coins' : coin +=cash,
            'mlootbox' : mloot -=1
          }).then(()=>{
            message.channel.send(`You earned ${cash} coins from the lootbox`)
          })
        }
      }
         if(tou === "legendary lootbox"){
        if(lloot == 0)return message.channel.send("You have 0 legendary lootboxes")
        let nn = Math.floor(Math.random()*10)
         if(nn == 7){
         if(premium == true)return message.channel.send("You got premium from the lootbox unfortunately you already have it :sob:")
            db.collection('Userinfo').doc(message.author.id).update({
              'premium' : true,
            'llootbox' : lloot -=1
          }).then(()=>{
            message.channel.send(`You got a :gun: taser and pistol from the lootbox`)
          })
    }
        if(nn == 6){
          if(taser == true)return message.channel.send("You got taser and a rifle from the lootbox but unfortunately you already have Taser :sob:")
           if(rifle == true)return message.channel.send("You got taser and rifle from the lootbox but unfortunately you already have a Assault rifle :sob:")
            db.collection('Userinfo').doc(message.author.id).update({
            'taser' : true,
              'assault' : true,
            'llootbox' : lloot -=1
          }).then(()=>{
            message.channel.send(`You got a :gun: taser and pistol from the lootbox`)
          })
        }
        if(nn >= 3 && nn <= 6){
          let cash = Math.floor(Math.random()*50000)
          db.collection('Userinfo').doc(message.author.id).update({
            'coins' : coin +=cash,
            'llootbox' : lloot -=1
          }).then(()=>{
            message.channel.send(`You earned **${cash}** coins from the lootbox`)
          })
        }
      }
    })
     }
     })
  }
} 
 */