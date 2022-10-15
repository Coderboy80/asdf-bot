module.exports = {
  NAME: "ping",
  slashRun: async (interaction) => {
    await interaction.reply("Pong!");
  },
};
