const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const feedbackEmbed = new MessageEmbed()
    .setAuthor("esmBot Feedback", "https://cdn.discordapp.com/avatars/429305856241172480/49717613bd5c8302e59f615f5ef70fe5.png")
    .setColor(0xFF0000)
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
    .addField("👥 Author:", message.author.tag)
    .addField("👪 Server:", message.guild.name)
    .addField("💬 Message:", args.join(" "));
  const feedbackChannel = client.guilds.get("433601545855172609").channels.get("446370545274191881");
  feedbackChannel.send(feedbackEmbed);
};
