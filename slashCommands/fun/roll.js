module.exports = {
  NAME: "roll",
  slashRun: async (interaction) => {
    const lowerNumber = interaction.options.getInteger("lower-number");
    const higherNumber = interaction.options.getInteger("higher-number");
    if (lowerNumber > higherNumber) {
      await interaction.reply(
        "Retry. Lower number cannot be more than higher number."
      );
    } else {
      const randomNumber =
        Math.floor(Math.random() * (higherNumber - lowerNumber + 1)) +
        lowerNumber;
      await interaction.reply(`Your random number is ${randomNumber}.`);
    }
  },
};
