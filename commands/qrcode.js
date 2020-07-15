const Discord = require("discord.js");
module.exports = {
  name: "qrcode",
  async execute(client, message, args) {
if (!args[0]) return message.reply("You did not specify what you want the QR code to say.")
      const userAvatar = (message.author.displayAvatarURL({
         dynamic: true,
         format: "png"
      }));
      const argsresult = encodeURIComponent(args.join(" "));

      const QRcode_embed = new Discord.MessageEmbed()
         .setTitle("Your QR code:")
         .addFields({
            name: 'You entered:',
            value: `${args.join(" ")}`
         }, {
            name: 'Download',
            value: `[Click here](http://api.qrserver.com/v1/create-qr-code/?data=${argsresult}&margin=30)`
         }, )
         .setColor('#7289DA')
         .setThumbnail(`http://api.qrserver.com/v1/create-qr-code/?data=${argsresult}&size=1000x1000&margin=30`)
         .setTimestamp()
         .setFooter(message.author.tag, userAvatar)

      message.channel.send(QRcode_embed);
  
} 
}