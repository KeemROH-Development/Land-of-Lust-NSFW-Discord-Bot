const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "inventory",
  execute(client, message, args, db) {
    db.collection("Userinfo")
      .doc(message.author.id)
      .get()
      .then(q => {
        if (!q.exists) {
          return message.channel.send(
            "register in our database with m!start before using this command "
          );
        }
        if (q.exists) {
          let blacklist;
          let coin;
          let bow;
          let arrow;
          
          let nlootbox;
          let elootbox;
          let mlootbox;
          let llootbox;
          let bank;
          let mana;
          let staff;

          db.collection("Userinfo")
            .doc(message.author.id)
            .get()
            .then(q => {
              if (q.exists) {
                blacklist = q.data().blacklist;
                coin = q.data().coins;
                bank = q.data().bank;
                bow = q.data().bow;
                pistol = q.data().pistol;
                staff = q.data().staff;
                arrow = q.data().arrow;
                mana = q.data().mana;
                nlootbox = q.data().nlootbox;
                elootbox = q.data().elootbox;
                mlootbox = q.data().mlootbox;
                llootbox = q.data().llootbox;
              }
              if (!blacklist) blacklist = false;
              if (blacklist == true)
                return message.channel.send("You're blacklisted");
              if (!message.content.startsWith(config.prefix)) return;
            const rif= {true : "Yes", false : "No"}
    
              let invembed = new Discord.MessageEmbed()
                .setTitle("Inventory")
                .addField(
                  "Inventory",
                   `**Wallet**: ${coin} Coins\n
                    **Bank Balance**: ${bank} Coins\n
                    **Bow**: ${rif[bow]}\n
                    **Staff**: ${rif[staff]}\n      
                    **Arrows**: ${arrow}\n
                    **MANA (Staff Ammo)**: ${mana}\n
                    **Normal Lootboxes**: ${nlootbox}\n
                    **Epic Lootboxes**:  ${elootbox}\n
                    **Mythic Lootboxes**:  ${mlootbox}\n
                    **Legendary Lootboxes**: ${llootbox}`
                )
                .setColor(config.embed.color)
                .setFooter(config.embed.footer);
              message.channel.send(invembed);
            });
        }
      });
  }
};
