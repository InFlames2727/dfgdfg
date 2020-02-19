const Discord = require(`discord.js`);
const Jimp = require(`jimp`);

exports.run = async (client, message, args) => {
 let member = message.mentions.members.first();
 var user = message.mentions.users.first() || message.author; 
  const load = (client.emojis.find("name", "loading").toString())
  message.channel.send(`${load} | **Kayıp** filtresi uygulanıyor.`).then(m => m.delete(3000));
  
  Jimp.read(`https://cdn.discordapp.com/attachments/469606974548344853/500670303001640961/kayp.png`, (err, image) => {
    image.resize(295, 295)

    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(155, 155)
        image.composite(avatar, 75, 12).write(`./img/kayıp/LIFELY-kayıp-${user.username}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/kayıp/LIFELY-kayıp-${user.username}.png`));
            message.channel.send(`😦 Kayıp, **${user.username}** bulanların bizi aramamasını rica ederiz.`)  
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
 name: 'kayıp',
 description: 'eyvah nerde bu orospu cocu',
 usage: 'kayıp'
};