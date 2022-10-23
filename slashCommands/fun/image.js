const { EmbedBuilder, cleanCodeBlockContent } = require("discord.js");
const Jimp = require("jimp");

module.exports = {
  NAME: "image",
  slashRun: async (interaction) => {
    await interaction.reply("Image is being generated...");
    const attachment = interaction.options.getAttachment("picture");
    let action = interaction.options.getString("action");
    let value = interaction.options.getInteger("value");
    console.log(action);
    const image = Jimp.read(attachment.url);
    image.then((img) => {
      img[action](value);
      const embed = new EmbedBuilder()
        .setTitle(attachment.name)
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
