const Discord = require('discord.js');
const cheerio = require('cheerio');
var request = require('request');

exports.run = async (bot, message, args) => {
  
try{
  function getStatData(location, message , $){

  var selector = $('.stats-stat .value').eq(location).text();

  var stat_array = $.parseHTML(selector);

  var stat = 0;

  if(stat_array == null || stat_array.lengh == 0){
    message.channel.send("❌ Kullanıcı Bulunamadı!");
    return " ";
  }else{
    stat = stat_array[0].data;
  }

  return stat;
}

     var UR_L = "http://csgo.tracker.network/profile/" + args[0];

        if(!args[0]) return message.channel.send("❌ Lütfen doğru bir Steam ID yada kullanıcı adı giriniz.");
        

        request(UR_L, function(err, resp, body){

            $ = cheerio.load(body);

            var WIN = getStatData(1, message, $);
            var HS = getStatData(4, message, $);
            var MONEY = getStatData(5, message, $);
            var SCORE = getStatData(6, message, $);
            var KILLS = getStatData(7, message, $);
            var DEATHS = getStatData(8, message, $);
            var MVP = getStatData(9, message, $);
            var BS = getStatData(13, message, $);
            var BD = getStatData(14, message, $);
            var HR = getStatData(15, message, $);

            const STAT = new Discord.RichEmbed()

            .setTitle("CS:GO ISTATISTIKLER")
            .setColor("#45b72c")           
            .addField("Kazanma", `${WIN}%`, true)
            .addField("Kurtarılan Rehineler", HR, true)
            .addField("Toplam Para", MONEY, true)
            .addField("Toplam Skor", SCORE, true)
            .addField("Öldürmeler", KILLS, true)
            .addField("Ölümler", DEATHS, true)
            .addField("MVP", MVP, true)
            .addField("Kurulan Bombalar", BS, true)
            .addField("Çözülen Bombalar", BD, true)
            .addField("Kafadan Vurmalar", HS);
            return message.channel.send(STAT);
           })
}catch(e){
message.channel.send("❌ Bu üye hakkında bir veri bulamıyorum.")
}
}
        
        
        
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['csgo'],
  permLevel: 0
};

exports.help = {
  name: 'csgo',
  description: "Belirtilen ID yada Nick in Cs:Go istatistiklerini gösterir.",
  usage: 'csgo [id, nick]'
};