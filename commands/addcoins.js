  const Discord = require("discord.js");
const config = require("../config.json");
let array = [];
array = config.administrators;
module.exports = {
  name: "addcoins",
  execute(client, message, args, db) {
    db.collection("Userinfo")
      .doc(message.author.id)
      .get()
      .then(q => {
        if (!q.exists) {
          return message.channel.send(
            "You must be registered in the database to use this command."
          ); //which is this??
        }
        if (q.exists) {
          let member = message.mentions.members.first();
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
                return message.channel.send("You're blacklisted");
              if (!message.content.startsWith(config.prefix)) return;
              if (array.includes(message.author.id)) {
                if (!member) return message.channel.send("Provide a user");
                db.collection("Userinfo")
                  .doc(member.user.id)
                  .get()
                  .then(b => {
                    if (!b.exists) {
                      return message.channel.send(
                        "This user is not registered in our database"
                      );
                    }
                    if (b.exists) {
                      let coin;
                      db.collection("Userinfo")
                        .doc(message.author.id)
                        .get()
                        .then(m => {
                          if (m.exists) {
                            coin = m.data().coins;
                          }
                          if (!coin) coin = 0;
                          let arg = message.content.split(" ").slice(2);
                          let setc = parseInt(arg);
                          if (isNaN(arg))
                            return message.channel.send(
                              "Not a valid amount of coins"
                            );
                          db.collection("Userinfo")
                            .doc(member.user.id)
                            .update({
                              coins: (coin += setc)
                            })
                            .then(() => {
                              message.channel.send("Coins successfully added!"); //i got it
                            });
                        });
                    }
                  });
              } else {
                message.channel.send("Your not a bot admin");
              }
            });
        }
      });
  }
};
