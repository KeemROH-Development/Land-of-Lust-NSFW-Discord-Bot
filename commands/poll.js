const Discord = require("discord.js");

module.exports = {
  name: "poll",
  async execute(client, message, args, db) {
    
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You can't do that!");
  
  if(!args[0]) return message.channel.send("Invalid argument! Usage: l!poll (Question here)");
  
  let pollembed = new Discord.MessageEmbed()
  .setColor(0xffffff)
  .setFooter(`React to vote || Poll created by: ${message.author.username}`)
  .setTitle(args.join(' '))
  
  let msg = await message.channel.send(pollembed);
  
  
  
  
  await msg.react('✅')
  await msg.react('❌')
  
  message.delete({timeout: 1000});
  
} 
}
