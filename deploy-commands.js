const { REST, SlashCommandBuilder, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Replies with avatar")
    .addUserOption((option) =>
      option
        .setName("username")
        .setDescription("Enter whose avatar you want to see!")
        .setRequired(false)
    ),
  new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Returns a random number between the given numbers!")
    .addIntegerOption((option) =>
      option
        .setName("lower-number")
        .setDescription("Enter the lower number!")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("higher-number")
        .setDescription("Enter the higher number!")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("host-quiz")
    .setDescription("Host  a quiz!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Enter the question.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("option-1")
        .setDescription("Enter the first option")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("option-2")
        .setDescription("Enter the second option")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("correct-answer")
        .setDescription("Enter the correct answer")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
