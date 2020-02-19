const Discord = require ('discord.js');
module.exports.run = async (bot, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (!args[0]) return message.channel.send("Müzik dinleyen birisini etiketle.")
  
    if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
        try {
            var trackImg = user.presence.game.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            var trackName = user.presence.game.details;
            var trackAlbum = user.presence.game.assets.largeText;
            var trackAuthor = user.presence.game.state;

            const embed = new Discord.RichEmbed()
                .setAuthor('Spotify Şarkı Bilgisi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2000px-Spotify_logo_without_text.svg.png')
                .setColor(0xdb954)
                .setThumbnail(trackImg)
                .setFooter(`Vegas Bot.`, bot.user.avatarURL)
                .setDescription(`
\ **Şarkı ismi**:  \`${trackName}\`
\ **Albüm**:  \`${trackAlbum}\`
\ **Sanatçı**:  \`${trackAuthor}\`
`)
                .addField('Şarkı linki :', `[${trackUrl}](${trackUrl})`, false);
                
            return message.channel.send(embed);

        } catch (error) {
            return message.channel.send(`<:VEGAShayir:509821778064048128> **${user.tag}** geçerli bir şarkı dinlemiyor.`);
        }

    } else {
        return message.channel.send(`<:VEGAShayir:509821778064048128> **${user.tag}**, Spotify kullanmıyor.`);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'spotify',
  description: '',
  usage: 'spotify'
};