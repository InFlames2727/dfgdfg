exports.run = (client, message, args) => {
  var lbrs = 'LifeBugraRS#0797'
  var nkr = 'Nukro#7438'
  var krts ='Kratos#7411'
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(":no_entry: Bu komudu kullanabilmek için birini etiketlemelisin. `!!deathnote @Loxy's#2494`")
  var kys = [""
             ,"Vegas Deathnote - Hangman"
      ,"   ________"
      ,"   |/      |"
      ,`   |      (_)   <--- ${user.username}`
      ,"   |      \\|/"
      ,"   |      / \\"
      ,"   |"
      ,"  _|___"
  ].join("\n");
let member = message.mentions.members.first()
if(member.id === "245225049882099713") return message.channel.send(`:no_entry: Bu komudu yapımcılarımdan biri olan **${lbrs}** üstünde kullanamazsın.`)
if(member.id === "348097494548348940") return message.channel.send(`:no_entry: Bu komudu yapımcılarımdan biri olan **${krts}** üstünde kullanamazsın.`)  
if(member.id === "466916292100882432") return message.channel.send(`:no_entry: Bu komudu yapımcılarımdan biri olan **${nkr}** üstünde kullanamazsın.`) 
if(member.id === "510158067480920065") return message.channel.send(`:no_entry: Bu komudu benim üzerimde kullanamazsın kullanamazsın.`)   
  message.channel.sendCode('ascii', `${kys}`);
  message.channel.send(`< ${user.username}'i öldürme görevi başarılı, ${message.author.username}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['deathnote','death','adamasmaca'],
  permLevel: 0
};

exports.help = {
  name: 'adamasma',
  description: 'dednot biç',
  usage: 'adamasma'
};
