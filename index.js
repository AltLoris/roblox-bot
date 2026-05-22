const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ======================
// BASE DE DONNÉES SCRIPTS (plus besoin de scripts.json)
// ======================

const scriptsDB = {
    "blox fruits": { name: "Blox Fruits", type: "Keyless", script: "loadstring(game:HttpGet('TON_LIEN_ICI'))()" },
    "pet simulator 99": { name: "Pet Simulator 99", type: "Keyless", script: "loadstring(game:HttpGet('TON_LIEN_ICI'))()" },
    "brookhaven": { name: "Brookhaven RP", type: "Keyless", script: "-- Brookhaven Script" },
    "adopt me": { name: "Adopt Me", type: "Keyless", script: "-- Adopt Me Script" },
    "dress to impress": { name: "Dress to Impress", type: "Keyless", script: "-- DTI Script" },
    "the strongest battlegrounds": { name: "The Strongest Battlegrounds", type: "Keyless", script: "-- TSB Script" },
    "doors": { name: "Doors", type: "Keyless", script: "-- Doors Script" },
    "rivals": { name: "RIVALS", type: "Key", script: "-- Rivals Script" },
    "jujutsu shenanigans": { name: "Jujutsu Shenanigans", type: "Keyless", script: "-- JJS Script" },
    "murder mystery 2": { name: "Murder Mystery 2", type: "Keyless", script: "-- MM2 Script" },
    "arsenal": { name: "Arsenal", type: "Key", script: "-- Arsenal Script" }
};

// Recherche intelligente (majuscules, fautes, mots incomplets)
function findScript(searchTerm) {
    if (!searchTerm) return null;
    searchTerm = searchTerm.toLowerCase().trim();

    if (scriptsDB[searchTerm]) return scriptsDB[searchTerm];

    for (let key in scriptsDB) {
        if (key.includes(searchTerm) || scriptsDB[key].name.toLowerCase().includes(searchTerm)) {
            return scriptsDB[key];
        }
    }
    return null;
}

// ======================
// CRÉATION DES COMMANDES SLASH
// ======================
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
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log("Commandes slash enregistrées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des commandes :", error);
  }
})();

// ======================
// ÉVÉNEMENTS
// ======================
client.on('clientReady', () => {
    console.log(`Bot connecté : ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "script") {
    const searchTerm = interaction.options.getString("jeu");
    const result = findScript(searchTerm);

    if (result) {
      const embed = {
        color: 0x00ff00,
        title: `🎮 ${result.name}`,
        fields: [
          { name: "🔑 Type", value: result.type, inline: true },
          { name: "📜 Script", value: `\`\`\`lua\n${result.script}\n\`\`\`` }
        ],
        footer: { text: "⚠️ Utilise à tes risques et périls" }
      };
      return interaction.reply({ embeds: [embed] });
    } else {
      return interaction.reply({ 
        content: `❌ Aucun script trouvé pour **${searchTerm}**.\nEssaie : blox, pet, brook, dress, doors...`, 
        ephemeral: true 
      });
    }
  }
});

client.login(TOKEN);