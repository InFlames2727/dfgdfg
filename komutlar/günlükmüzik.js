const db = require('quick.db')
const ms = require('ms')
const Discord = require('discord.js')


exports.run = async (client, message, args) => {
   
let sonuc = ["<<:VEGASevet:509822002291277833> https://www.youtube.com/watch?v=AruGxaUes8o",
                 "<:VEGASevet:509822002291277833> https://www.youtube.com/watch?v=JZAIB1vJ1JM",
                 "<:VEGASevet:509822002291277833> https://www.youtube.com/watch?v=SkqHCzv-pn0",
                 "<:VEGASevet:509822002291277833> https://www.youtube.com/watch?v=soN0Ujm6RcQ",
                 "<:VEGASevet:509822002291277833> https://www.youtube.com/watch?v=Xn4330MpSMQ",
                 "<:VEGASevet:509822002291277833>> https://www.youtube.com/watch?v=Swa7J7Cix74",
                 "<:VEGASevet:509822002291277833> https://www.youtube.com/watch?v=b9QApLJ3TI0",];
    let result = Math.floor((Math.random() * sonuc.length)); 
    let cooldown = 1,
    amount = 1

    let lastDaily2 = await db.fetch(`lastDaily2_${message.author.id}`)
    try {
    db.fetch(`userBalance1_${message.member.id}`).then(bucks => {
    if(bucks == null){
        db.set(`userBalance1_${message.member.id}`, 50)}
    else if (lastDaily2 !== null && cooldown - (Date.now() - lastDaily2) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily2))
          message.channel.send(sonuc[result])
    } else {
        db.set(`lastDaily2_${message.author.id}`, Date.now());
        db.add(`userBalance1_${message.member.id}`, amount).then(i => {
          message.channel.send(`<:VEGAShayir:509821778064048128> Günlük müzik hakkınız dolmuş, lütfen **24** saatte bir kullanınız.`)
        })}
    })} catch(err) {console.log(err)}
         
         
}

 exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['günlükmüzik'],
  permLevel: 0
};

exports.help = {
  name: 'günlük-müzik',
  description: 'günlük-müzik',
  usage: 'günlük-müzik'
};

/*
    let cooldown = 43200000,  
    amount = 250

    let lastDaily = await db.fetch(`lastDaily_${message.author.id}`)
    try {
    db.fetch(`userBalance_${message.member.id}`).then(bucks => {
    if(bucks == null){
        db.set(`userBalance_${message.member.id}`, 50)}

    else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily))

        let lastDailyEmbed = new Discord.RichEmbed()
        .setColor(0x36393E)
        .setDescription(`:atm: | Yarın gel, bugünkü hakkın dolmuş.`)
        .setFooter('Lifely Banka Sistemi - Tüm hakları saklıdır.', client.user.avatarURL)
        message.channel.send(lastDailyEmbed)
    } else {
        db.set(`lastDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.member.id}`, amount).then(i => {
          var discord = require('discord.js')
          var embed = new Discord.RichEmbed()
          .setDescription(`:atm: ${amount}₺ hesabına yattı, 12 saatte bir gel maaşını al.`)
          .setColor(0x36393E)
          .setFooter('Lifely Banka Sistemi - Tüm hakları saklıdır.', client.user.avatarURL)
          message.channel.send(embed);
        })}
    })} catch(err) {console.log(err)}

}*/