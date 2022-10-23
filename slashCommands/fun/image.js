const { EmbedBuilder } = require("discord.js");
const Jimp = require("jimp");

module.exports = {
  NAME: "image",
  slashRun: async (interaction) => {
    await interaction.reply("Image is being generated...");
    const attachment = interaction.options.getAttachment("picture");
    let rotationAngle = interaction.options.getInteger("rotate");
    if (rotationAngle == null) rotationAngle = 90;
    const image = Jimp.read(attachment.url);
    image.then((img) => {
      img.rotate(rotationAngle);
      const embed = new EmbedBuilder()
        .setTitle("Image")
        .setImage("attachment://image.png");
      img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        interaction.editReply({
          embeds: [embed],
          files: [{ name: "image.png", attachment: buffer }],
        });
      });
    });
  },
};
