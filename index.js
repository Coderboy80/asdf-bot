const {
  Client,
  GatewayIntentBits,
  Embed,
  DiscordAPIError,
  EmbedBuilder,
} = require("discord.js");

const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  console.log(interaction.member.avatar);

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "user") {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Embed")
          .setImage(interaction.member.displayAvatarURL({ size: 1024 }))
          .setDescription(interaction.member.displayName),
      ],
    });
  }
});

client.login(token);
