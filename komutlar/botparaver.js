const db = require("quick.db");
const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, args) => {
  let cooldown = 1,
    amount = 500.0;

  let lastDaily = await db.fetch(`lastDaily_${message.author.id}`);
  try {
    db.fetch(`userBalance_${message.member.id}`).then(bucks => {
      if (bucks == null) {
        db.set(`userBalance_${message.member.id}`, 0);
      } else if (
        lastDaily !== null &&
        cooldown - (Date.now() - lastDaily) > 0
      ) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));

        let lastDailyEmbed = new Discord.RichEmbed()
          .setColor(0x36393e)
          .setDescription(`:atm: | Bugünkü hakkın dolmuş. Yarın bir daha dene`)
          .setFooter("Vegas Bot", client.user.avatarURL);
        message.channel.send(lastDailyEmbed);
      } else {
        db.set(`lastDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.member.id}`, amount).then(i => {
          var discord = require("discord.js");
          var embed = new Discord.RichEmbed()
            .setDescription(
              `:atm: ${amount}₺ para hesabına yattı, 12 saatte bir gelerek maaşını alabilirsin.`
            )
            .setColor(0x36393e)
            .setFooter("Vegas Bot", client.user.avatarURL);
          message.channel.send(embed);
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "bottanparaal",
  description: "banka",
  usage: "bottanparaal"
};
