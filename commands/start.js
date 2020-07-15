const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "start",
  execute(client, message, args, db) {
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
        let member = message.mentions.members.first();
        if (!member) {
          db.collection("Userinfo")
            .doc(message.author.id)
            .get()
            .then(q => {
              if (!q.exists) {
                db.collection("Userinfo")
                  .doc(message.author.id)
                  .set({
                    Name: message.author.username,
                    coins: 0,
                    bank: 1000,
                    daily: 69,
                    badges: "",
                    premium: false,
                    class: "slut",
                    nlootbox: 0,
                    elootbox: 0,
                    mlootbox: 0,
                    llootbox: 0,
                    staff: false,
                    mana: 0,
                    bow: false,
                    arrow: 0
                  })
                  .then(() => {
                    message.channel.send(
                      "Welcome to the Land of Lust you can begin my picking a class from `l!class` or to see all of the commands do `l!help`"
                    );
                  });
              }
              if (q.exists) {
                message.channel.send(
                  " You Account is already registered on our database"
                );
              }
            });
        }
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
                    bank: 1000,
                    daily: 69,
                    badges: "",
                    premium: false,
                    class: "slut",
                    nlootbox: 0,
                    elootbox: 0,
                    mlootbox: 0,
                    llootbox: 0,
                    staff: false,
                    mana: 0,
                    bow: false,
                    arrow: 0
                    
                  })
                  .then(() => {
                    message.channel.send(
                      ` ${member.user.tag}\`s account has been registered in our database`
                    );
                  });
              }
              if (q.exists) {
                message.channel.send(
                  `${member.user.tag}\`s Account is already registered on our database`
                );
              }
            });
        }
      });
  }
};