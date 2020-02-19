const Discord = require(`discord.js`);
const Jimp = require(`jimp`);
let krts = "Kratos#4711"
exports.run = async (client, message, args) => {
 let member = message.mentions.members.first();
 var user = message.mentions.users.first() || message.author; 
  const load = (client.emojis.find("name", "loading").toString())
  message.channel.send(`${load} | **Yavşak** filtresi uygulanıyor.`).then(m => m.delete(3000));
  Jimp.read(`https://cdn.discordapp.com/attachments/469606974548344853/501042511892971520/uug.png`, (err, image) => {
    image.resize(710, 473)

    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(150, 150)
        image.composite(avatar, 343, 30).write(`./img/yavsak/Kratos-${user.username}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/yavsak/Kratos-${user.username}.png`));
            message.channel.send(`:frowning: **${user.username}**, adlı üye orospu cocuklu yapıyor.`)  
        }, 1000);
      });
    });

};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['yavsak'],
 permLevel: 0
};

exports.help = {
 name: 'yavşak',
 description: 'yavşak',
 usage: 'yavşak'
};