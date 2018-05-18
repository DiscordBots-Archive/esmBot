module.exports = (client) => {
  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      client.logger.log(`Loading Command: ${commandName}. 👌`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(commandName, props);
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    if (!commandName) return `The command \`${commandName}\` doesn"t seem to exist. Try again!`;

    if (commandName.shutdown) {
      await commandName.shutdown(client);
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  // <String>.toPropercase() returns a proper-cased string such as:
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // <String>.toFullWidth() returns a fullwidth string such as:
  // "Mary had a little lamb".toFullWidth() returns "Ｍａｒｙ ｈａｄ ａ ｌｉｔｔｌｅ ｌａｍｂ"
  String.prototype.toFullWidth = function() {
    return this.replace(/[A-Za-z0-9]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);});
  };

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  // `await client.wait(1000);` to "pause" for 1 second
  client.wait = require("util").promisify(setTimeout);

  // `message.channel.getImage();` to get the last uploaded image in a channel
  client.getImage = (message) => {
    // get list of messages in channel
    const messageList = message.channel.messages.sort(function(a, b) {
      return b.createdTimestamp - a.createdTimestamp;
    }).array();
    let attachmentFound = false;
    for (let i = 0; i < messageList.length; i++) {
      if (messageList[i].attachments.array().length !== 0) {
        const attachmentsList = messageList[i].attachments.array();
        const fileExtension = attachmentsList[0].file.name.split(".").slice(-1)[0].toLowerCase();
        // check if file is an image or not
        if (fileExtension !== "png" && fileExtension !== "jpg" && fileExtension !== "jpeg") {
          return;
        }
        attachmentFound = true;
        return attachmentsList[0].url;
      }
    }
    if (!attachmentFound) {
      return;
    }
  };

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
};
