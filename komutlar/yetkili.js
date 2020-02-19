const Discord = require("discord.js");
 
exports.run = async (bot, message, args) => {
let pages = ["▫ | **!!otorol**: Etiketlediğin rolü kullanıcıya verir. Örnek: !!otorol @Üye #kanal.\n▫ | **!!sayaç-ayarla**: Sayaç kişisini belirlersiniz. Örnek: !!sayaç-ayarla 100 #kanal \n▫ | **!!everyoneengel aç/kapat**: Everyone engel komutunu açarsanız artık kimse everyone atamaz.(Yöneticiler Dışında)\n▫ | **!!küfürengel aç/kapat**: Küfür engeli açarsanız artık kimse küfür edemez. (Yöneticiler Dışında)\n▫ | **!!reklamengel**: Reklam engeli açarsanız artık kimse reklam yapamaz link paylaşamaz.(Yöneticiler Dışında)\n▫ | **!!yavaşmod**: Bu komutu yazdığınız kanalın yazı yazma süresini belirler. \n▫ | **!!hgbbkanal**: Giriş çıkış mesajlarının gideceği kanalı ayarlar. \n▫ | **!!modlog**: Silinen mesajların , yasaklamaların vb. olayların kayıt edildiği odayı ayarlar. \n\n**[Davet](https://discordapp.com/oauth2/authorize?client_id=510158067480920065&scope=bot&permissions=2146958847)** | **[Destek Sunucusu](https://discord.gg/mJ7Swd5)** | **[API](https://api-vegas.glitch.me/)**",
"▫ | **!!yasakla**: Etiketlediğiniz Kişiyi Sunucudan Banlarsınız \n▫ | **!!at**: Etiketlediğiniz Kişiyi Sunucudan Atarsınız \n▫ | **!!uyar**: Etiketlediğiniz Kişiyi Sebep Belirterek Uyarırsınız \n▫ | **!!sunucubilgi**: Sunucunun Bilgilerini Gösterir \n▫ | **!!rolbilgi**: Rol Hakkında Bilgi Alırsınız"]
  let page = 1; // Sayfa 1
 
 
  const embed = new Discord.RichEmbed()
  .setColor(0x36393F)
  .setFooter(`${message.author.tag} tarafından istendi. | Sayfa ${page}/${pages.length}`, message.author.avatarURL)
.setDescription(pages[page-1])
message.channel.send(embed).then(msg => {
 
    msg.react('⬅').then(r => {
      msg.react('➡')
 
      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
 
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
 
      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`${message.author.tag} tarafından istendi. | Sayfa ${page}/${pages.length}`, message.author.avatarURL)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`${message.author.tag} tarafından istendi. | Sayfa ${page}/${pages.length}`, message.author.avatarURL)
        msg.edit(embed)
      })
 
    })
  })
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Kullanıcı komudu!',
  usage: '/kullanıcı'
};