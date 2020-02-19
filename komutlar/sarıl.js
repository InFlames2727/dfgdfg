const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
  var request = require('request')
request('https://vegas-bots.glitch.me/api/rastgele', function(error, response, body) {
if (error) return message.channel.send(error)
else if (!error) {
 let info = JSON.parse(body)
  
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('**Kime Sarılacağını Yazmalısın **');
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor(3447003)
    .setDescription(`** ${mesaj} ` + message.author.username + ' Sana sarıldı   !! **')
			.setImage(info.rastgele)
    return message.channel.sendEmbed(embed);
}
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sarıl',
  description: 'İstediğiniz Kişiye Sarılırsınız',
  usage: 'sarıl'
};
