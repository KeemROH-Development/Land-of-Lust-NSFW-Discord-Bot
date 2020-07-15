const Discord = require('discord.js');
const config = require('../config')

module.exports = {
    name : 'femboy',
    execute(client, message, args, db) {
      if(!message.content.startsWith(config.prefix)) return;
      message.channel.send("Femboy Command")
    }
}



