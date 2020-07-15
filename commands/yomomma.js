const yoMamma = require("yo-mamma").default;

module.exports = {
  name: "yomomma",
  execute(client, message, args, db) {
    let insult = yoMamma();

    message.channel.send(insult);
  }
};
