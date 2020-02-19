const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + ' 💩💩 Offf ne sıçtın ve koktu koktu. 💩💩')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
		.setImage(`https://i.giphy.com/media/3o7bu2bOmUkvAsvA1G/giphy.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sıç',
  description: 'Sıçarsınız',
  usage: 'sıç'
};
