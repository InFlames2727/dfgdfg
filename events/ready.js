const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const snekfetch = require('snekfetch');
const api = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxMDE1ODA2NzQ4MDkyMDA2NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQzNTUyODg2fQ.GMog3v5mcwpEGogdBM38hvl6JW_mToEAU-Ga76cXJCw"
var prefix = ayarlar.prefix;

module.exports = client => {
    snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
  .set('Authorization', api)
  .send({ server_count: client.guilds.size })
  .then(() => console.log('abi dbl deki statusumu güncelledim.'))
console.log('>>Oynuyor kısmı başarıyla güncellendi.');
console.log('Bot hazır ve giriş yaptı.');
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);

    var Games = [

        "Vegas Bot | !!yardım",
        "Bot Davet Linki | !!davet ",
        "Bot sana yardım etmek için hazır ✅",
        "Bot senin için hazırlandı ✅",
        "Tüm ihtiyacını görebilecek ✅",
        "Yeni nesil discord bot ✅",

       
        `${prefix}yardım | ${client.guilds.size} sunucu | ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı`

    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(Games.length-0+1)+0);

client.user.setActivity(Games[random], { type: "STREAMING", url: "https://www.twitch.tv/VegasBot" } );
        }, 2 * 2500);

}