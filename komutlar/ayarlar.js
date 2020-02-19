const db = require("quick.db")
const Discord = require("discord.js")

exports.run = async (client, message, args, member) => {
let kufurfiltre = await db.fetch(`kufur_${message.guild.id}`)
let küfür;
    if (kufurfiltre == null) küfür = `${process.env.basarisiz}`
    if (kufurfiltre == 'Açık') küfür = `${process.env.basarili}`
    if (kufurfiltre == 'Kapalı') küfür = `${process.env.basarisiz}`
    let reklamcık = await db.fetch(`reklam_message.guild.id}`)
    let reklam;
  if (reklamcık == null) reklam = `${process.env.basarisiz}`
  if (reklamcık == 'Açık') reklam = `${process.env.basarilk}`
  if (reklamcık == 'Kapalı') reklam = `${process.env.basarisiz}`
const embed = new Discord.RichEmbed()
  .setTitle(`${message.guild.name} adlı sunucunun ayarları:`)
.addField('Küfür Engelleme', `${küfür}`)
.addField('Reklam Engelleme', `${reklam}`)
.setColor(0xff7c00)
message.channel.send(embed)
};






exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ayarlar',
  description: 'engel',
  usage: 'küfürengel'
}; 