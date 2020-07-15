const config = require('../config.json')
module.exports = {
  name: 'blacklist',
  execute(client, message, args, db){
    let array = [];
  array = config.administrators
    if(array.includes(message.author.id)){ 
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("You need to provide an user")
      if(!message.content.startsWith(config.prefix)) return;
    db.collection('Userinfo').doc(member.user.id).update({
      'blacklist': true
    }).then(()=> {
      message.channel.send(`${member.user.tag} has been blacklisted`)
    })
    }else{
      message.channel.send("Your not a bot admin")
    }
  }
}