const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "help",
  async execute(client, message, args, db) {
    
   var helpembed = new Discord.MessageEmbed()
   .setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
   .setDescription("React to see the commands for that category!")
   .addField("Categories:", ":one: = **Bot Administrator Commands**\n:two: = **Server Administrator Commands**\n:three: = **Economy Commands**\n:four: = **User Commands**\n:five: = **NSFW Commands**\n:six: = **Music Commands**\n:seven: = **Fun Commands**")
    .setFooter("Please wait until all of the reactions appear to select help!")
    
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"];
    const sent_message = await message.channel.send(helpembed);
    for (const emoji of emojis) {
      await sent_message.react(emoji);
    }

    const filter = (reaction, user) => {
      return (
        emojis.includes(reaction.emoji.name) && user.id === message.author.id
      );
    };
    
    var help1embed = new Discord.MessageEmbed()
.setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
.setDescription("Commands :  These are all of the Bot Admin commands for Land of Lust, enjoy!")
.addField(":crown:Bot Administrator Commands :crown:", "l!addcoins [@user] [amount] - Give a user an amount of coins!\nl!removecoins [@user] [amount] - Take away a users coins!\nl!premium [@user] - Gives a member premium status!\nl!blacklist [@user] - Ban a user from using the bot!\nl!unblacklist [@user] - Remove a ban from a blacklisted user!\nl!eval - Evaluate javascript code!\nl!addpromo [code] - Create a promo code!\nl!removepromo [code] - Delete an existing promocode!")
        .setColor(config.embed.color) // Sets the color of the embed
        .setFooter("Made by KeemROH | Show some support by adding me!") // Sets the footer of the embed
        .setTimestamp();
    //helper
    var help2embed = new Discord.MessageEmbed()
.setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
.setDescription("Commands :  These are all of the Server Administrator commands for Land of Lust, enjoy!")
.addField("Server Administrator Commands:", "l!poll - Create a poll!\n")
        .setColor(config.embed.color) // Sets the color of the embed
        .setFooter("Made by KeemROH | Show some support by adding me!") // Sets the footer of the embed
        .setTimestamp();
    //helper
    var help3embed = new Discord.MessageEmbed()
.setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
.setDescription("Commands :  These are all of the economy commands for Land of Lust, enjoy!")
.addField("Economy :money_with_wings:", "l!class [class] - Select a job to start earning coins! ***__THESE ARE NSFW RUN AT OWN RISK__***\nl!work - Work to gain coins!\nl!bal [@user] - Show your balance!\nl!pay [@user] [amount] - Give someone your credits!\nl!resign - Resign from your current job!\nl!dep [amount] - Deposit your coins into your bank!\nl!with [amount] - Withdraw your coins from your bank!\nl!gamble [amount] - Test your luck and gamble your money!\nl!shop - View the shop for lootboxes and items!\nl!buy - buy an item from the shop!\nl!use - Use a lootbox!\nl!rob [@user] - Attempt to rob another user of their coins!\n")
        .setColor(config.embed.color) // Sets the color of the embed
        .setFooter("Made by KeemROH | Show some support by adding me!") // Sets the footer of the embed
        .setTimestamp();
    //helper
    var help4embed = new Discord.MessageEmbed()
.setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
.setDescription("Commands :  These are all of the User commands for Land of Lust, enjoy!")
.addField("User Commands :man:", "l!start - Register yourself in the database so you can begin using me!\nl!inventory - View all of your items!\nl!userinfo - Learn about another user!\nl!botinfo - See all of my statistics!\nl!votekick - Make a group decision to kick a user!\nl!invite - Add me to your server!\nl!promo [code] - Claim a promo code!\nl!say [message] - Send a message as me!\nl!qrcode [text]- Turn any text into a qr code!\nl!qrdecode - Decode any qr code!\n")
        .setColor(config.embed.color) // Sets the color of the embed
        .setFooter("Made by KeemROH | Show some support by adding me!") // Sets the footer of the embed
        .setTimestamp();
    //helper
    var help5embed = new Discord.MessageEmbed()
.setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
.setDescription("Commands :  These are all of the NSFW commands for Land of Lust, enjoy!")
.addField("NSFW Commands ;)", "l!hentai - Get a random hentai image!\nl!nekogif - Get a picture of the a lewd neko!\nl!cum - See some sexy cumsluts!\nl!wank - See some pussy play!\nl!rule34 [literally anything] - If it exists theres porn for it!\n ")
        .setColor(config.embed.color) // Sets the color of the embed
        .setFooter("Made by KeemROH | Show some support by adding me!") // Sets the footer of the embed
        .setTimestamp();
    //helper
    var help6embed = new Discord.MessageEmbed()
.setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
.setDescription("Commands :  These are all of the music commands for Land of Lust, enjoy!")
.addField("Music Commands :musical_note:", "l!loop - Toggle the music loop!\nl!pause - Pause the current song!\nl!play - Request a song to be played!\nl!playlist - Request a playlist to be played from YouTube!\nl!queue - Show the current queued songs!\nl!remove - Remove a song from the current queue!\nl!skip - Skip the currently playing song!\nl!shuffle - Mix up the current queue!\nl!stop - Cancel all of the music!\nl!volume - Change the current music volume!")
        .setColor(config.embed.color) // Sets the color of the embed
        .setFooter("Made by KeemROH | Show some support by adding me!") // Sets the footer of the embed
        .setTimestamp();
    //helper
    var help7embed = new Discord.MessageEmbed()
.setAuthor("" + message.author.username + "#" + message.author.discriminator,message.author.displayAvatarURL)
.setDescription("Commands :  These are all of the fun commands for Land of Lust, enjoy!")
.addField("Fun Commands :eye::eye:", "l!yomomma - Let me tell you a momma joke!\nl!pokemon - Find info about a pokemon!\nl!userphone - Contact users in other servers!\nl!supreme [any text] - Get that cool supreme text!\n")
        .setColor(config.embed.color) // Sets the color of the embed
        .setFooter("Made by KeemROH | Show some support by adding me!") // Sets the footer of the embed
        .setTimestamp();

    sent_message
      .awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] })
      .then(collected => {
        const reaction = collected.first();

        switch (reaction.emoji.name) {
    case "1️⃣":
        message.channel.send(help1embed).then(sent_message.delete());
        break;
    case "2️⃣":
        message.channel.send(help2embed).then(sent_message.delete());
        break;
    case "3️⃣":
        message.channel.send(help3embed).then(sent_message.delete());
        break;
    case "4️⃣":
        message.channel.send(help4embed).then(sent_message.delete());
        break;
    case "5️⃣":
        message.channel.send(help5embed).then(sent_message.delete());
        break;
    case "6️⃣":
        message.channel.send(help6embed).then(sent_message.delete());
        break;
    case "7️⃣":
        message.channel.send(help7embed).then(sent_message.delete());
        break;
}
      })
      .catch(collected => {
         message.reply(
          "You have timed out, you have not reacted with a number!"
        ).then(sent_message.delete());
//83948394839483948343847934839483948394839483948
      });
  }
};