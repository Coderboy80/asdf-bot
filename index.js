const {
  Client,
  GatewayIntentBits,
  Embed,
  DiscordAPIError,
  EmbedBuilder,
} = require("discord.js");

const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", function () {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  const replyUser = interaction.options.getUser("username");

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "avatar") {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(replyUser.username)
          .setImage(
            interaction.options
              .getUser("username")
              .displayAvatarURL({ size: 128, dynamic: true })
              .replace(".webp", ".png")
          ),
      ],
    });
  }
});

client.login(token);
