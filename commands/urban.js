const urban = require("urban-dictionary");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  if (args.length === 0) {
    urban.random((error, entry) => {
      if (error) throw new Error(error);
      const urbanEmbed = new MessageEmbed()
        .setTitle(`${entry.word} submitted by ${entry.author}`)
        .setColor(0xFF0000)
        .addField("Definition", entry.definition)
        .addField("Example(s)", entry.example)
        .addField("Link", entry.permalink)
        .addField("Votes", `👍${entry.thumbs_up} | 👎${entry.thumbs_down}`);
      message.channel.stopTyping();
      message.channel.send(urbanEmbed);
    });
  } else {
    urban.term(args[0], (error, entries) => {
      if (error) throw new Error(error);
      const urbanEmbed = new MessageEmbed()
        .setTitle(`${entries[0].word} submitted by ${entries[0].author}`)
        .setColor(0xFF0000)
        .addField("Definition", entries[0].definition)
        .addField("Example(s)", entries[0].example)
        .addField("Link", entries[0].permalink)
        .addField("Votes", `👍${entries[0].thumbs_up} | 👎${entries[0].thumbs_down}`);
      message.channel.stopTyping();
      message.channel.send(urbanEmbed);
    });
  }
};
