const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'resign',
  execute(client, message, args, db){
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(!q.exists){
       return message.channel.send("Your not registered in our database please do so by doing the start command")
      }
      if(q.exists){
    let blacklist;
    let work;
    db.collection('Userinfo').doc(message.author.id).get().then((q)=>{
      if(q.exists){
        blacklist = q.data().blacklist
        work = q.data().class
      }
   if(!blacklist) blacklist = false
      if(!work) work = null
       if(blacklist == true) return message.channel.send('You\'re blacklisted')
      if(work == null) return message.channel.send("You dont have a job to resign")
      if(!message.content.startsWith(config.prefix)) return;
      db.collection('Userinfo').doc(message.author.id).update({
        'class': null
      }).then(()=>{
              message.channel.send("You have resigned from your job")
              })
    })
  }
    })
  }
}