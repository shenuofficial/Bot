module.exports.run = async (bot, message, args) => {
	let msg = await message.channel.send("Generating server avatar...");

	if(!message.guild.iconURL) return msg.edit("No server avatar");

	await message.channel.send({files: [
		{
			attachment: message.guild.iconURL,
			name: "server_avatar.png"
		}
	]});

	msg.delete();
}

module.exports.help = {
	name: "icon"
}