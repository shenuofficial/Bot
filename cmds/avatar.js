const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    if (args.join(" ") == "") {
        message.reply("You need mention a user for this command! /avatar @USER");
        return;
    } else {
        let user = message.mentions.users.first();
        let image = user.displayAvatarURL;
        let embed = new Discord.RichEmbed()
            .setAuthor(`${user.username}#${user.discriminator}`)
            .setColor("#FFA500")
            .setImage(image)
        message.channel.send(embed);
    }
}

module.exports.help = {
	name: "avatar"
}