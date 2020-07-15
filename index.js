const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const firebase = require("firebase/app");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const config = require("./config.json");
const http = require("http");
const express = require("express");
const app = express();
const xp = require('./xp.json')
let prefix = "l!"
client.prefix = prefix
var server = require("http").createServer(app);


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 140000);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const db = admin.firestore();
//console log
client.on("ready", async () => {
   client.user.setActivity(`l!help | http://landoflust.ga/`, {
    type: "STREAMING",
    url: "https://www.twitch.tv/example-url"
  });
  console.log("Ready to go!!");
  console.log(` logged in as ${client.user.tag}`);
});
const reptime = (
client.commands = new Discord.Collection());

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.substring(config.prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  const command_function = client.commands.get(command);
  
  if (command_function !== undefined) {
    command_function.execute(client, message, args, db);
  }
})
client.on('message', async msg => {
if(msg.author.bot) return;
 const addXp = Math.floor(Math.random()* 14)
 if(!xp[msg.author.id]){
   xp[msg.author.id] = {
     'xp':0,
     'level':1,
     'totalXp':0
   }
 }
  xp[msg.author.id].xp  = xp[msg.author.id].xp + addXp;
  xp[msg.author.id].totalXp = xp[msg.author.id].xp
  let level = xp[msg.author.id].level *40
  if(xp[msg.author.id].xp >= level){
    xp[msg.author.id].xp = 0;
    xp[msg.author.id].level++;
    msg.channel.send(new Discord.MessageEmbed() .setTitle('Level up!')
                        .setDescription(`Congratz! ${msg.author.username} you have leveled up to level ${xp[msg.author.id].level}`))
  }
  fs.writeFile("./xp.json",JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  })
  
})
const { readdirSync } = require("fs");
const { join } = require("path");
client.command = new Discord.Collection();
client.queue = new Map();


fs.readdir("./event", (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./event/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

/**
 * Client Events
 */
client.on("warn", info => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFile = readdirSync(join(__dirname, "music")).filter(file => file.endsWith(".js"));
for (const file of commandFile) {
  const command = require(join(__dirname, "music", `${file}`));
  client.command.set(command.name, command);
}

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.command.has(command)) return;

    try {
      client.command.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing that command.").catch(console.error);
    }
  }
});




client.login(config.token);