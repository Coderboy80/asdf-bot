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
  const interactionMember = interaction.member;

  const lowerNumber = interaction.options.getInteger("lower-number");
  const higherNumber = interaction.options.getInteger("higher-number");

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "avatar") {
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
  } else if (commandName === "roll") {
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
  }
});

client.login(token);
