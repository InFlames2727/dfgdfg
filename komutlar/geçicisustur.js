const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!geçicisustur@üye 1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  	const hata = new Discord.RichEmbed()
     .setColor(0x36393E)
     .setTitle(':x: | !sustur <kullanıcı> <süre> olarak yapınız.')
     .setFooter(`Vegas Bot - Tüm hakları saklıdır.`, bot.user.avatarURL)
  if(!tomute) return message.channel.send(hata);
  const hata2 = new Discord.RichEmbed()
     .setColor(0x36393E)
     .setTitle(':x: | Yetkili birini yada yetkin yoksa kimse susturamazsın.')
     .setFooter(`UnderGround Bot - Tüm hakları saklıdır.`, bot.user.avatarURL)
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(hata2);
let muterole = message.guild.roles.find(r => r.name === "Muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
    	const hata3 = new Discord.RichEmbed()
     .setColor(0x36393E)
     .setTitle(':x: | !sustur <kullanıcı> <süre> olarak yapınız.')
     .setFooter(`Vegas Bot - Tüm hakları saklıdır.`, bot.user.avatarURL)
  if(!mutetime) return message.channel.send(hata3);

  await(tomute.addRole(muterole.id));
  message.channel.send(`:white_check_mark: | <@${tomute.id}> adlı kullanıcı ${ms(ms(mutetime))} susturuldu.`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`:white_check_mark: | <@${tomute.id}> adlı kullanıcının mute süresi dolduğu için kaldırıldı.`);
  }, ms(mutetime));



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['geçici-sustur', 'gsustur', 'sustur'],
  permLevel: 2
};

exports.help = {
  name: 'geçicisustur',
  description: 'Sureli Susturur.',
  usage: 'geçicisustur [Kullanıcı] [Süre]'
};