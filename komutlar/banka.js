const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let para = await db.fetch(`userBalance_${user.id}`);
   
    const embed = new Discord.RichEmbed()
	    .setAuthor(`Hesap sahibi: ${message.author.username}`, 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png')
      .setDescription(`Hesabınızda bulunan para: ${para}₺`)
      .setColor(0x36393F)
      .setFooter(`Vegas Bot`, client.user.avatarURL)
    return message.channel.send(embed);
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bankaşube'],
  permLevel: 0
};

exports.help = {
  name: 'banka',
  description: 'banka',
  usage: 'banka'
};