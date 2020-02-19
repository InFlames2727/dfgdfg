const Discord = require('discord.js');

exports.run = function(client, message) {
  var role = message.guild.roles.find(role => role.name === "Doğrulanmış");
  var rol = message.guild.roles.find(rol => rol.name === "Doğrulanmamış");
  message.member.removeRole(rol);
  message.member.addRole(role);
  message.channel.send(`**${message.author.username} kullanıcısının kaydı yaptırıldı.**`);
  message.channel.bulkDelete(2);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit', 'kaydol'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt',
  description: 'Kayıt Sistemi',
  usage: 'kayıt'
};