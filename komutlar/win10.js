const Discord = require('discord.js');

exports.run = (client, message, args) => {
  message.channel.send('Düğmeye basıyorum!').then( msg => {
    
            setTimeout(() => {
    
                msg.edit('%27');
    
            }, 500);
    
            setTimeout(() => {
    
                msg.edit('%55');
    
            }, 1000);
    
            setTimeout(() => {
    
                msg.edit('%73');
    
            }, 1500);
    
            setTimeout(() => {
    
                msg.edit('%76');
    
            }, 2000);
    
            setTimeout(() => {
    
                msg.edit('%87');
    
            }, 2500);
    
            setTimeout(() => {
    
                msg.edit('%93');
    
            }, 3000);
    
            setTimeout(() => {
    
                msg.edit('%99');
    
            }, 3500);
    
            setTimeout(() => {
    
                msg.edit('https://bitpage.de/wp-content/uploads/2017/07/windows-10-starten-animation.gif');
    
            }, 3500);
    
            setTimeout(() => {
    
                msg.edit('https://philipyip.files.wordpress.com/2017/04/startupissue2.gif');
    
            }, 10000);
    
        });
    
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'windows',
  description: 'pencevev',
  usage: 'windows'
};


