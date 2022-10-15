const { EmbedBuilder } = require("discord.js");

module.exports = {
  NAME: "host-quiz",
  slashRun: async (interaction) => {
    await interaction.reply("Quiz is being hosted...");
    const question = interaction.options.getString("question");
    const option1 = interaction.options.getString("option-1");
    const option2 = interaction.options.getString("option-2");
    let correctAnswer = interaction.options.getInteger("correct-answer");
    correctAnswer = correctAnswer === 1 ? option1 : option2;

    const collector = interaction.channel.createMessageCollector({
      time: 20000,
    });

    const messageEmbed = new EmbedBuilder()
      .setTitle(question)
      .setAuthor({
        name: "Quiz!",
      })
      .setThumbnail(interaction.user.displayAvatarURL())

      .addFields(
        { name: "Option 1", value: `**${option1}**` },
        { name: "Option 2", value: `**${option2}**` }
      )
      .setFooter({
        text: `Hosted by: ${interaction.member.displayName}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.channel.send({ embeds: [messageEmbed] });

    collector.on("collect", async (message) => {
      if (!message.guild === interaction.guild) return;
      if (!message.content.length == correctAnswer.length) return;
      if (message.content.toLowerCase() === correctAnswer.toLowerCase()) {
        await message.reply(
          `The first person to get the correct answer is: **${message.member.displayName}**`
        );
        collector.stop();
      }
    });

    collector.on("end", async () => {
      await interaction.channel.send(`Quiz ended!`);
    });
  },
};
