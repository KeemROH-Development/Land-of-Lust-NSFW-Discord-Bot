const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports = {
    name: 'qrdecode',
    async execute(client, message, args){
      const userAvatar = (message.author.displayAvatarURL({
         dynamic: true,
         format: "png"
      }));

      if (message.attachments.size === 0) {
         return message.channel.send("You did not send a QR code.");
      }

      const attachment_URL = message.attachments.array()[0].url;
      const encoded_URL = encodeURIComponent(attachment_URL);
      const QR_URL = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${encoded_URL}&outputformat=json`;

      await fetch(QR_URL)
         .then(response => response.json())
         .then(json => {
            if (json[0].symbol[0].data === null){
               return message.reply("I don't recognize that as a QR code")
            }

            if (json[0].symbol[0].data.length >= 1024) {
               return message.reply("That's too much text for me to send.")
            }

            const QRDecodeEmbed = new Discord.MessageEmbed()
               .addFields({
                  name: '**Results:**',
                  value: `${json[0].symbol[0].data}`
               }, )
               .setColor('#7289DA')
               .setThumbnail(attachment_URL)
               .setTimestamp()
               .setFooter(message.author.tag, userAvatar)

            message.channel.send(QRDecodeEmbed);
         });

    }
}