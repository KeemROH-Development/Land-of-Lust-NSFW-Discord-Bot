const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "class",
  execute(client, message, args, db) {
    db.collection("Userinfo")
      .doc(message.author.id)
      .get()
      .then(q => {
        if (!q.exists) {
          return message.channel.send(
            "Register in our database with `lol start` before using this command "
          );
        }
        if (q.exists) {
          let blacklist;
          let work;
          let coin;
          let premium;
          db.collection("Userinfo")
            .doc(message.author.id)
            .get()
            .then(q => {
              if (q.exists) {
                blacklist = q.data().blacklist;
                work = q.data().class;
                coin = q.data().coins;
                premium = q.data().premium;
              }
              if (!blacklist) blacklist = false;
              if (!work) work = null;
              if (!coin) coin = 0;
              if (!premium) premium = false;
              if (blacklist == true)
                return message.channel.send("You're blacklisted");
              if (!message.content.startsWith(config.prefix)) return;
              let arg = message.content.split(" ").slice(1);
              let njob = arg.join(" ");
              njob = njob.toLowerCase();
              if (arg.length == 0)
                return message.channel.send(
                  new Discord.MessageEmbed()
                    .setTitle("Classes")
                    .setColor("#49d5ff")
                    .addField("Slut", "Known for her natural sexiness, she can turn herself on for a quick boost, and also seduce enemies easier.")
                    .addField("Stallion", "A tall man with a muscular build, his main plan of attack is to ram his giant cock into anything in his path.")
                    .addField("Furry", "Though it's hard to tell exactly what animal this is, it's very obvious how submissive they are, but maybe that's it's plan?")
                    .addField("Succubus", "A demon who's specialty is turning the lustful desires of her foes against them, while also resisting their temptations.")
                    .addField("Rider", "As the name suggests, they are natural rodeo stars, capable of taming any cock/tentacle/extrusion they come across.")
                    .addField("Pansexual", "Premium members only")
                );
              if (njob === "slut") {
                if (work !== null)
                  return message.channel.send(
                    "You need to resign before you pick another class!"
                  );
                db.collection("Userinfo")
                  .doc(message.author.id)
                  .update({
                    class: "slut"
                  })
                  .then(() => {
                    message.channel.send(
                      "Congratulations you have joined the class **SLUT**!"
                    );
                  });
              }
              if (njob == "stallion") {
                if (work !== null)
                  return message.channel.send(
                    "You need to resign before you pick another class!"
                  );
                if (coin < 0)
                  return message.channel.send(
                    "You are too broke to join this work force"
                  );
                db.collection("Userinfo")
                  .doc(message.author.id)
                  .update({
                    class: "stallion",
                    coins: coin - 0
                  })
                  .then(() => {
                    message.channel.send(
                      "Congratulations you have joined the class **STALLION**!"
                    );
                  });
              }
              if (njob == "furry") {
                if (work !== null)
                  return message.channel.send(
                    "You need to resign before you pick another class!"
                  );
                if (coin < 0)
                  return message.channel.send("You are too broke to be a VIP");
                db.collection("Userinfo")
                  .doc(message.author.id)
                  .update({
                    class: "furry",
                    coins: coin - 0
                  })
                  .then(() => {
                    message.channel.send("Congratulations you have joined the class **FURRY**!");
                  });
              }
              if (njob == "succubus") {
                if (work !== null)
                  return message.channel.send(
                    "You need to resign before you pick another class!"
                  );
                if (coin < 0)
                  return message.channel.send(
                    "You are too broke to be the President of this company"
                  );
                db.collection("Userinfo")
                  .doc(message.author.id)
                  .update({
                    class: "succubus",
                    coins: coin - 0
                  })
                  .then(() => {
                    message.channel.send(
                      "Congratulations you are promoted to **SUCCUBUS**!"
                    );
                  });
              }
              if (njob == "rider") {
                if (work !== null)
                  return message.channel.send(
                    "You need to resign before you pick another class!"
                  );
                if (coin < 0)
                  return message.channel.send(
                    "You are too broke to be the CEO of this company"
                  );
                db.collection("Userinfo")
                  .doc(message.author.id)
                  .update({
                    class: "rider",
                    coins: coin - 0
                  })
                  .then(() => {
                    message.channel.send(
                      "Congratulations you have joined the class **RIDER**!"
                    );
                  });
              }
              if (njob == "pansexual") {
                if (work !== null)
                  return message.channel.send(
                    "You need to resign before you pick another class!"
                  );
                if (premium == false)
                  return message.channel.send(
                    "You have to be a premium member to pick this class!"
                  );
                db.collection("Userinfo")
                  .doc(message.author.id)
                  .update({
                    class: "pansexual"
                  })
                  .then(() => {
                    message.channel.send(
                      "Congratulations you have joined the class **PANSEXUAL**!"
                    );
                  });
              }
            });
        }
      });
  }
};