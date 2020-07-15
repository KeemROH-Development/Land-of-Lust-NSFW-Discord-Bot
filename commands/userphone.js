module.exports = {
  name: 'userphone',
  async execute(Bot, message, args, db){
    
        Bot = message.client;
        if (!Bot.hasOwnProperty('userphones')) Bot.userphones = {}
        keys = Object.keys(Bot.userphones)
        if (Bot.userphones[message.guild.id] == "searching" || Bot.userphones[message.channel.id] == "dead") {
            message.channel.send("☎ - Searching...")
            Bot.userphones[message.channel.id] = "searching"
            return;
        }
        if (keys.includes(message.channel.id)) {
            if (keys[message.channel.id] == "dead") {
                message.channel.send("☎ - Searching...")
                Bot.userphones[message.channel.id] = "searching"
                return;
            }
            hangup(message)
            return;
        }

        for (key of keys) {
            if (Bot.userphones[key] == message.channel.id) {
                hangup(message)
                return;
            }
            if (Bot.userphones[key] == "searching") {
                Bot.userphones[key] = message.channel.id
                message.channel.send(`☎ - Connected. - Guild With ${Bot.channels.cache.get(key).guild.memberCount} Users!`)
                if (Bot.channels.cache.get(key)) Bot.channels.cache.get(key).send(`☎ - Connected. - Guild With ${message.guild.memberCount} Users!`)
                return;
            }
        }
        message.channel.send("☎ - Searching...")
        Bot.userphones[message.channel.id] = "searching"
        return;
    }

};

function hangup(message) {
    Bot = message.client;

    if (!Bot.hasOwnProperty('userphones')) Bot.userphones = {}


    Calls = Bot.userphones
    keys = Object.keys(Calls)

    if (keys.includes(message.channel.id)) {
        hungup(message, message.channel.id)
        Calls[message.channel.id] = "dead"
        return;
    }

    for (key of keys) {
        host1 = key
        host2 = Calls[key]

        if (host2 == message.channel.id) {

            hungup(message, host1)
            Calls[host1] = "dead"
            return;

        }


    }


}


function hungup(message, host) {

    var Calls = message.client.userphones
    var host1 = host
    var host2 = Calls[host]

    var Bot = message.client;

    if (Bot.channels.cache.get(host1)) Bot.channels.cache.get(host1).send("☎ - Hungup.")
    if (Bot.channels.cache.get(host2)) Bot.channels.cache.get(host2).send("☎ - Hungup.")

}