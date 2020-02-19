const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
      .setColor(0x36393F)
      .setAuthor(`Vegas`, client.user.avatarURL)
      .setDescription("[Botu sunucuya ekle](https://discordapp.com/oauth2/authorize?client_id=510158067480920065&permissions=2146958527&scope=bot) | [Anlık istatistik](https://www.anlikistatistik.com/loxys-dev) | [Destek](https://discord.gg/mJ7Swd5)\n\n**Ping**: " + client.ping + "ms!\n\n")
      .setThumbnail(client.user.avatarURL)
      .addField(`Vegas - Komutlar`, `:white_small_square: | **!!kralol**: Kral Ol Filtresi Uygular Profil Fotoğrafınıza.\n:white_small_square: | **!!cowsay**: İneğe Yazı Yazdırttırırsınız.\n:white_small_square: | **!!yavşak**: Profil Fotoğrafınıza Yavşak Efekti Ekler.\n:white_small_square: | **!!kayıp**: Avatarınıza Kayıp Efekti Ekler.\n:white_small_square: | **!!aranıyor**: Profil Fotoğrafınıza Aranıyor Efekti Yapar \n:white_small_square: | **!!1vs1**: Etiketlediğin Kullanıcıyla 1vs1 Atarsınız. \n:white_small_square: | **!!adamasmaca**: Etiketlediğiniz Kişiyi Asarsınız. \n:white_small_square: | **!!atombombası**: Atom Bombası Patlatırsınız \n:white_small_square: | **!!aşkölçer**: Etiketlediğiniz Kişiye % Kaç Aşık Olduğunu Ölçer \n:white_small_square: | **!!baklava**: Baklava Yersiniz. \n:white_small_square: | **!!gavat**: Ptofil Fotoğrafınıza Gavat Efekti Ekler.`)
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
 name: 'eğlence',
 description: 'Yardım komudu!',
 usage: 'eğlence'
};
//0xffa690