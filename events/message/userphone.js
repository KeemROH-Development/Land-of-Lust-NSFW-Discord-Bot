module.exports = {
  async execute(Bot, message) {
    if (message.author.bot) return;

    if (!message.client.userphones) message.client.userphones = {};

    calls = message.client.userphones;

    keys = Object.keys(calls);

    if (keys.includes(message.channel.id)) {
      host = message.channel.id;
      receiver = calls[message.channel.id];
      if (
        receiver.toLowerCase() == "searching" ||
        receiver.toLowerCase() == "dead"
      )
        return;
      message.client.channels.cache
        .get(receiver)
        .send(`${message.author.tag} 📞 ${RemoveMention(message.content)}`);
    }

    for (key of keys) {
      if (calls[key] == message.channel.id) {
        host = key;
        receiver = message.channel.id;
        if (host.toLowerCase() == "searching" || host.toLowerCase() == "dead")
          return;
        message.client.channels.cache
          .get(host)
          .send(`${message.author.tag} 📞 ${RemoveMention(message.content)}`);
      }
    }
  }
};

function RemoveMention(msg) {
  var tmp = msg.split("");
  var result = "";
  tmp.map(letter => {
    if (letter !== "@") result = result + letter;
  });
  return result;
}
