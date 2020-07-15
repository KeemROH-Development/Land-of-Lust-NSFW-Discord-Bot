const Discord = require("discord.js")
const Client = new Discord.Client
let test = "u gay"

module.exports = {
    name : 'eval',
    execute(client, message, args, db){

  if(message.author.id !== "686998287647113302") return;

    const command = message.content.split(' ').slice(1).join(' ');
    message.channel.send(
`\`\`\`js
${eval(command)}
\`\`\``);

  }
}
    