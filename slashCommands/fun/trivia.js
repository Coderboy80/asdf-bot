module.exports = {
  NAME: "trivia",
  slashRun: async (interaction) => {
    async function getResponse() {
      await interaction.reply("Sending a question...");
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&type=multiple`
      );

      const data = await response.json();
      const result = data.results[0];
      let question = result.question;
      question = question.replace("&#039;s", "'");
      question = question.replace("&quot;", `"`);
      const correctAnswer = result.correct_answer;
      const incorrectAnswers = result.incorrect_answers;
      const answers = [correctAnswer, ...incorrectAnswers];

      const collector = interaction.channel.createMessageCollector({
        time: 20000,
      });

      await interaction.channel.send(question);

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
        await interaction.channel.send(
          `Quiz ended! The answer was **${correctAnswer}**.`
        );
      });
    }

    getResponse();
  },
};
