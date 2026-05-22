const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ======================
// BASE DE DONNÉES SCRIPTS
// ======================

const scriptsDB = {
    "blox fruits": { name: "Blox Fruits", type: "Key", script: `loadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/5946add9ab91f1e04cb005346a8b1968.lua"))()` },
    "pet simulator 99": { name: "Pet Simulator 99", type: "Key", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(Game:HttpGet("https://raw.githubusercontent.com/ahmadsgamer2/Zekrom-Hub-X/main/Zekrom-Hub-X-exe"))()` },
    "brookhaven": { name: "Brookhaven RP", type: "Keyless", script: `loadstring(game:HttpGet("https://raw.githubusercontent.com/EndOverdosing/Soluna-API/refs/heads/main/brookhaven.lua",true))()` },
    "adopt me": { name: "Adopt Me", type: "Key", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://pastefy.app/iPBDCdUY/raw"))()` },
    "doors": { name: "Doors", type: "Keyless", script: `getgenv().Config = {
    MinContainers = 10,
    MinCoins = 50,
    UseLockpick = false,
    UseRobuxKnobsBoost = false
}
loadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/6e87698669de88a8f81d6348ce368b73.lua"))()` },
    "the strongest battlegrounds": { name: "The Strongest Battlegrounds", type: "Key", script: `loadstring(game:HttpGet("https://moondiety.com/loader"))()` },
    "dress to impress": { name: "Dress to Impress", type: "Keyless", script: `loadstring(game:HttpGet('https://raw.githubusercontent.com/deposible/Open-Sourced-LUA/refs/heads/main/Scripts/Dress%20To%20Impress%20(15101393044).lua'))()` },
    "rivals": { name: "RIVALS", type: "Key", script: `loadstring(game:HttpGet("https://raw.githubusercontent.com/deposible/The-Bitcoin-Script/refs/heads/main/BiTeC.lua"))()` },
    "jujutsu shenanigans": { name: "Jujutsu Shenanigans", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/peeky-co/scripts/refs/heads/main/tbo"))()` },
    "murder mystery 2": { name: "Murder Mystery 2", type: "Key", script: `pcall(loadstring(game:HttpGet('https://raw.githubusercontent.com/zReal-King/Murder-Mystery-2/refs/heads/main/Main.lua')))` },
    "arsenal": { name: "Arsenal", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/silverclaus06-oss/Scriptz/refs/heads/main/load.main"))()` },
    "blade ball": { name: "Blade Ball", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://pastebin.com/raw/XNPG74aB"))()` },
    "tower of hell": { name: "Tower of Hell", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/dudeididntliterally/Backup_Repo/refs/heads/main/Tower_Of_Hell_Script_Hub.lua"))()` },
    "piggy": { name: "Piggy", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/morenoffproScriptsRoblox/zaxy-piggy-hub/refs/heads/main/README.md", true))()` },
    "fisch": { name: "Fisch", type: "Key", script: `loadstring(game:HttpGet("https://zenithhub.cloud/panel/script"))()` },
    "slime rng": { name: "Slime RNG", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://soloscripts.soloscripts.workers.dev/slime-rng"))()` },
    "bedwars": { name: "BedWars", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/KIN-Aurora/Aurora/refs/heads/main/Aurora_Loader"))()` },
    "phantom forces": { name: "Phantom Forces", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/ThaScripter9829/PhantomForcesScript/refs/heads/main/PhantomForcesScript.lua"))()` },
    "build a boat": { name: "Build A Boat", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/AmeloxRUS/wqeewqewq/refs/heads/main/ewewe"))()` },
    "anime defenders": { name: "Anime Defenders", type: "Key", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet(('https://pastefy.app/kJbAQg3x/raw'),true))()` },
    "sol's rng": { name: "Sol's RNG", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://pastebin.com/raw/AQnYcH3B"))()` },
    "king legacy": { name: "King Legacy", type: "Key", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/jmesscriptsontop/universally/refs/heads/main/popoo"))()` },
    "fruit battlegrounds": { name: "Fruit Battlegrounds", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/sharkindigo12/Fb/refs/heads/main/obfuscated_script-1764751450230.lua.txt"))()` },
    "pressure wash simulator": { name: "Pressure Wash Simulator", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
local Gun = require(game:GetService("ReplicatedFirst"):WaitForChild("Classes"):WaitForChild("GunBehaviour"))

Gun.DrawCircle = function(self, _, _, _, _, _, part, surface, pixelSize) {
    local surfaceSize = part.AbsoluteSizeCache[surface]
    local maxX = math.round(surfaceSize.X / pixelSize.X) - 1
    local maxY = math.round(surfaceSize.Y / pixelSize.Y) - 1
    for y = 0, maxY do
        for x = 0, maxX do
            self:CreateStroke(x, y, part, surface)
        end
    end
}

Gun.DrawRotatedRectangle = function(self, _, _, _, _, _, part, surface, pixelSize) {
    local surfaceSize = part.AbsoluteSizeCache[surface]
    local maxX = math.round(surfaceSize.X / pixelSize.X) - 1
    local maxY = math.round(surfaceSize.Y / pixelSize.Y) - 1
    for y = 0, maxY do
        for x = 0, maxX do
            self:CreateStroke(x, y, part, surface)
        end
    end
}` },
    "3008": { name: "3008", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/002c19202c9946e6047b0c6e0ad51f84.lua"))()` },
    "evade": { name: "Evade", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/KLUJISRBLX/evade_autofarm/refs/heads/main/main_lua"))()` },
    "the forge": { name: "The Forge", type: "Key", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://gist.githubusercontent.com/Kdksvdlajbdlabdkasmslqlwkja/f606482ccbc570331145f53dd55f6c14/raw"))()` },
    "kat": { name: "Knife Ability Test", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet('https://raw.githubusercontent.com/KattDevv/KattHub-Knife-Ability-Test/refs/heads/main/main.lua'))()` },
    "color or die": { name: "Color or Die", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/Biskus0/ColorOrDie/refs/heads/main/GetScript.lua", true))()` },
    "specter": { name: "Specter", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/kylosilly/astolfoware/refs/heads/main/specter%20auto%20farm%20loader%20slow.lua"))()` },
    "99 nights in the forest": { name: "99 Nights in the Forest", type: "Keyless", script: `--[[
	WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://raw.githubusercontent.com/wehibuyfgyuwe/99nights.github.io/refs/heads/main/ringta.lua"))()` }
};

// ======================
// RECHERCHE INTELLIGENTE
// ======================
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
// COMMANDS
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
    console.log("✅ Commandes slash enregistrées avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement des commandes :", error);
  }
})();

// ======================
// EVENTS
// ======================
client.once('ready', () => {
    console.log(`🤖 Bot connecté : ${client.user.tag}`);
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
        content: `❌ Aucun script trouvé pour **${searchTerm}**.`, 
        ephemeral: true 
      });
    }
  }
});

client.login(TOKEN);