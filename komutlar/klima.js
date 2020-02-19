const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let nesne = args.slice(0).join(' ');
      if (!nesne[0]) {
        const embed = new Discord.RichEmbed()
          .setDescription(`:x: | Klima açalımmı abi?`)
          .setColor(0x36393E)
          .setFooter(`Vegas - Tüm klimalar kapalıdır.`, client.user.avatarURL)
        return message.channel.send(embed);
    }
  
  if (nesne === 'aç') {
    const embed = new Discord.RichEmbed()
      .setDescription(`📥 Klima açıldı, fazla açmayın olm üşüyozla.`)
      .setImage('https://www.arcelik-lg.com.tr/Assets/Imgs/Contents/518154c2-58c9-4e45-ae55-94b4ac54b731.png')
      .setColor(0x36393E)
      .setFooter(`Vegas - Tüm klimalar kapalıdır.`, client.user.avatarURL)
    return message.channel.send(embed);
  }
  
  else if (nesne = 'kapat') {
    const embed2 = new Discord.RichEmbed()
      .setDescription(`📤 Klima kapatıldı, olum şunu açmayınla götümüz donuyo zaten.`)
      .setImage('https://www.arcelik-lg.com.tr/Assets/Imgs/Contents/518154c2-58c9-4e45-ae55-94b4ac54b731.png')
      .setColor(0x36393E)
      .setFooter(`Vegas Klima - Tüm klimalar kapalıdır.`, client.user.avatarURL)
    return message.channel.send(embed2);
  
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'klima',
  description: 'klima',
  usage: 'klima'
};