const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
   let pre = args.slice(0).join(' ');
      if (!pre[0]) {
       msg.channel.send("1 ile 10 arasında bir sayı yazarmısın?") 
  }
   
       if (pre === '1') {
        msg.channel.send('Disko hızı `1` olarak ayarlandı!')
         db.set(`dhiz_${msg.guild.id}`, '1')
       }
  if (pre === '2') {
        msg.channel.send('Disko hızı `2` olarak ayarlandı!')
      db.set(`dhiz_${msg.guild.id}`, '2')
       }
   if (pre === '3') {
        msg.channel.send('Disko hızı `3` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '3')
       }
   if (pre === '4') {
        msg.channel.send('Disko hızı `4` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '4')
       }
   if (pre === '5') {
        msg.channel.send('Disko hızı `5` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '5')
       }
   if (pre === '6') {
        msg.channel.send('Disko hızı `6` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '6')
       }
   if (pre === '7') {
        msg.channel.send('Disko hızı `7` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '7')
       }
   if (pre === '8') {
        msg.channel.send('Disko hızı `8` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '8')
       }
   if (pre === '9') {
        msg.channel.send('Disko hızı `9` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '9')
       }
   if (pre === '10') {
        msg.channel.send('Disko hızı `10` olarak ayarlandı!')
       db.set(`dhiz_${msg.guild.id}`, '10')
       }
 if (pre === "sıfırla") {
   msg.channel.send("Disko Hızı Sıfırlandı")
 db.delete(`dhiz_${msg.guild.id}`)
 }
}  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'disko-hız-ayarla',
  description: '',
  usage: ''
};