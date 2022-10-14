const { client } = require("../index");

client.on("ready", () => {
  console.log(`
Bot loaded:
- Commands: ${client.slashCmds.size}
- Users: ${client.users.cache.size}
- Servers: ${client.guilds.cache.size}
    `);
});
