const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');


exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(":no_entry: Bu komudu kullanabilmek için birini etiketlemelisin. `!atombombası @LUnderGround Bot#7450`")
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + ` ${user.username} Adlı Kullanıcıyı Atom Bombası İle Patlattı!`)
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
		.setImage(`https://cdn.discordapp.com/attachments/406050958486011904/427523595141382165/tenor.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['atom'],
  permLevel: 0
};

exports.help = {
  name: 'atombombası',
  description: 'Atom bombasi patlatirsiniz!',
  usage: 'atombombası'
};
