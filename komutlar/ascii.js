const Discord = require('discord.js');
const Jimp = require('jimp'); 
var figlet = require('figlet');

exports.run = (client, message, args) => {
    if (args.join(' ').length > 14) return message.channel.send(":no_entry: En fazla 14 karakter girebilirsiniz. Lütfen düzgün karakterler giriniz.")
    if (!args.join(' ')) return message.channel.send(":no_entry: Lütfen ASCII olacak yazıyı giriniz. `!!ascii Vegas Bot`")
  
      figlet(args.join(' '), (err, data) => {
          message.channel.send('```' + data + '```')
    })    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ascii',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'ascii'
};