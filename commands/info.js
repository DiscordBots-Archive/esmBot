const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const infoEmbed = new MessageEmbed()
    .setAuthor("esmBot Info/Credits", "https://cdn.discordapp.com/avatars/429305856241172480/49717613bd5c8302e59f615f5ef70fe5.png")
    .setColor(0xFF0000)
    .addField("📝 Credits:", "Bot by **Essem#9261**\n" +
      "Icon by **EyeballTheRuby#1391**")
    .addField("👪 Total Users:", client.users.size)
    .addField("💬 Total Servers:", client.guilds.size)
    .addField("⚙️ APIs/Libraries:", "[Discord.js](https://discord.js.org)\n" +
      "[memegen.link](https://memegen.link/)\n" +
      "[base64.js](https://www.npmjs.com/package/js-base64)\n" +
      "[dotbeat](https://www.npmjs.com/package/dotbeat)\n" +
      "[gm](https://www.npmjs.com/package/gm)\n" +
      "[ShibeOnline](http://shibe.online/)" +
      "[The Cat API](https://thecatapi.com/)\n" +
      "[random.dog](https://random.dog/)\n" +
      "[catfact.ninja](https://catfact.ninja/)\n" +
      "[Numbers API](http://numbersapi.com/)\n" +
      "[xml2js](https://www.npmjs.com/package/xml2js)\n" +
      "[moment](https://www.npmjs.com/package/moment)\n" +
      "[qrcode](https://www.npmjs.com/package/qrcode)" +
      "[goQR](http://goqr.me/)")
    .addField("✅ Official Server:", "https://discord.gg/jBxxkPZ")
    .addField("💻 Source Code:", "https://github.com/TheEssemCraft/esmBot");
  message.channel.send(infoEmbed);
};
