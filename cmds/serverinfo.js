const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Server Created • ${day}.${month}.${year}`)
   .setColor("#FFA500")
   .setThumbnail(sicon)
   .addField("› 📝Server Name", message.guild.name, true)
   .addField("› 👮🏻Server Owner", message.guild.owner.user.tag, true)
   .addField("› :flag_us: Server Region", message.guild.region, true)
   .addField("› 👥Members", message.guild.memberCount, true)
   .addField("› 👥Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("› 🤖Bots", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("› 👁‍🗨Online", online.size, true)
   message.channel.send(serverembed);

}
module.exports.help = {
  name: "serverinfo"
}