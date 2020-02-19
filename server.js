const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const Jimp = require('jimp');
const moment = require('moment');
require("moment-duration-format")
const os = require('os')
  let cpuStat = require("cpu-stat");
let cpuLol;
      cpuStat.usagePercent(function(err, percent, seconds) {
if (err) {
              return console.log(err);
}
      })
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const { GOOGLE_API_KEY } = require('./ayarlar.json');
const db = require('quick.db');
require('./util/eventLoader')(client);

const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

 
const newUsers = [];


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', async msg => {
   let discohiz = await db.fetch(`dhiz_${msg.guild.id}`);
  let dhiz;
  if (discohiz == null) dhiz = '750'
  if (discohiz == '1') dhiz = '1200'
    if (discohiz == '2') dhiz = '1150'
    if (discohiz == '3') dhiz = '1100'
    if (discohiz == '4') dhiz = '1050'
    if (discohiz == '5') dhiz = '1000'
    if (discohiz == '6') dhiz = '950'
    if (discohiz == '7') dhiz = '900'
    if (discohiz == '8') dhiz = '850'
    if (discohiz == '9') dhiz = '800'
    if (discohiz == '10') dhiz = '750'
  //
  let discorol = await db.fetch(`discorol_${msg.guild.id}`);
  let drol;
  if (discorol == null) drol = 'Disco'
  else drol = `${discorol}`
    const rol = `${drol}` // Rol ismi buraya
    if (msg.content.toLowerCase() === prefix + "disko") {
       if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send('Olamaz! `Rolleri Yönet` yetkin yok!')
  setInterval(() => {
      msg.guild.roles.find(s => s.name === rol).setColor("RANDOM")
  }, dhiz)
        const disc = new Discord.RichEmbed()
.setTitle('Aktif edildi!')
.setColor('RANDOM')
        .addField('Hız', `${dhiz || 'Hızı ayarlanmamış!'}`, true)
          .setFooter(`Not: ${drol} adında rol ismi olmazsa çalışmaz!`)
msg.channel.send(disc)
      }  
      
    }
    
      
    
) 

client.on('message', async msg => {
   let discorol = await db.fetch(`discorol_${msg.guild.id}`);
  let drol;
  if (discorol == null) drol = 'Disco'
  else drol = `${discorol}`
    const rol = `${drol}` // Rol ismi buraya
   /* if (msg.content.toLowerCase() === prefix + "discodurdur") {
       if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send('Olamaz! `Rolleri Yönet` yetkin yok!')
  setInterval(() => {
      msg.guild.roles.find(s => s.name === rol).setColor("DEFAULT")
  }, 0)
        const disc = new Discord.RichEmbed()
.setTitle('Durduruldu!')
        .setColor('RANDOM').setDescription('Disco durduruldu!')
        .setFooter(`Not: ${drol} adında rol ismi olmazsa çalışmaz!`)
msg.channel.send(disc)*/
  
  if(msg.content.startsWith(prefix + "discodurdur")) {
setTimeout(() => { console.log(process.exit(0)); }, 300);
const embed = new Discord.RichEmbed()
  .setTitle('Durduruldu!')
        .setColor('RANDOM').setDescription('Disco durduruldu!')
        .setFooter(`Not: ${drol} adında rol ismi olmazsa çalışmaz!`)

//.addField("**Disko**", `Disko Durduruldu`)

 
  return msg.channel.sendEmbed(embed);
};
 
  
      }  
         
    
    
      
) 



client.on("ready", () => {
client.user.setStatus("idle")
client.user.setActivity(`${prefix}yardım ${prefix}davet ✨`, {type: "WATCHING"});
    console.log(`Giriş yapılan bot ${client.user.tag}!`)
});
/*
client.on('message', msg => {
          if (msg.content.toLowerCase() === prefix + "istatistik" || msg.content.toLowerCase() === prefix + "i") {
       const embed = new Discord.RichEmbed()
            .addField("Bot Sahibi", `<@442321157320867841>`, true)
            .addField("Version", "v3.0.2", true)
            .addField("Toplam Sunucu Sayısı", client.guilds.size, true)
            .addField("Toplam Kullanıcı Sayısı", client.users.size, true)
            .addField("Toplam Kanal Sayısı", client.channels.size, true)
            .addField("Kitaplık Türü", "discord.js", true)
            .addField("Bellek Kullanımı", Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ` MB`, true)
//            .addField("Çalışma Süresi", moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]"), true)
            .addField("İşletim Sistemi", "Linux", true)
          .addField('DiscoBot Varmı?',  msg.guild.members.has("495688190276009995") ? '\nBu sunucuda DiscoBot var!' : 'Yok davet etmek için [tıkla!](https://discordapp.com/oauth2/authorize?client_id=495688190276009995&scope=bot&permissions=805314622)')
            .setColor("RANDOM")
        return msg.channel.sendEmbed(embed)
}
});*/










        const {
stripIndents,
          oneLine
        } = require("common-tags")
        let talha = "348097494548348940"
        let irem = "442321157320867841"
      client.on("message", async msg => {
        	const args = msg.content.split(' ');
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

   /*   var guild = await client.shard.fetchClientValues("guilds.size")
var channel = await client.shard.fetchClientValues("channels.size")
var user = await client.shard.fetchClientValues("users.size")

var guilds = await guild.reduce((prev, val) => prev + val, 0);
var channels = await channel.reduce((prev, val) => prev + val, 0);
var users = await user.reduce((prev, val) => prev + val, 0);
*/
        
        
        
        
        const os = require('os');
let cpuStat = require("cpu-stat");
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
  
        
        
                  if (msg.content.toLowerCase() === prefix + "istatistik" || msg.content.toLowerCase() === prefix + "i" || msg.content.toLowerCase() === prefix + "botbilgi") {

        

        const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(client.user.username + " | İstatistikler", client.user.avatarURL)
                .setColor("#0080ff")
          .addField("Geliştirici", `**[**${client.users.get(talha).tag}**]** - **[**${client.users.get(irem).tag}**]**`)
            .addField("Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField("Çalışma Süresi ", `${duration}`)
            .addField("Bot İstatistikleri", stripIndents`
             Kullanıcı: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
             Sunucu: ${client.guilds.size.toLocaleString()}
             Kanal: ${client.channels.size.toLocaleString()}
             Müzik Çalınan Sunucu Sayısı: ${client.voiceConnections.size ? client.voiceConnections.size : '0'}
            `)
      /*  .addField("Shard Bilgi", stripIndents`
        Toplam Shard Sayısı: \`\`${client.shard.count}/${client.shard.count}\`\`
Bu Sunucuya Hizmet Veren Shard: \`\`${client.shard.id+1}\`\`
Bu Shard'daki Kullanıcı Sayısı: \`\`${users.toLocaleString()}\`\`
Bu Shard'daki Sunucu Sayısi: \`\`${guilds.toLocaleString()}\`\`
Shard Gecikmesi: \`\`${client.ping}ms.\`\`
`)*/
        
        
            .addField("Versiyonlar", stripIndents`
            » Discord.js: v${Discord.version}
            » Node.js: ${process.version}
            `)
            .addField("CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("CPU Kullanımı", `\`${percent.toFixed(2)}%\``)
            .addField("Bit", `\`${os.arch()}\``, true)
            .addField("İşletim Sistemi", `\`\`${os.platform()}\`\``)
        msg.channel.send(embedStats)
    }
}
      )
      })




















client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);