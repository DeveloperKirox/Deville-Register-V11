const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
exports.run = async(client , message , args) => {
function embed(desc) {
var embed = new Discord.RichEmbed()
.setAuthor(message.author.username , message.author.avatarURL)
.setDescription(desc)
.setFooter("Created Team Unbesiegbar")
.setTimestamp()
message.channel.send(embed)
}
  if(message.channel.id !== ayarlar.kayıtchat) return embed(`<a:743124230815612939:744665688932614185> Bu Komut Sadece <#${ayarlar.kayıtchat}> Kanalında Kullanılabilir !`)
if(!message.member.roles.has(ayarlar.kayıtcırolid)) return embed(`<a:743124230815612939:744665688932614185> Bu Komutu Kullanabilmek için <@&${ayarlar.kayıtcırolid}> Rolüne İhtiyacın Var !`)
let kullanıcı = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!kullanıcı) return embed(`<a:ss:744671328736510042> Kayıt Edeceğin Kullanıcıyı Etiketlemen Gerek !`)
let isim = args[1];
  let yaş = args[2];
 if(!isim) return embed(`<a:ss:744671328736510042> Kayıt Edeceğin Kullanıcıyı Etiketlemen Gerek !`);
 if(!yaş) return embed(`<a:ss:744671328736510042> Kayıt Edeceğin Kullanıcıyı Etiketlemen Gerek !`);
await kullanıcı.setNickname(`${isim} | ${yaş}`);
await kullanıcı.addRole(ayarlar.kadınrolid);
  await kullanıcı.removeRole(ayarlar.kayıtsızrolid)
  embed(`
  **Bir \Kadın\ Üye Kayıt Edildi !**
<a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889>
  **<a:ss:744671328736510042> Kayıt Edilen Kullanıcı : **${kullanıcı}

  **<a:ss:744671328736510042> Kayıt Eden Yetkili : **${message.author}

  **<a:ss:744671328736510042> Verilen Rol : **<@&${ayarlar.kadınrolid}>

  **<a:ss:744671328736510042> Alınan Rol : **<@&${ayarlar.kayıtsızrolid}>
<a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889><a:rainbow:744604119276453889>

`)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["k" , "girl" , "g" , "kız"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kadın',
  };