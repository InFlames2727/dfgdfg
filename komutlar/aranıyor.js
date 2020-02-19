const Discord = require(`discord.js`);
const Jimp = require(`jimp`);

exports.run = async (client, message, args) => {
 let member = message.mentions.members.first();
 var user = message.mentions.users.first() || message.author; 
  const load = (client.emojis.find("name", "loading").toString())
  message.channel.send(`${load} | **Aranıyor** filtresi uygulanıyor.`).then(m => m.delete(3000));
  
  Jimp.read(`https://cdn.discordapp.com/attachments/469606974548344853/501026267798175756/aranuyr.png`, (err, image) => {
    image.resize(295, 295)

    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(179, 135)
        image.composite(avatar, 56, 100).write(`./img/araniyor/LIFELY-wanted-${user.username}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/araniyor/LIFELY-wanted-${user.username}.png`));
            message.channel.send(`😦 **${user.username}**, Adlı kullanıcı aranıyor. Bulanlar ihbar ederse seviniriz | Vegas Bot 2018`)  
        }, 1000);
      });
    });

};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['aranıyor'],
 permLevel: 0
};

exports.help = {
 name: 'wanted',
 description: 'wanted',
 usage: 'wanted'
};