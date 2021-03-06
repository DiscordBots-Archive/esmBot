const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const infoEmbed = new MessageEmbed()
    .setAuthor("esmBot Info/Credits", "https://cdn.discordapp.com/avatars/429305856241172480/49717613bd5c8302e59f615f5ef70fe5.png")
    .setColor(0xFF0000)
    .addField("📝 Credits:", "Bot by **Essem#9261**\n" +
      "Icon by **EyeballTheRuby#1391**")
    .addField("👪 Total Users:", client.users.size)
    .addField("💬 Total Servers:", client.guilds.size)
    .addField("✅ Official Server:", "https://discord.gg/jBxxkPZ")
    .addField("💻 Source Code:", "https://github.com/TheEssemCraft/esmBot");
  message.channel.send(infoEmbed);
};

exports.aliases = ["botinfo", "bot", "credits"];
