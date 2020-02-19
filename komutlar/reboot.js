const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, args) => {
message.channel.sendCode('js', `[1] VEGAS Bot#3699  adlı bot yeniden başlatılacaktır, onay veriyosanız, sohbete evet yazınız.`).then(() => {

  message.channel.awaitMessages(response => response.content === "evet", {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
      message.channel.sendCode('js', `[1] @VEGAS Bot#3699 adlı bot yeniden başlıyor.`).then(message => {
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot yeniden başlatılıyor...`)
      process.exit(1);
    }).catch(console.error)
    })
    .catch(() => {
      message.channel.sendCode('ascii', `Bot yeniden başlatma işlemi iptal edildi.`);
    });
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yb','yenidenkur', 'reboot'],
  permLevel: 4
};

exports.help = {
  name: 'reboot',
  description: '[Admin Komutu Botu Yeniden Başlatır]',
  usage: 'reboot'
};
