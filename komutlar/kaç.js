const Discord = require(`discord.js`);
const Jimp = require(`jimp`);

exports.run = async (client, message, args) => {
 let member = message.mentions.members.first();
 var user = message.mentions.users.first() || message.author; 
  const load = (client.emojis.find("name", "loading").toString())
  message.channel.send(`${load} | **Kaçış** filtresi uygulanıyor.`).then(m => m.delete(3000));
  
  Jimp.read(`http://images.policemag.com/articles/M-WinningEdge-77.jpg`, (err, image) => {
    image.resize(295, 295)

    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(100, 100)
        image.composite(avatar, 25, 45).write(`./img/run/LIFELY-run-${user.username}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/run/LIFELY-run-${user.username}.png`));
            message.channel.send(`🏃 | Kaç bro kaç! **${user.username}**`)  
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
 name: 'kaç',
 description: 'run',
 usage: 'kaç'
};