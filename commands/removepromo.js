const Discord = require('discord.js');
const config = require('../config.json');
const FieldValue = require("firebase-admin").firestore.FieldValue;
module.exports = {
  name: 'removepromo',
  execute(client, message, args, db){
 let arg = message.content.split(' ').slice(1)
 if(!config.administrators.includes(message.author.id))return message.channel.send('Your not a bot admin')
 if(!arg[0])return message.channel.send('Enter a code to remove')
 db.collection('Promo Codes').doc('Codes').get().then((q)=>{
   if(!q.exists){
  message.channel.send('There are no promo codes to remove')
   }
if(q.exists){
  const array = q.data().Codes
  if(!array.includes(arg.join(' ')))return message.channel.send('There is no such promo code to remove')
   db.collection('Promo Codes').doc('Codes').update({
      'Codes': FieldValue.arrayRemove(arg.join(' '))
    }).then(()=>{
      message.channel.send('Code removed')
    })
}
 })   
              }
}
