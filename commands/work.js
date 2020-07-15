const Discord = require("discord.js");
const config = require('../config.json');
const talkedRecently = new Set();
module.exports = {
  name: "work",
  execute(client, message, args, db) {
    let blacklist;
    let work;
    let coin;
    db.collection("Userinfo")
      .doc(message.author.id)
      .get()
      .then(q => {
        if (q.exists) {
          blacklist = q.data().blacklist;
          work = q.data().class;
          coin = q.data().coins;
        }
        if (!blacklist) blacklist = false;
        if (!work) work = null;
        if (!coin) coin = 0;
        if (blacklist == true)
          return message.channel.send("You're blacklisted");
      if(!message.content.startsWith(config.prefix)) return;
        if (work == null )
          return message.channel.send(
            "You must use `m!start` to register in the db OR `m!job` to pick a job after!"
          );
     else if (talkedRecently.has(message.author.id)) {
          message.channel.send(
            "You have already worked once in the last 20 minutes or you tried to work without a job, you must wait. <@" +
              message.author + ">"
          );
        } else {
          if (work === "slut") {
            db.collection("Userinfo")
              .doc(message.author.id)
              .update({
                coins: (coin += 1200)
              })
              .then(() => {
                message.channel.send(
                  "You've earned 1200 coins, make sure you deposit them into your bank with `l!dep`!"
                );
              });
          }
          if (work === "stallion") {
            db.collection("Userinfo")
              .doc(message.author.id)
              .update({
                coins: (coin += 1200)
              })
              .then(() => {
                message.channel.send(
                  "You've earned 1200 coins, make sure you deposit them into your bank with `l!dep`!"
                );
              });
          }
          if (work === "furry") {
            db.collection("Userinfo")
              .doc(message.author.id)
              .update({
                coins: (coin += 1200)
              })
              .then(() => {
                message.channel.send(
                  "You've earned 1200 coins, make sure you deposit them into your bank with `l!dep`!"
                );
              });
          }
          if (work === "succubus") {
            db.collection("Userinfo")
              .doc(message.author.id)
              .update({
                coins: (coin += 1200)
              })
              .then(() => {
                message.channel.send(
                  "You've earned 1200 coins, make sure you deposit them into your bank with `l!dep`!"
                );
              });
          }
          if (work === "rider") {
            db.collection("Userinfo")
              .doc(message.author.id)
              .update({
                coins: (coin += 1200)
              })
              .then(() => {
                message.channel.send(
                  "You've earned 1200 coins, make sure you deposit them into your bank with `l!dep`!"
                );
              });
          }
          if (work === "pansexual") {
            db.collection("Userinfo")
              .doc(message.author.id)
              .update({
                coins: (coin += 2400)
              })
              .then(() => {
                message.channel.send(
                  "You've earned 2400 coins, make sure you deposit them into your bank with `l!dep`!"
                );
              });
          }

          // the user can type the command ... your command code goes here :)

          // Adds the user to the set so that they can't talk for a minute
          talkedRecently.add(message.author.id);
          setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
          }, 1200000);
        }
      });
  }
};
