const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require("discord.js");
const fs = require("fs");

// ⚠️ À REMPLACER PLUS BAS
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

function getScripts(game) {
  const data = JSON.parse(fs.readFileSync("./scripts.json", "utf8"));
  return data[game.toLowerCase()] || null;
}

const commands = [
  new SlashCommandBuilder()
    .setName("script")
    .setDescription("Donne des scripts Roblox")
    .addStringOption(option =>
      option.setName("jeu")
        .setDescription("Nom du jeu")
        .setRequired(true)
    )
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  await rest.put(
    Routes.applicationCommands(CLIENT_ID),
    { body: commands }
  );
})();

client.on("ready", () => {
  console.log("Bot connecté :", client.user.tag);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "script") {
    const game = interaction.options.getString("jeu");
    const scripts = getScripts(game);

    if (!scripts) {
      return interaction.reply("Aucun script trouvé.");
    }

    return interaction.reply(
      "Scripts pour " + game + ":\n\n" +
      scripts.map(s => "• " + s).join("\n")
    );
  }
});

client.login(TOKEN);