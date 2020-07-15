const Discord = require("discord.js");
const { Canvas } = require("canvas-constructor");
const fetch = require("node-fetch")
const config = require('../config.json');
const rif= {true : "Yes", false : "No"}
const jobb= {undefined : "None"}
let array = []
array = config.administrators
module.exports = {
  name: "profile",
  execute (client, message, args, db){
    
    let admin
    let blacklist;
    db.collection("Userinfo")
      .doc(message.author.id)
      .get()
      .then(q => {
        if (q.exists) {
          blacklist = q.data().blacklist;
        }
        if (!blacklist) blacklist = false;
        if (blacklist == true)
          return message.channel.send(" you're blacklisted");
      if(!message.content.startsWith(config.prefix)) return;
      
      
        const member = message.mentions.members.first();
        if (!member) {
          let wcash;
          let bcash;
          let job;
          let premium;
          let badges;
          let bow;
          let mana;
          let staff;
          let arrow;
          
          db.collection("Userinfo")
            .doc(message.author.id)
            .get()
            .then(q => {
              if (q.exists) {
                wcash = q.data().coins;
                bcash = q.data().bank;
                job = q.data().class;
                premium = q.data().premium;
                badges = q.data().badges;
                arrow = q.data().arrow;
                mana = q.data().mana;
                bow = q.data().bow;
                staff = q.data().staff;
              }
              if (!wcash) wcash = 0;
              if (!bcash) bcash = 0;
           
                message.channel.send(
                new Discord.MessageEmbed()
                  .setTitle(`${message.author.username}\'s Profile`)
                  .setColor("GREEN")
                  .addField("**Wallet Balance :moneybag:**", `${wcash}`, true)
                  .addField("**Class :man_office_worker:**", `${job}`, true)
                  .addField("**Premium Status <>**", `${rif[premium]}`, true)
                  .addField("**Bank Balance :bank:**", `${bcash}`,true)
                  .addField("**Bot Admin**",`${array.includes(message.author.id)? "Yes" : "No" }`,true)
                  .addField("**Badges:**", ":smile: " + `${badges}`, true)
                  .addField("**Username :family:**", `${message.author.username}`, true)
                  .addField("**Bow**", `${rif[bow]}`, true)
                  .addField("**Staff**", `${rif[staff]}`, true)
                  .addField("**Arrows**", `${arrow}`, true)
                  .addField("**Mana (For Staffs) :battery:**", `${mana}`, true)
                  .setColor(config.embed.color)
              );
            });
        }
      // CANVAS \\
   /*   const picl = message.author.displayAvatarURL();
      const pic = fetch(picl).b
      
      const img = new Canvas(800, 500)
      .setColor("#FFFFFF")
      .addRect(0, 0, 1000, 1000)
      .setColor(config.embed.color)
      .addBeveledRect(0, 0, 800, 300, 20) 
      .addRoundImage(pic, 100, 100, 50)
      .toBuffer()
      
      const file = new Discord.MessageAttachment(img, "output.png")
      
      message.channel.send(file)
    */  
      
      
        if (member) {
          db.collection("Userinfo")
            .doc(member.user.id)
            .get()
            .then(q => {
              if (!q.exists) {
                db.collection("Userinfo")
                  .doc(member.user.id)
                  .set({
                    Name: message.author.username,
                    coins: 0,
                    bank: 0,
                    limit: 2000,
                    rep: 0,
                    premium: false,
                    job: null,
                    bank: 0
                  });
              }
            });
        }
      });
  }                                                                 
};
