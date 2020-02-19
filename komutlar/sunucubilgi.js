const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
require('moment-duration-format');

exports.run = (bot, msg, params) => {
  const emojiList = (msg.guild.emojis.map(e=>e.toString()).join(" | "))

  
  var konum = ''
        if(msg.guild.region === "russia") {
            var konum = 'Rusya :flag_ru:'
        }
        if(msg.guild.region === "us-west") {
            var konum = 'Batı Amerika :flag_us: '
        }
        if(msg.guild.region === "us-south") {
            var konum = 'Güney Amerika :flag_us: '
        }
        if(msg.guild.region === "us-east") {
            var konum = 'Doğu Amerika :flag_us: '
        }
        if(msg.guild.region === "us-central") {
            var konum = 'Amerika :flag_us: '
        }
        if(msg.guild.region === "brazil") {
            var konum = 'Brezilya :flag_br:'
        }
        if(msg.guild.region === "singapore") {
            var konum = 'Singapur :flag_sg:'
        }
        if(msg.guild.region === "sydney") {
            var konum = 'Sidney :flag_sh:'
        }
        if(msg.guild.region === "eu-west") {
            var konum = 'Batı Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-south") {
            var konum = 'Güney Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-east") {
            var konum = 'Doğu Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-central") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(msg.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
        if(msg.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
        var tarih = ''
        if(moment(msg.guild.createdAt).format('MM') === '01') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Ocak ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '02') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Şubat ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '03') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Mart ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '04') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Nisan ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '05') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Mayıs ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '06') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Haziran ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '07') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Temmuz ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '08') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Ağustos ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '09') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Eylül ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '10') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Ekim ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '11') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Kasım ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '12') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Aralık ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }

      let afkkanalı =  (msg.guild.afkChannel)
    if(afkkanalı == null) afkkanalı = 'AFK kanalı ayarlanmamış.'

  let emojiler = (msg.guild.emojis.map(e=>e.toString()).join(" | "))
  if(emojiler == undefined) emojiler = 'Sunucuda Emoji Bulunamadı.'
  
   const embed = new Discord.RichEmbed()
   .setColor("BLUE")
   .setAuthor(`${msg.guild.name} adlı sunucunun bilgileri`, msg.guild.iconURL)
   .setThumbnail(msg.guild.iconURL)
      .addField('Sunucu Sahibi:', msg.guild.owner, true)
      .addField('Sunucu ID:', msg.guild.id, true)
      .addField('Oluşturma tarihi:', tarih, true)
   .addField('Sunucu Kurulum Konumu:', konum, true)
   .addField(`Kanallar (${msg.guild.channels.size})`, `${msg.guild.channels.filter(c => c.type === "text").size} Yazı \n${msg.guild.channels.filter(c => c.type === "voice").size} Sesli \n${msg.guild.channels.filter(c => c.type === "category").size} Kategori`,)
   .addField(`Kullanıcılar/Üyeler (${msg.guild.memberCount})`, `${msg.guild.members.filter(m => m.user.presence.status === "online").size} <:VEGASonline:513600306400067604> \n${msg.guild.members.filter(m => m.user.presence.status === 'dnd').size} <:VEGASdnd:513600112392536076> \n${msg.guild.members.filter(m => m.user.presence.status === "idle").size} <:VEGASidle:513600955120353281> \n${msg.guild.members.filter(m => m
   .user.bot).size} <:bot:498364551155154954> \n${msg.guild.members.filter(m => m.user.presence.status === "offline").size} <:VEGASoffline:513600696826986505>`, true)
   .addField('AFK kanalı:', `${afkkanalı}`, true)
   .addField('AFK zaman aşımı:', msg.guild.afkTimeout, true)
  .addField('Emojiler', `${emojiList}` || 'Sunucuda emoji bulunamadı.', true)
  .addField("Roller", msg.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join(' | '), true)
   .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
   msg.channel.send(embed);
 };

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['sbilgi'],
   permLevel: 0
 };

 exports.help = {
   name: 'sunucubilgi',
   description: 'Sunucu bilgisini söyler.',
   usage: 'sunucubilgi'
 };