const {
    stripIndents,
oneLine
}
  = require("common-tags")
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require('quick.db')
const moment = require('moment');
require('moment-duration-format');
const Jimp = require('jimp');
const snekfetch = require('snekfetch');
require('./util/eventLoader')(client);
let owner = "348097494548348940"

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
      console.log(`az önce panelime birisi tıkladı -_-`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {

  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

app.get('/api/sov', async (req,res) => {
  const söv = [      "amına kodumun jedayı seni",
    "babanın annesinin amına koyayım orul orul orospu evladı",
    "ebenin amı gibi kaşları da kara",
    "seni anasının amında olimpiyat meşalesi yakıp 10 km kostuğumun cocuğu ",
    "senin ananın amına mancınıkla patates atayım",
    "senin dalağını öyle bi sikerim ki ömür boyu hıçkırırsın",
    "ananın amına bilardo topuyla rövaşata çekerim am dolması yarrak kafalı çin orospusu seni amına kodumun çin aslanı bilyesini gibtiğimin am düdüğü",
    "senin ananı düdüklü tencerenin arasına alıp öttüre öttüre sikerim ulan ben",
    "ananın amını keserim cebime koyarım sıkıldıkça sikerim",
    "ananın amına sınav yapar 2 milyon kişiyi sokarım",
    "amına barut döker sürtünmeyle yakarım orospu evladı",
    "seni bi sikerim bluetooh un hata verir kapsama alanın genişler.",
    "o tuşlara basan ufacık parmaklarının arasına sokar felç edene kadar siker o felç olan parmaklarını kesip organ mafyasına satarım elde ettigim gelirin bi kısmını görme engelliler vakfına bağışlar kalan kısmıda annenle çarçur eder babanın delirmesini sağlar ocağına incir ağacı diker ağacın gölgesinde teyzeni dallı budaklı sikerim senin",
    "küfür etmek günah olum sen ne yaptıysan artık sana kızmış birisi affettir kendini beni de günaha sokçak orospu kertenkelesi",
    "küfür ederdim ama anan çok yordu",
    "öyle yan durup şekilli mekilli tişört giyme ananı götünden siker Erol Taş gibi kiraz ağacından kamçı yapar döverim",
    "senin götünü keser çorap lastiği yaparım." ]
   const result = Math.floor(Math.random() * söv.length)
  return res.end(`{"söv" : "${söv[result]}"}`)
});

app.get('/api/rastgele', async (req,res) => {
  const rastgele = ['https://i.giphy.com/media/3oEdv4hwWTzBhWvaU0/200w_s.gif', 'https://i.giphy.com/media/EvYHHSntaIl5m/giphy.gif']
  const result = Math.floor(Math.random() * rastgele.length)
  return res.end(`{"rastgele" : "${rastgele[result]}"}`)
});

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


let prefix = "!!"

client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  client.channels.get("503311127480893440").send(`Şu sunucuya katıldım: ${guild.name} davet linki: https://discord.gg/${invite.code}`)
});

const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./müzik');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core')
const queue = new Map();


client.on('message', async msg => { // eslint-disable-line
  let prefix = await db.fetch(`prefix_${msg.guild.id}`) || "!!";
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

  
  
	if (command === 'çal') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
    .setDescription(' ❎ | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('#3a74ca')
      .setDescription('🚫 | Şuanda olduğunuz kanala girmek için gerekli izinlere sahip değilim.'));
		}
		if (!permissions.has('SPEAK')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('#3a74ca')
      .setDescription('🚫 | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // ehehehehu videomuzu bulalım
				await handleVideo(video2, msg, voiceChannel, true); // ve gönderelim
			}
      return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setDescription(`✔ | Playlist ➢ **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.sendEmbed(new Discord.RichEmbed()
                                .setTitle('Şarkı Seçimi')
      .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
       .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 30 saniye içinde liste iptal edilecektir.')
          .setColor('#3a74ca'));
					// en fazla 5 tane 
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('#3a74ca')
            .setDescription('❎ | Şarkı seçimi iptal edildi. '));
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
          return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('#3a74ca')
          .setDescription(' ❎ | Herhangi bir arama sonucu elde edemedim.'));
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'geç') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
		if (!serverQueue) return msg.channel.send(' ❎ | Kuyruk boş olduğu için geçemiyorum. ');
		serverQueue.connection.dispatcher.end('Geç komudu kullanıldı.');
		return undefined;
	} else if (command === 'kapat') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
    .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Kapat komutu kullanıldı!');
		return undefined;
	} else if (command === 'ses') {
      if (!msg.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setDescription(`You can not use commands here.`)
        return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
  .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
   .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
    if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
    .setDescription(` 🔊 | Ses seviyesi: **${serverQueue.volume}**`));
		serverQueue.volume = args[1];
        if (args[1] > 10) return msg.channel.send({
            embed: {
                title: "",
                color: 0xE50000,
                description: "Lütfen 10'dan az yada 10 olarak bir sayı belirtin."
            }
        });
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
   .setDescription('Ses Seviyesi ' + `**${args[1]}**` + ' Olarak Ayarlandı.'));
	} else if (command === 'çalınan') {
    
    
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`❕ | Şu anda hiçbir şey çalmıyorum.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
    .setDescription(':x: | Şu anda hiçbir şey çalmıyorum.'));
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'kuyruk') {
		if (!serverQueue) return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum. ');
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#3a74ca')
     .setTitle('Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'durdur') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription('⏸ | Müzik durduruldu.')
      .setColor('#3a74ca'));
		}
		return msg.channel.send('🚫 | Şu anda hiçbir şey çalmıyorum.');
	} else if (command === 'devam') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Burada komutu kullanamazsınız.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('#3a74ca')
      .setDescription('▶ | Müzik devam ediyor.'));
		}
		return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum.');
  }

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title, 
		url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
		durations: video.duration.seconds,
    views: video.views,
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 3,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`HATA | Ses kanalına katılamadım: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
    else return msg.channel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`✔ | **${song.title}** adlı şarkı başarıyla kuyruğa eklendi.`)
  .setColor('#3a74ca'));
	}

	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Akış yeterince hızlı diğil.') console.log('Şarkı Durduruldu.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

   serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()
  .setAuthor(`Şarkı Çalınıyor`, `https://images.vexels.com/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo-by-vexels.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Başlık', `[${song.title}](${song.url})`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .addField("Ses Seviyesi", `${serverQueue.volume}%`, true)
  .setColor('#3a74ca'));
}
























client.on('message', async message => {
  let cont = message.content.slice(prefix.length).split(" ")
  let args = cont.slice(1)
  if (message.content.startsWith(prefix + 'özel-komut')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('`YÖNETİCİ` yetkin yok!')
    /*db.fetch(`ozelkomutsoru_${message.guild.id}`).then(content => {
      db.fetch(`ozelkomutcevap_${message.gud.id}`).then(send => {*/
  //  let quest = message.content.slice(prefix.length + 10).split('/')
    if (args[0] === 'sil') {
      let cmd = await db.fetch(`contentozelcmd_${message.guild.id}`)
      if (cmd == null) return message.channel.send('Özel komut zaten ayarlanmamış.')
      db.delete(`contentozelcmd_${message.guild.id}`)
      message.channel.send('Özel komut silindi.')
    }
 else if (!args[0] && !args[1]) return message.channel.send('Doğru kullanım: ' + prefix + 'özel-komut [kullanıcıyazısı] [botunyazısı]')
      if (args[0] && !args[1]) return message.channel.send(`Doğru kullanım: ${prefix}özel-komut [kullanıcıyazısı] [botunyazısı]`)
      if (!args[0] && args[1]) return message.channel.send(`Doğru kullanım: ${prefix}özel-komut [kullanıcıyazısı] [botunyazısı]`)
 if (args[0] && args[1]) {
  /*  let bir;
    bir = quest[0]
    let iki;
    iki = quest[1]*/
    db.set(`contentozelcmd_${message.guild.id}`, args[0])
   db.set(`responseozelcmd_${message.guild.id}`, args[1])
  const embed = new Discord.RichEmbed()
  .setDescription('Özel komut ayarlandı!')
  .addField('Kullanıcı Yazısı', args[0])
  .addField('Bot Yazısı', args[1])
  .setColor('#0fffff')
  message.channel.send(embed)
   /* db.fetch(`ozelkomutsoru_${message.guild.id}`).then(content => {
      db.fetch(`ozelkomutcevap_${message.guild.id}`).then(send => {*/
      
    
      
      } /*lse if (args[0] === 'sil') { /*else if (content && send) {
       message.channel.send('Zaten bir komut ayarlamışsınız!')
      }*/
      
    
 // if (message.content.startsWith(prefix + 'özelkomut-sil')) {
    /*let cemede = await db.fetch(`contentozelcmd_${message.guild.id}`)
    if (cemede == null) return message.channel.send('Özel komut zaten ayarlanmamaış.')
      db.delete(`contentozelcmd_${message.guild.id}`)
      message.channel.send('Özel komut silindi!')
      }*/
      }
});








client.on("message", async message => {
    if (message.content.startsWith(prefix + 'hıztesti')) {
const m = await message.channel.send(`${process.env.basarili} ölçüyorum abi bi sn`)
  
  var speedTest = require('speedtest-net');

  var osType = os.type();

  if (osType === 'Darwin') osType = 'macOS'
  else if (osType === 'Windows') osType = 'Windows'
  else if (osType === 'Linux') osType = 'Linux'
  else if (osType === 'Ubuntu') osType = 'Ubuntu'
  else osType = os.type();
    var test = speedTest({maxTime: 5000});
    test.on('data', data => {
              
const embed = new Discord.RichEmbed()
 .setColor(0x36393F)
.setTitle('**speedtest Sonuçlar**')
.addField('**Anlık İstatistikler**', `İndirme: **${data.speeds.download}**
Yükleme: **${data.speeds.upload}**`)
.addField('**Nolmal Olarak Ölçülen İstatistikler**', `İndirme: **${data.speeds.originalDownload}**
Yükleme: **${data.speeds.originalUpload}**`)
.addField('**Pingler**', `Discord API Pingi: **${client.ping}**
Speedtestde Ölçülen Ping: **${data.server.ping}**`)
.addField('**Diğer Bilgiler**', `İnternet Portunun IP'sı: **${data.client.ip}**
İşletim Sistemi: **${osType}**
İnternet Sağlayıcısı: **${data.client.isp}**
Host: **${data.server.host}**
Lokasyon: **${data.server.country}**,**${data.client.country}**
Sağlayıcı Lokasyonu: **${data.server.location}**
Sağlayıcı Sponsoru: **${data.server.sponsor}**`)
m.edit(embed)
});
 
    test.on('error', err => {
  console.log(err);
});
}
});









client.on("message", async message => {
  //t.on('message', message => {
  db.fetch(`contentozelcmd_${message.guild.id}`).then(mesaj => {
    db.fetch(`responseozelcmd_${message.guild.id}`).then(cevap => {
 //   if (!content && !send) return;
   // if (mesaj == '123456789101112131415.xd') return;
      try {
      if (message.content.toLowerCase() === mesaj) {
       return message.channel.send(cevap)
      }
      } catch (err) {
        message.channel.send(`\`\`\`${err}\`\`\``)
      }
    })
  })
});







client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
  
   if(command === "yasakla") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(`${process.env.basarisiz} Bu komutu kullanabilmek için yetkin bulunmuyor.`)
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send(`${process.env.basarisiz} Sunucudan yasaklayacağım kişiyi etiketlemelisin.`);
    if(!member.bannable) 
      return message.channel.send(`${process.env.basarisiz} Sunucudan yasaklayamadım. Yoksa bana sunucudan atma yetkisi vermedin mi? veya bana yetkiliyi mi yasaklamaya çalıştırdın?`);

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Açıklama yok.";
    
    await member.send(`***${message.guild.name}*** adlı sunucudan ***${reason}*** sebebinden dolayı yasaklandın.`)
    member.ban(reason)
      .catch(error => message.channel.send(`${process.env.basarisiz} Üzgünüm sunucudan yasaklayamadım. HATA: ${error}`));
    message.channel.send(process.env.basarili + `***${member.user.tag}*** adlı kişi yasaklandı.`);
  }
  

  if(command === "uyar") {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(`${process.env.basarisiz} Bu komutu kullanabilmek için yetkin bulunmuyor.`)
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send(`${process.env.basarisiz} Uyaracağım kişiyi etiketlemelisin.`);

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "sebepsiz";
 
      await member.send(`***${message.guild.name}*** adlı sunucudan ***${reason}*** sebebinden dolayı uyarıldın.`)
      .catch(error => message.channel.send(`${process.env.basarisiz} Üzgünüm mesajı atamadım. HATA: ${error}`));
    message.channel.send(`***Uyarıyı gönderdim.***`);
  }

   if(command === "at") {
     if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(`${process.env.basarisiz} Bu komutu kullanabilmek için yetkin bulunmuyor.`)
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send(`${process.env.basarisiz} Sunucudan yasaklayacağım kişiyi etiketlemelisin.`);
    if(!member.kickable) 
      return message.channel.send(`${process.env.basarisiz} Sunucudan atamadım. Yoksa bana sunucudan atma yetkisi vermedin mi? veya bana yetkiliyi mi attırmaya çalıştırdın?`);
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Açıklama yok.";
    
    await member.send(`***${message.guild.name}*** adlı sunucudan ***${reason}*** sebebinden dolayı atıldın.`)
    member.kick(reason)
      .catch(error => message.channel.send(`${process.env.basarisiz} Üzgünüm sunucudan atamadım. HATA: ${error}`));
    message.channel.send(process.env.basarili + `***${member.user.tag}*** adlı kişi attıldı.`);
   }

     
   })

      













client.on("message", async (message, guild) => {
    if (message.content == "giriş") {
      const load = (client.emojis.find("name", "loading").toString())
      message.channel.send(`${load} | **Giriş test!** filtresi uygulanıyor.`).then(m => m.delete(1000));
    message.channel.send(`📥 Sunucuya yeni birisi katıldı. Hoşgeldin **${message.author.username}**!`)
                const bg = await Jimp.read("https://media.discordapp.net/attachments/508573970275237888/516152348222029825/cks.png");
                const userimg = await Jimp.read(message.author.avatarURL);
                var font;
                if (message.author.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                else if (message.author.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                else font = await Jimp.loadFont(Jimp.FONT_SANS_36_WHITE);
                await bg.print(font, 205, 317, `${message.author.username}`);
                await userimg.resize(145, 150,Jimp.RESIZE_BICUBIC);
        await bg.composite(userimg, 174, 91).write("./img/"+ message.author.id + ".png");
                  setTimeout(function () {
                        message.channel.send(new Discord.Attachment("./img/" + message.author.id + ".png"));
                  }, 1000);
                  setTimeout(function () {
                    fs.unlink("./img/" + message.author.id + ".png");
                  }, 10000);

    }
});


client.on('message', message => {
  
    const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;
  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;
      if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  
    if (command === "hgbbkanal" || command === "logayarla" || command === "girişkanalı") {
    if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id !== '312962543591096322') return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu Komutu Kullanmak İçin `Yönetici` Olman Lazım!').setColor("RED"));
        if (!message.mentions.channels.first() && args.join(" ").toLowerCase() === `none`)
             return message.channel.send(new Discord.RichEmbed().setDescription(`Doğru kullanım: !!hgbbkanal #kanal`).setColor("RED"));
        let newChannel;
        if (args.join(" ").toLowerCase() === `none`) newChannel = '';
        else newChannel = message.mentions.channels.first().id;
        db.set(`memberChannel_${message.guild.id}`, newChannel).then(i => {
            const ayarlar2 = new Discord.RichEmbed().setFooter(`<:VEGASevet:509822002291277833> Giriş Çıkış kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
            return message.channel.send(`<:VEGASevet:509822002291277833> Giriş Çıkış kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
        })
    }
})

client.on("guildMemberAdd", async member => {
         let anan = member.user.avatarURL || member.user.defaultAvatarURL
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
        let username = member.user.username;
        if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
        if (member.guild.channels.get(memberChannel).type === "text") {
                const bg = await Jimp.read("https://media.discordapp.net/attachments/508573970275237888/516152348222029825/cks.png");

          const userimg = await Jimp.read(anan);
                var font;
                if (member.author.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                else if (member.author.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                else font = await Jimp.loadFont(Jimp.FONT_SANS_36_WHITE);
                await bg.print(font, 205, 317, `${member.author.username}`);
                await userimg.resize(145, 150,Jimp.RESIZE_BICUBIC);
        await bg.composite(userimg, 174, 91).write("./img/"+ member.author.id + ".png");
                  setTimeout(function () {
member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/" + member.id + ".png"));
                  }, 1000);
                  setTimeout(function () {
                    fs.unlink("./img/" + member.user.id + ".png");
                  }, 10000);

        }
    })

client.on("guildMemberRemove", async member => {
         let anan = member.user.avatarURL || member.user.defaultAvatarURL
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
        let username = member.user.username;
        if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
        if (member.guild.channels.get(memberChannel).type === "text") {
                  const bg = await Jimp.read("https://cdn.discordapp.com/attachments/508573970275237888/516152345067782144/finish2.png");
                const userimg = await Jimp.read(anan);
                var font;
                if (member.author.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                else if (member.author.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                else font = await Jimp.loadFont(Jimp.FONT_SANS_36_WHITE);
                await bg.print(font, 205, 317, `${member.author.username}`);
                await userimg.resize(145, 150,Jimp.RESIZE_BICUBIC);
        await bg.composite(userimg, 174, 91).write("./img/"+ member.author.id + ".png");
          setTimeout(function () {
                        member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/" + member.id + ".png"));
                  }, 1000);
                  setTimeout(function () {
                    fs.unlink("./img/" + member.user.id + ".png");
                  }, 10000);

        }
    })













const arraySort = require("array-sort")
client.on('guildMemberAdd', async member => {
    let davet = await db.fetch(`davet_${member.guild.id}`)
    if (!member.guild.channels.get(davet)) return console.log('Davetler')
        let invites = await member.guild.fetchInvites().catch(error => {
            return member.guild.channels.get(davet).send(`${process.env.basarisiz} Davetleri görüntülemek için yetkim bulunmuyor.`);
        })
        invites = invites.array();
        arraySort(invites, 'uses', {
            reverse: true
        }); 
        let possibleInvites = [];
        invites.forEach(function(invite) {
            possibleInvites.push([`📥 **${member.user.tag}** sunucuya katıldı. Davet eden: **${invite.inviter.username}**`]);
        })
        member.guild.channels.get(davet).send(possibleInvites)
})





client.on("message", async message => {

    let cont = message.content.slice(prefix.length).split(" ")
    let args = cont.slice(1)
    if (message.content.startsWith(prefix + 'otorol')) {
    let rol = message.mentions.roles.first() || message.guild.roles.get(args.join(' '))
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(':no_entry: Otorol ayarlamak için `Rolleri Yönet` yetkisine sahip olman gerek.')
    let newRole;
    let tworole;
    
      if (!rol) return message.channel.send(':no_entry: Otorol ayarlamanız için bir rol etiketlemeniz gerek veya kanal. `!!otorol @Üye #kanal`')
    else newRole = message.mentions.roles.first().id
    
    let otorolkanal = message.mentions.channels.first();
    if (!otorolkanal) return message.channel.send(':no_entry: Otorol ayarlamanız için bir rol etiketlemeniz gerek veya kanal. `!!otorol @Üye #kanal`')
    
      db.set(`arc_${message.guild.id}`, message.mentions.channels.first().id)
    db.set(`autoRole_${message.guild.id}`, newRole).then(otorol => {
    if (!message.guild.roles.get(newRole)) return message.channel.send(":no_entry: Etiketlediğiniz rol bulunamadı, etiketlediğiniz rolün etiketlenebilirliğinin aktif olduğundan emin olunuz.")
      message.channel.send(`${process.env.basarili} Otorol, <@&${newRole}> olarak ayarlandı. Belirttiğiniz kanala artık otorol mesajları gidecektir.`)
    
    })  
      
        
    }
})



client.on('guildMemberAdd', async member => {
  db.fetch(`arc_${member.guild.id}`).then(i => {
    db.fetch(`autoRole_${member.guild.id}`).then(rol => {
      let role = member.guild.roles.get(rol).name
  member.guild.channels.get(i).send(`${process.env.basarili} ${member} adlı kullancıya \`${role}\` rolü verildi.`) 
try {
  
  member.addRole(member.guild.roles.get(rol))
} catch (e)  {
  
  if (!rol && !i) return
  
  console.log(`${member.guild.name} adlı sunucuda otorol hatası var`)
  
}
    })
  })
  });






client.on("message", async message => {
    const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

    let i = await db.fetch(`prefix_${message.guild.id}`)
    let prefix;
    if (i) {
        prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] + " " : i;
    } else {
        prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] + " " : "!!";
    }

    if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    console.log(`${message.author.tag} - ${message.guild.name} : ${message.content.toString()}`);
   
  
    
       if (command === "davet-ayarla" || command === "davetayarla") {
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!message.mentions.channels.first() && args.join(" ").toLowerCase() === `none`)
            return message.channel.send("Geçerli bir kanal etiketlemelisin.\nDoğru kullanım: ${prefix}davet-ayarla [#kanal]")
        let newChannel;
        if (args.join(" ").toLowerCase() === `none`) newChannel = '';
        else newChannel = message.mentions.channels.first().id;
        db.set(`davet_${message.guild.id}`, newChannel).then(i => {
            const ayarlar2 = new Discord.RichEmbed().setFooter(`${process.env.basarili} Davetler kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
            return message.channel.send(`${process.env.basarili} Davet kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
        })
    }
    
    

  });
  
  
  





client.on("message", async message => { 
    let cont = message.content.slice(prefix.length).split(" ")
    let args = cont.slice(1)
    if (message.content.startsWith(prefix + 'sayaç')) {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Sayaç ayarlamak için `Sunucuyu Yönet` yetkisine sahip olman gerek.') 
    if (!args[0]) return message.channel.send(':no_entry: Sayaç ayarlamak için bir sayı gir! `!!sayaç 100 #sayaç`')
    if (args[0] <= message.guild.memberCount) return message.channel.send(':no_entry: Sayaç sayısı sunucudaki kişi sayısından az yada eşit olamaz!')
    let kanal = message.mentions.channels.first();
    if (!kanal) return message.channel.send(':no_entry: Sayaç ayarlamak için bir kanal etiketleyin! `!!sayaç 100 #sayaç`')
    if (isNaN(args[0])) return message.channel.send('Geçerli bir sayı gir!') 
    db.set(`sayacSayi_${message.guild.id}`, args[0]).then(o => {
    db.set(`sayacKanal_${message.guild.id}`, message.mentions.channels.first().id).then(i => {
      message.channel.send(`${process.env.basarili} Sayaç başarıyla \`${o}\` olarak ayarlandı. Sayaç mesajları <#${i}> adlı kanala gönderilecek.`)
    })
    })
  }
})





  client.on('guildMemberAdd', (member, guild) => {
  db.fetch(`sayacKanal_${member.guild.id}`).then(kanal => {
  db.fetch(`sayacSayi_${member.guild.id}`).then(i => {
    if (!i) return
    if (!kanal) return    
    member.guild.channels.get(kanal).send(`:inbox_tray: Yeni bir kişi katıldı! \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı!`) 
  })
  })
})
client.on('guildMemberRemove', member => {
  db.fetch(`sayacKanal_${member.guild.id}`).then(kanal => {
  db.fetch(`sayacSayi_${member.guild.id}`).then(i => {  
    if (!i) return
    if (!kanal) return  
    member.guild.channels.get(kanal).send(`:outbox_tray: Bir kişi kaybettik :frowning: \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı!`)
  })
  })
})
  
  
  
  
  client.on("message", async message => {
  if ( message.content.type === "DM" ) return;
    let sayac = await db.fetch(`sayaç_${message.guild.id}`)
    let sayaçkişi = await db.fetch(`sayaçkişi_${message.guild.id}`);
    if (sayaçkişi == null) sayaçkişi = `member.guild.members.size + 250`;
    if(sayac) {
        if(sayaçkişi <= message.guild.members.size) {
            message.channel.send(`🎉 Tebrikler **${message.guild.name}**! Başarıyla ${sayaçkişi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
            db.delete(`sayaç_${message.guild.id}`);
            db.delete(`sayaçkişi_${message.guild.id}`);
        }
    }
});

  


client.on("message", async message => {
  if (message.content.toLowerCase() === prefix + "herkeserolver") {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Üzgünüm, yetkin yok!')
let muterole = message.guild.roles.find(r => r.name === `${args[0]}`);
if(!muterole) return message.reply(`Bu Komutu Kullanmak İçin : ${prefix}herkeserolver <Rol İsmi> Olarak Yazmalısınız.`);
        const m = await message.channel.send("Veriyorum abi 1 sn.")
      message.guild.members.forEach(async (member, id) => {
        await member.addRole(muterole)
        m.edit(` ***${message.guild.members.size}*** kişiye ***${args[0]}*** adlı rol verildi!`)
      });
  }
})




client.on('message', async message => {
if (message.content.toLowerCase() === prefix +  "herkestenrolal") {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Üzgünüm, yetkin yok!')
let muterole = message.guild.roles.find(r => r.name === `${args[0]}`);
if(!muterole) return message.reply(`Bu Komutu Kullanmak İçin : ${prefix}herkestenrolal <Rol İsmi> Olarak Yazmalısınız.`);
        const m = await message.channel.send("Alıyorum abi 1 sn.")
      message.guild.members.forEach(async (member, id) => {
        await member.removeRole(muterole)
        m.edit(` ***${message.guild.members.size}*** kişiden ***${args[0]}*** adlı rol alındı!`)
      });
  }
})






     var scarew = require("google-tts-api")


/*client.on('message', async message => {
  
let chan = client.channels.get("505987855307243573") 
    if (message.channel.id === chan.id) {
message.delete()}
chan.guild.createChannel(`talep-${message.author.tag}`)
});*/


//i yi algılamiyo

/*client.on('message', async message => {
  let chan = client.channels.get("505987855307243573") 
    if (message.channel.id === chan.id) {
message.delete()}
    message.guild.createChannel(`talep-${message.author.username}`, 'text').then(ch => {
        ch.overwritePermissions(message.member.roles.first(),{
            VIEW_CHANNEL: false,
        }).catch()
        message.guild.roles.forEach((role) => {
            if (role.hasPermission("BAN_MEMBERS")) {
                ch.overwritePermissions(role,{
                    VIEW_CHANNEL: true,
                }).catch()
                ch.overwritePermissions(message.author.id,{
                    VIEW_CHANNEL: true,
                }).catch()
            }
        })

        const embed = new Discord.RichEmbed()
        .setTitle(`» Hey ${message.author.username} !`)
        .setAuthor("» Vegas Bot | Destek Sistemi")
        .setDescription("**Buradaki destek ekibimiz sizinle ilgilenecektir.\nDestek talebini iptal etmek için [!!kapat](https://discord.gg/3BRXB2q) yazabilirsin!**")
        .setFooter('Vegas Bot | Destek Sistemi', client.user.avatarURL)
        .setTimestamp()
        ch.send(embed).catch()
        ch.send("@here")
        ch.awaitMessages((msg)=> {
            if (msg.content === "!!kapat") {
                ch.send("`Talebiniz iptal ediliyor!`").then(()=>{
                    setTimeout(()=> {
                        ch.delete().catch()
                    },1000)
                });
            }
        },{time:86400000})
    })
});*/

client.on("message", message => {
  const dmchannel = client.channels.find("name", "╠🌊vgs-dm1🌊");
  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      dmchannel.sendMessage("", {embed: {
              color: 3447003,
              title: `DM Atan Kişi: **${message.author.tag}**`,
              description: `Dm Mesajı: **${message.content}**`
            }})
  }
  if (message.channel.bot) return;
});


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

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.burhan) permlvl = 4;
  if (message.author.id === ayarlar.nukro) permlvl = 4;
  if (message.author.id == ayarlar.loxy) permlvl = 4;
  return permlvl;
};

client.on('guildCreate', guild => {
let giris = new Discord.RichEmbed()
.setColor(0x36393E)
.setDescription(`:inbox_tray: **_Bot bir sunucuya eklendi._ :yellow_heart:**\n:white_small_square: | **Bot,** ${guild.name} **adlı sunucuya eklendi.**\n:white_small_square: | **Sunucunun sahibi**: ${guild.owner}\n:white_small_square: | **Sunucuda bulunan kişi**: ${guild.memberCount}`)
.setFooter(`Vegas Bot Log | Sunucu ID: ${guild.ownerID}`, client.user.avatarURL)
   client.channels.get('505990163311230987').send(giris);
});
        

   
client.on('guildDelete', guild => {
let cikis = new Discord.RichEmbed()
.setColor(0x36393E)
.setDescription(`:outbox_tray: **_Bot bir sunucudan atıldı._ :frowning:**\n:white_small_square: | **Bot,** ${guild.name} **adlı sunucudan çıkarıldı.**\n:white_small_square: | **Sunucunun sahibi**: ${guild.owner}`)
.setFooter(`Vegas Bot Log | Sunucu ID: ${guild.ownerID}`, client.user.avatarURL)
 client.channels.get('505990163311230987').send(cikis);
});

const os = require('os')
client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'botbilgi') {
const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const emoji = (client.emojis.find("name", "loading").toString())
      const js = (client.emojis.find("name", "dcnitro").toString())
	const pingozel = new Discord.RichEmbed()
    .setColor(0x36393F)
.setDescription("Vegas Bot Bot Bilgi")
.addField(`<:bot:498364551155154954> Bot Kurucusu/Sahibi:`, `<@348097494548348940>`, true)
  .addField(`<:bot:498364551155154954> Üst Düzey Destek Verenler:`, ` \n <@466916292100882432>\n <@245225049882099713> \n<@474288593515315201>`, true)
  .addField("<:bot:498364551155154954> Destek Verenler:", `<@336586436700667907> \n <@406850731904204803>`, true)
  .addField("<:evet:492394035680378890> Shard:", '1/1', true)
	.addField("<:biletvegas:500168163128901644> Bellek Kullanımı:", `${(process.memoryUsage().heapUsed / 1028 / 1028).toFixed(2)} MB`, true)
  .addField("<:ipucu:500166686486298655> Sunucu Sayısı:", `${client.guilds.size.toLocaleString()}`, true)
  .addField("<:ipucu:500166686486298655> Kullanıcı Sayısı:", `${client.users.size}`, true)
  .addField("<:ipucu:500166686486298655> Toplam Kullanıcı Sayısı:", `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField("<:ipucu:500166686486298655> Kanal Sayısı:", `${client.channels.size.toLocaleString()}`, true)
  .addField(`${emoji} Ne Kadar Süredir Aktif:`, `${duration}`, true)
  .addField("<:durum:500166411188961280> Ping:", `${client.ping}`, true)
  .addField("<:js:500165952923631620> Discord.js Sürümü:", `${Discord.version}`, true)
  .addField(`${js} Premium:`, "Aktif Değil", true)
  .addField(`<:bot:498364551155154954> İşletim Sistemi:`, `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``, true)
  .addField(`Davet Et`, `[Tıkla](https://discordapp.com/oauth2/authorize?client_id=510158067480920065&scope=bot&permissions=2146958591)`, false)
  message.channel.sendEmbed(pingozel)
    }
});

client.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    let memberID = await db.fetch(`memberID_${message.author.id}`);
    if (memberID == null) memberID = 'Biyografi mesaji ayarlanmamis.'
    var user = message.mentions.users.first() || message.author;
      const args = message.content.substring(prefix.length).split(" ");
      const command = args.shift().toLowerCase();
      if (command === "bioayarla" || command === "biyografi") {
        if (args.join(' ').length > 35) return message.channel.send(`En fazla 35 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: !!biyografi Lifely`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberID_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(`:white_check_mark: Yeni biyografin ayarlandı.`)
        })
    }
});

client.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    let memberNick = await db.fetch(`memberNick_${message.author.id}`);
    if (memberNick == null) memberNick = 'İsim ayarlanmamış.'
    var user = message.mentions.users.first() || message.author;
      const args = message.content.substring(prefix.length).split(" ");
      const command = args.shift().toLowerCase();
      if (command === "isimdeğiştir" || command === "isimayarla") {
        if (args.join(' ').length > 35) return message.channel.send(`En fazla 35 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: !!isimayarla Vegas`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberNick_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(`:white_check_mark: Yeni ismin ayarlandı.`)
        })
    }
});

client.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    let memberInstagram = await db.fetch(`memberInstagram_${message.author.id}`);
    if (memberInstagram == null) memberInstagram = 'Instagram ayarlanmamış.'
    var user = message.mentions.users.first() || message.author;
      const args = message.content.substring(prefix.length).split(" ");
      const command = args.shift().toLowerCase();
      if (command === "instagram" || command === "instagramayarla") {
        if (args.join(' ').length > 35) return message.channel.send(`En fazla 35 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: !!instagram Vegas`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberInstagram_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(`:white_check_mark: Instagram ayarlandı.`)
        })
    }
});


  





client.on("message", async message => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
  if(message.content.indexOf(prefix) !== 0) return;
 
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
 
 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client, message, args)
 
})
 
client.on("message", async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    if (command === "mod-log-ayarla" || command === "modlogayarla" || command === "mod-logayarla" || command === "modlog") {
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!message.mentions.channels.first() && args.join(" ").toLowerCase() === `none`)
            return message.channel.send("Geçerli bir kanal etiketlemelisin.\nDoğru kullanım: ${prefix}mod-log-ayarla [#kanal]")
        let newChannel;
        if (args.join(" ").toLowerCase() === `none`) newChannel = '';
        else newChannel = message.mentions.channels.first().id;
        db.set(`membermodChannel_${message.guild.id}`, newChannel).then(i => {
            const ayarlar2 = new Discord.RichEmbed().setFooter(`${process.env.basarili} Mod-Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
            return message.channel.send(`${process.env.basarili} Mod-Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
        })
    }
});
 
 
 
 
 
client
 
       
        .on('guildBanAdd', async (guild, member) => {
   const embed = new Discord.RichEmbed()
                        .setTitle('Üye yasaklandı.')
                        .setAuthor(member.user.tag, member.user.avatarURL)
                        .setColor("BLUE")
                        .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
                        .setThumbnail(member.user.avatarURL)
                        .setFooter(`Vegas Bot Log Sistemi | ID: ${member.user.id}`)
                        .setTimestamp();
            let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embed)
 
               
        })

.on('messageUpdate', async (oldMessage, newMessage) => {
 if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
  let embedds4 = new Discord.RichEmbed()
        .setColor("#0080ff")
        .setAuthor(`Mesaj Güncellendi!`)
        .setThumbnail(oldMessage.author.avatarURL)
        .addField("Gönderen", oldMessage.author.tag, true)
        .addField("Önceki Mesaj", `\`\`\`${oldMessage.content}\`\`\``, true)
        .addField("Şimdiki Mesaj", `\`\`\`${newMessage.content}\`\`\``, true)
        .addField("Kanal", newMessage.channel.name, true)
    let membermodChannel = await db.fetch(`membermodChannel_${oldMessage.guild.id}`)
    if (!oldMessage.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else oldMessage.guild.channels.get(membermodChannel).send(embedds4)
})
       
        .on('guildBanRemove', async (guild, member) => {
                        var embed = new Discord.RichEmbed()
                        .setTitle('Üyenin yasaklaması kaldırıldı.')
                        .setAuthor(member.user.tag, member.user.avatarURL)
                        .setColor("BLUE")
                        .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
                        .setThumbnail(member.user.avatarURL)
                        .setFooter(`Vegas Bot Log Sistemi | ID: ${member.user.id}`)
                        .setTimestamp();
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embed)
               
        })
       
        .on('messageDelete', async msg => {
 
                        var embed = new Discord.RichEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL)
                        .setColor("BLUE")
                        .setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen \`\`\`${msg.content}\`\`\` mesajı silindi.`)
                        .setFooter(`Vegas Bot Log Sistemi | ID: ${msg.id}`)
    let membermodChannel = await db.fetch(`membermodChannel_${msg.guild.id}`)
    if (!msg.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else msg.guild.channels.get(membermodChannel).send(embed)          
               
        })
 
        .on('channelCreate', async channel => {
 
               
                        if (channel.type === "text") {
                                var embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
                                .setFooter(`Vegas Bot Log Sistemi | ID: ${channel.id}`)
                                 let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embed)                      
                        };
                        if (channel.type === "voice") {
                                var embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
                                .setFooter(`Vegas Bot Log Sistemi | ID: ${channel.id}`)
         let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embed)                       }
                        })
               
        .on('channelDelete', async channel => {
 if (channel.type === "text") {
                                let embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
                                .setFooter(`Vegas Bot' Log Sistemi | ID: ${channel.id}`)
         let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embed)
                        };
                        if (channel.type === "voice") {
                                let embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
                                .setFooter(`Vegas Bot Log Sistemi | ID: ${channel.id}`)
 let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embed)                       }
               
        })

client.on('message', async (msg, member, guild, id) => {
    db.fetch(`saas_${msg.guild.id}`).then(i => {
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Hoşgeldin!');      
      } 
      }
    });                                          
    });

client.login(ayarlar.token);  