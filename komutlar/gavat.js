const Discord = require(`discord.js`);
const Jimp = require(`jimp`);
let krts = "Kratos#4711"
exports.run = async (client, message, args) => {
 let member = message.mentions.members.first();
 var user = message.mentions.users.first() || message.author; 
    const load = (client.emojis.find("name", "loading").toString())

  message.channel.send(`${load} | **Gavat** filtresi uygulanıyor.`).then(m => m.delete(3000));
  
  Jimp.read(`https://cdn.discordapp.com/attachments/469606974548344853/498908536470896640/gavat.png`, (err, image) => {
    image.resize(295, 295)

    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(155, 155)
        image.composite(avatar, 75, 12).write(`./img/gavat/LIFELY-gavat-${user.username}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/gavat/LIFELY-gavat-${user.username}.png`));
            message.channel.send(`🇴 🇨 | Gavat :( **${user.username}**`)  
        }, 1000);
      });
    });

};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["gavat"],
 permLevel: 0
};

exports.help = {
 name: 'gavatol',
 description: 'gavat oldun :C',
 usage: 'gavatol'
};