const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('**Kime Tokat Atcağını Yazmalısın**');
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor(3447003)
    .setDescription(`** ${mesaj} ` + message.author.username + ' Sana Tokat Attı. Canın Acıdı mı?!**')
			.setImage(`https://cdn.discordapp.com/attachments/466937758150295562/507185831392575489/Kzna-Vitesi-Bese-Atan-Sahinci-Gibi-Tokat-Atan-Anne.gif`)
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tokat',
  description: 'Tokat Atarsınız.',
  usage: 'tokat'
};
