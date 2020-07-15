const Discord = require('discord.js');
const config = require('../config.json');
const FieldValue = require("firebase-admin").firestore.FieldValue;
module.exports = {
  name: 'promo',
  execute(client, message, args, db){
 let arg = message.content.split(' ').slice(1)
 if(!arg[0])return message.channel.send('Enter a code to claim rewards')
 db.collection('Promo Codes').doc('Codes').get().then((q)=>{
   if(!q.exists){
  message.channel.send('There are no promo codes to remove')
   }
if(q.exists){
  const array = q.data().Codes
  if(!array.includes(arg.join(' ')))return message.channel.send('There is no such promo code to claim')
   db.collection('Promo Codes').doc('Codes').update({
      'Codes': FieldValue.arrayRemove(arg.join(' '))
    }).then(()=>{
     db.collection('Userinfo').doc(message.author.id).get().then((a)=>{
       if(!a.exists){
   message.channel.send("This user is not registered in our database");
       }
if(a.exists){
  let coin = a.data().premium
  db.collection('Userinfo').doc(message.author.id).update({
    'premium': true
  }).then(()=>{
    message.channel.send(`You recieved premium status from the promo code!`)
  })
}
     })
    })
}
 })   
              }
}
