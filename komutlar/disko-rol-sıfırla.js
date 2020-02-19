const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Olamaz! `Rolleri Yönet` yetkin yok!')
    db.set(`discorol_${message.guild.id}`, 'Disco')
  db.set(`discoid_${message.guild.id}`, 'Disco')
  message.channel.send('Başarıyla sıfırlandı!')
  
   }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'disko-rol-sıfırla',
  description: 'rolinfo | Rol hakkında bilgi verir.',
  usage: 'rolinfo <rolismi>'
};