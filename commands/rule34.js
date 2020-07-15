const booru = require('booru')
const Discord = require('discord.js')
const config = require('../config')

module.exports = {
  name: 'rule34',
  async execute(client, message, args, db){
    
    
        booru.search("r34", args, {limit: 1, random: true})
        .then(booru.commonfy)
        .then(images => {
          //Log the direct link to each image
          for (let image of images) {
            console.log(image.common.file_url)
            
             if (!message.channel.nsfw)
      return message.channel.send(
        "You can use this command in an NSFW Channel!"
      );
            
            const exampleEmbed = new Discord.MessageEmbed()
           
            .setTitle('If it exists, theres porn for it.')
            .setImage(image.common.file_url)
            .setFooter(config.embed.footer)
           
            
            message.channel.send(exampleEmbed);
          } 
        })
        .catch(err => {
          if (err.name === 'booruError') {
            //It's a custom error thrown by the package
            console.log(err.message)
            message.reply("Did not find anything ;-;")
            message.channel.send({
              files: [
                "./img/kotocry.png"
              ]
            });
          } else {
            //This means I messed up. Whoops.
            console.log(err)
          }
        })
    }
}