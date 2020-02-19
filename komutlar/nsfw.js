const Discord = require('discord.js')
exports.run = (client, msg, args) => {
 if(msg.channel.nsfw || msg.channel.type === 'dm'){
   let embed = new Discord.RichEmbed()
   msg.channel.send(':underage: Kardeşim ne kadar sapıksın sg :underage:')
}
 else{
       msg.channel.send({embed: {
color: Math.floor(Math.random() * (0x36393F + 1)),
description: ('Bu kanal NSFW(Not Safe For Work) kanalı değil!')
 }})
 }
};
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['nsfw'],
   permLevel: 0
 };

 exports.help = {
   name: 'hd',
   description: 'NSFW bir resim g�sterir.',
   usage: 'hd'
 };