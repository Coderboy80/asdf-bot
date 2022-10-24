const { client } = require("../index.js");

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const commandName = interaction.commandName;

  const cmd = client.slashCmds.get(commandName);
  if (!cmd) return;

  try {
    cmd["slashRun"](interaction);
  } catch (e) {
    console.log(e);
  }
});
