const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
exports.run = async(client , message , args) => {
function embed(desc) {
var embed = new Discord.RichEmbed()
.setAuthor(message.author.username , message.author.avatarURL)
.setDescription(desc)
.setThumbnail(message.author.avatarURL)
.setFooter("Created Team Unbesiegbar")
message.channel.send(embed)
}
if(!message.member.roles.has(ayarlar.jailrolid)) return embed(`<a:shanksok:743033775809757234> Bu Komutu Kullanabilmek İçin <@&${ayarlar.jailrolid}> Rolüne İhtiyacın Var !`)
let kullanıcı = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!kullanıcı) return embed(`<a:shanksok:743033775809757234>  Jaile Atacağın Kullanıcıyı Etiketlemen Gerek!`)
  let sebep = args[1];
  if(!sebep) return
    embed(`Lütfen Bir Sebep Girerek Yeniden Dene !`)
await kullanıcı.setRoles([ayarlar.jail])
  embed(`
  **${message.author} Adlı Yetkili ${kullanıcı} Adlı Kullanıcıyı ${sebep} Nedeniyle Jaile Attı.**
  `)
  let log = message.guild.channels.get(ayarlar.jaillogid)
log.send(
new Discord.RichEmbed()
.setAuthor(message.author.username , message.author.avatarURL)
.setDescription(`**${message.author} Adlı Yetkili ${kullanıcı} Adlı Kullanıcıyı ${sebep} Nedeniyle Jaile Attı.**`)
.setFooter("Created Team Unbesiegbar")
)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'jail',
  };