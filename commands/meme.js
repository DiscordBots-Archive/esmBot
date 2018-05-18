const request = require("request").defaults({ encoding: null });

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  const [topText, bottomText] = args.join(" ").split(",").map(elem => elem.trim());
  message.channel.startTyping();
  // download the image
  if (bottomText !== undefined) {
    const memeOutput = request(`https://memegen.link/custom/${topText.split(" ").join("_")}/${bottomText.split(" ").join("_")}.jpg?alt=${image}&font=impact&watermark=none`);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: memeOutput,
        name: "meme.png"
      }]
    });
  } else {
    const memeOutput = request(`https://memegen.link/custom/${topText.split(" ").join("_")}.jpg?alt=${image}&font=impact&watermark=none`);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: memeOutput,
        name: "meme.png"
      }]
    });
  }
};
