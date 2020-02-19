const Discord = require(`discord.js`);
const Jimp = require(`jimp`);

exports.run = async (client, message, args) => {
 let member = message.mentions.members.first();
 var user = message.mentions.users.first() || message.author; 
  const load = (client.emojis.find("name", "loading").toString())
  message.channel.send(`${load} | **👑 Kral** filtresi uygulanıyor.`).then(m => m.delete(3000));
  
  Jimp.read(`https://cdn.discordapp.com/attachments/469606974548344853/498902018056912896/BOK_GIBI_OLDIUU.png`, (err, image) => {
    image.resize(295, 295)

    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(155, 155)
        image.composite(avatar, 75, 12).write(`./img/kralol/LIFELY-kralol.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/kralol/LIFELY-kralol.png`));
            message.channel.send(`👑 | Yeni kral! **${user.username}**`)  
        }, 1000);
      });
    });

};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'kralol',
 description: 'kral oldun ho',
 usage: 'kralol'
};