const {
  Client,
  GatewayIntentBits,
  DiscordAPIError,
  Collection,
} = require("discord.js");
const fs = require("fs");
const { token } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.slashCmds = new Collection();

module.exports = { client };

function events() {
  const dirs = fs.readdirSync("./events");

  dirs.forEach((dir) => {
    require(`./events/${dir}`);
  });
}

function slash() {
  const dirs = fs.readdirSync("./slashCommands");

  let files = fs.readdirSync(`./slashCommands/${dirs}`);

  files.forEach((file) => {
    let command = require(`./slashCommands/${dirs}/${file}`);
    client.slashCmds.set(command.NAME, command);
  });
}

events();

slash();

client.login(token);
