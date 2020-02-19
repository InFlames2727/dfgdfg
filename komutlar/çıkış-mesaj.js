const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
     if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.')
let mesajcık = args.slice(0).join(' ')
const embed = new Discord.RichEmbed()
.setDescription('Sunucu İsmi: **{sunucuisim}** \nKullanıcı: **{üye}** Yazarak Ayarlayabilirsiniz.')
.setThumbnail(message.author.avatarURL)
.setColor("RANDOM")
if (!mesajcık) return message.channel.send(embed)
  message.channel.send(`${process.env.basarili} Çıkış Mesajı ${mesajcık} olarak ayarlandı`)
  db.set(`mesajçıkış_${message.guild.id}`, mesajcık)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'çıkış-mesaj',
  description: 'engel',
  usage: 'küfürengel'
}; 