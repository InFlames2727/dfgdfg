const Discord = require('discord.js');

exports.run = (client, message, args) => {
  var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? ("RANDOM") : (Durum == "offline" ? ("RANDOM") : (Durum == "idle" ? ("RANDOM") : (Durum == "dnd" ? ("RANDOM") : ("RANDOM")))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor.")))))
        const kimlik = new Discord.RichEmbed()
        .setColor(0x36393F)
        .setThumbnail(message.author.avatarUrl)
        .setDescription(`Vegas Bot Vatandaş Bilgileri \n\n**Kullanıcı Adı**: ${message.author.username} \n**Botmu**: ${ message.author.bot ? '\n ✔️' : '❌'} \n **Discrim**: ${message.author.discriminator} \n **İDsi**: ${message.author.id} \n **Durumu**: ${durm}  \n\nVegas Bot Vatandaş Sunucu Bilgileri \n\n**Sunucu İsmi**: ${message.guild.name} \n**Sunucu İsmi Kısaltması**: ${message.guild.nameAcronym}  \n**Sunucu Sahibi**: ${ message.guild.owner} \n**Sunucu Doğrulam Seviyesi**: ${message.guild.verificationLevel} \n**Sunucudaki Varsayılan Rol**: ${message.guild.defaultRole} \n**Sunucudaki Emoji Sayısı**: ${message.guild.emojis.size} \n**Sunucudaki Rol Sayısı**: ${message.guild.roles.size - 1} \n**Sunucu Bölgesi**: ${message.guild.region} \n\nEmojiler ve Roller \n\n**Emojiler**: ${message.guild.emojis.map(emoji => emoji).join(' | ')} \n\n**Roller**: ${message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join(' | ')}`)
        .setFooter('Vegas Bot', 'https://cdn.discordapp.com/attachments/508573970275237888/510782011221475358/GLITCH_20181027133528.jpg')
        return message.channel.sendEmbed(kimlik)
      }
 

;

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kimlik',
  description: '',
  usage: 'kimlik'
}; 
