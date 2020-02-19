 
const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  const pingozel = new Discord.RichEmbed()
    .setColor(0x36393F)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('İşte Davet Linkim: \n\n[►Üzerime tıkla ve davet et](https://discordapp.com/oauth2/authorize?client_id=510158067480920065&permissions=2146958527&scope=bot)');
    return message.channel.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botu ekle', 'botu davet et', 'botuekle', 'invite'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Botun davet linkini gönderir.',
  usage: 'davet'
};

