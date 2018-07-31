const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
let xp = require("./xp.json");
let cooldown = new Set();

const prefix = botSettings.prefix

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
	if(err) console.log(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("WONDERFORGE • PREFIX /", {type: "WATCHING"});
  bot.user.setStatus('dnd')

});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let xpAdd = Math.floor(Math.random() * 7) + 8;

	if(!xp[message.author.id]){
		xp[message.author.id] = {
			xp: 0,
			level: 1
		};
	}

	let curxp = xp[message.author.id].xp;
	let curlvl = xp[message.author.id].level;
	let nxtLvl = xp[message.author.id].level * 300;
	xp[message.author.id].xp = curxp + xpAdd;
	if(nxtLvl < xp[message.author.id].xp){
		xp[message.author.id].level = curlvl + 1;
		let lvlup = new Discord.RichEmbed()
		.setTitle("Level Up")
		.setColor("#FFA500")
		.addField("New Level", curlvl + 1);

		message.channel.send(lvlup).then
	   }
	   fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
		 if(err) console.log(err)
	});

bot.on('guildMemberAdd', member => {
  member.guild.channels.get("473792476646473734").setName(`👥 Total Members: ${member.guild.memberCount}`)

  member.guild.channels.get("473792610088255489").setName(`⭐ Goal: ${member.guild.memberCount}/100`)
});

bot.on('guildMemberRemove', member => {
  member.guild.channels.get("473792476646473734").setName(`👥 Total Members: ${member.guild.memberCount}`)

  member.guild.channels.get("473792610088255489").setName(`⭐ Goal: ${member.guild.memberCount}/100`)
});

bot.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "[👦🏻] - User");
    member.addRole(role).catch(console.error);
});

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  const ceva = ["https://", "http://", "www.", "discord.gg", ".gg", ".rip", ".me"];
  if(ceva.some(cuvant => message.content.includes(cuvant)) ) {
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.send(":no_entry: Reclama este interzisa" + message.author + ".");
   message.delete();
 }

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith(prefix)) return;

	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args);
});

bot.login(process.env.BOT_TOKEN);
