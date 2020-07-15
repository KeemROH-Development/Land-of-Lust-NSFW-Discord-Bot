const Discord = require('discord.js');
const config = require('../config.json');
const FieldValue = require("firebase-admin").firestore.FieldValue;
module.exports = {
  name: 'addpromo',
  execute(client, message, args, db){
 let arg = message.content.split(' ').slice(1)
 if(!config.administrators.includes(message.author.id))return message.channel.send('Your not a bot admin')
 if(!arg[0])return message.channel.send('Enter a code to add')
 db.collection('Promo Codes').doc('Codes').get().then((q)=>{
   if(!q.exists){
    db.collection('Promo Codes').doc('Codes').set({
      'Codes': arg.join(' ')
    }).then(()=>{
      message.channel.send('Code added')
    })
   }
if(q.exists){
    db.collection('Promo Codes').doc('Codes').update({
      'Codes': FieldValue.arrayUnion(arg.join(' '))
    }).then(()=>{
      message.channel.send('Code added')
    })
}
 })   
              }
}
