const config = require('../config.json')
module.exports = {
  name: 'premium',
  execute(client, message, args, db){
    let array = [];
  array = config.administrators
    if(array.includes(message.author.id)){ 
    let member = message.mentions.members.first()
    if(!message.content.startsWith(config.prefix)) return;
    if(!member) return message.channel.send("You need to provide an user")
    db.collection('Userinfo').doc(member.user.id).update({
      'premium': true
    }).then(()=> {
      message.channel.send(`${member.user.tag} is a premium member now!`)
    })
    }else{
      message.channel.send("Your not a bot admin")
    }
  }
}