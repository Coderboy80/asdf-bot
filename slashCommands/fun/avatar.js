const { EmbedBuilder } = require("discord.js");

module.exports = {
  NAME: "avatar",
  slashRun: async (interaction) => {
    const replyUser = interaction.options.getUser("username");
    const interactionMember = interaction.member;
    if (replyUser === null) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(interactionMember.displayName)
            .setImage(
              interactionMember
                .displayAvatarURL({ size: 1024, dynamic: true })
                .replace(".webp", ".png")
            ),
        ],
      });
    } else {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(replyUser.username)
            .setImage(
              replyUser
                .displayAvatarURL({ size: 1024, dynamic: true })
                .replace(".webp", ".png")
            ),
        ],
      });
    }
  },
};
