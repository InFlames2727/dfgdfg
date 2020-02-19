const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
      .setColor(0x36393F)
      .setAuthor(`Vegas`, client.user.avatarURL)
      .setDescription("[Botu sunucuya ekle](https://discordapp.com/oauth2/authorize?client_id=510158067480920065&permissions=2146958527&scope=bot) | [Anlık istatistik](https://www.anlikistatistik.com/loxys-dev) | [Destek](https://discord.gg/mJ7Swd5)\n\n**Ping**: " + client.ping + "ms!\n\n")
      .setThumbnail(client.user.avatarURL)
      .addField(`Vegas - Komutlar`, `:white_small_square: | **!!anakomutlar**: Sunucu için gerekli olan birkaç komutlar.\n:white_small_square: | **!!eğlence**: Eğlenmek için bulunan komutlar!\n:white_small_square: | **!!yetkili**: Sunucuyu yönetmek için gerekli olan komutlar!\n:white_small_square: | **!!kullanıcı**: Kullanıcılar için komutlar.\n:white_small_square: | **!!müzik**: Müzik ruhun gıdasıdır.`)
      .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
    message.channel.send(embed)
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'yardım',
 description: 'Yardım komudu!',
 usage: 'yardım'
};
//0xffa690