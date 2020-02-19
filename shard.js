const Discord = require('discord.js');
const client = new Discord.Client()
const adamlik = new Discord.ShardingManager('./server.js', {
    totalShards: 'auto', // shard sayısı ya da auto yazılabilir
    token: 'NTEwMTU4MDY3NDgwOTIwMDY1.Ds2sIQ.9YlGIGT8bmig8AtwZNVWdDZYM3A' // token
});

adamlik.spawn(); // bullshit

adamlik.on('launch', shard => {
  console.log(`${shard.id} IDli shard başarıyla başlatıldı.`)
});

setTimeout(() => {
    console.log("yeniden başlatılıyor..")
    adamlik.broadcastEval("process.exit()");
}, 21600000);
