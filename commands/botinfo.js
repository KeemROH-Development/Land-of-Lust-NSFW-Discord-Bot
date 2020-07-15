//Defining Packages and getting files
const ytdl = require('ytdl-core');
const Discord = require ("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: 'botinfo',
    execute(client, message, args){
      
    let totalSeconds = client.uptime / 1000
    let days = Math.floor(totalSeconds / 86400)
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds % 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Number.parseInt(totalSeconds % 60)

    let dDay = `${days} Day`
    let dHour = `${hours} Hour`
    let dMinute = `${minutes} Minute`
    let dSecond = `${seconds} Second`
    if(days === 0) dDay = ""
    else if (days > 1) dDay += "s, "
    else dDay += ", "
    if(hours === 0) dHour = ""
    else if (hours > 1) dHour += "s, "
    else dHour += ", "
    if(minutes === 0) dMinute = ""
    else if (minutes > 1) dMinute += "s, "
    else minutes += ", "
    if (seconds == 0) dSecond = 0 
    else if (seconds > 1) dSecond += "s"
      
   const duration = moment.duration(client.uptime).format(" D [day], H [hours], m [minute], s [second]");
    let botembed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setThumbnail(client.user.displayAvatarURL())
    .addField('Ram Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField('Uptime', `:watch: **Bot's Uptime is:** ${dDay+dHour+dMinute+dSecond}`, true)
    .addField("Servers", `🛡 ${client.guilds.cache.size}`, true)
    .addField("Channels", `📁 ${client.channels.cache.size}`, true)
    .addField("Servers left till verified: ", `75` - `${client.guilds.cache.size}`, true )
    .addField("Users",client.users.cache.size, true)
    .addField("Created On", client.user.createdAt)
    .setFooter(`Made by KeemROH`)
 
    message.channel.send(botembed);
    }
}