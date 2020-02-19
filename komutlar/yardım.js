const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
	   .setAuthor('Rainbow Bot 2 - Komutlar')
    .setDescription('**..disko-rol-ayarla** = Disko rolünü ayarlar. \n**..disko-rol-sıfırla** = Disko rolünü sıfırlar. \n**..disko-hız-ayarla** = Disko hıznı ayarlar. \n**..disko** = Diskoyu başlatır. \n**..discodurdur** = Diskoyu durdurur. \n**..istatistik** = Botun istatistiklerini gösterir.')
    .addField('Linkler', `[Davet Et!](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=805314622)`)
    .setColor('#ffb900')
       .addField('Rainbow Bot Varmı?',  message.guild.members.has("445645030359826452") ? '\nBu sunucuda Rainbow Bot var!' : 'Yok davet etmek için [tıkla!](https://discordapp.com/oauth2/authorize?client_id=445645030359826452&scope=bot&permissions=805314622)')
    .setThumbnail(client.user.avatarURL)
    return message.channel.send(embed);
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yardım', 'komutlar', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'yardım',
  usage: 'yardım'
};