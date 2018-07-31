const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let helpembed = new Discord.RichEmbed()
	.setColor("#FFA500")
	.setDescription("📑Comamnds")
	.addField("› ❔Help", "List the commands")
	.addField("› 🌇Avatar", "Show avatar")
	.addField("› ⁉️Serverinfo", "Show server informations")
	.addField("› 🔰Level", "Show your level")
	.addField("› 🌆Icon", "It shows the avatar of the server")
	.addField("› 📝Userinfo", "Show informations for this user")
	.addField("› ☁️Weather", "It shows the weather in a certain place")

	let modembed = new Discord.RichEmbed()
	.setColor("#FFA500")
	.setDescription("📑Moderator Comamnds")
	.addField("› ⛔️Ban", "Ban a user")
	.addField("› ❌Kick", "Kick a user")
	.addField("› ✔️AddRole", "Add a role to a specific user")
	.addField("› ❌RemoveRole", "Remove a role to sepcific user")
	.addField("› 🗣Say", "You send a message with bot")
	.addField("› 🙅🏻‍Tempmute", "Silence a user")
	.addField("› 📄Clear", "Delete a certain amount of messages")
	


	await message.react("👍🏻")
	message.channel.send(helpembed);

		try{
			await message.author.send(modembed);
			await message.react("👍🏻")
		}catch(e){
		}
	}

module.exports.help = {
	name: "help"
}
