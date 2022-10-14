module.exports = {
  NAME: "ping",
  slashRun: async (interaction) => {
    const { commandName } = interaction;
    const replyUser = interaction.options.getUser("username");
    const interactionMember = interaction.member;
    await interaction.reply("Pong!");
  },
};
