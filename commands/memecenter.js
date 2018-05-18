const request = require("request");
const tempy = require("tempy");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  const memecenterOutput = tempy.file({extension: "png"});
  message.channel.startTyping();
  const memecenterWatermark = "./assets/images/memecenterwatermark.png";
  gm(request(image)).size({ bufferStream: true }, (error, size) => {
    if (error) throw new Error(error);
    const originalWidth = size.width;
    gm(request(image)).out(memecenterWatermark).background("#FFFFFF").gravity("East").out("-smush").out("-9").strip().write(memecenterOutput, (error) => {
      if (error) throw new Error(error);
      gm(memecenterOutput).size({ bufferStream: true }, (error, size) => {
        if (error) throw new Error(error);
        const memecenterWidth = size.width;
        if (originalWidth !== memecenterWidth) {
          const cropWidth = memecenterWidth - originalWidth;
          gm(memecenterOutput).gravity("West").chop(cropWidth, 0).strip().stream((error, stdoutFixed) => {
            if (error) throw new Error(error);
            message.channel.stopTyping();
            message.channel.send({
              files: [{
                attachment: stdoutFixed,
                name: "memecenter.png"
              }]
            });
          });
        } else {
          message.channel.stopTyping();
          message.channel.send({
            files: [{
              attachment: memecenterOutput,
              name: "memecenter.png"
            }]
          });
        }
      });
    });
  });
};
