const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const useful = require('useful-tools');
const path = require('path');
const snekfetch = require('snekfetch');
const queue = new Map();


client.gg = function() {
     //asdsaas patlatma komutları asdadas
}

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


client.on('guildMemberAdd' , async member => {
    let zaman = useful.tarih(member.user.createdAt)
    let kanal1 = member.guild.channels.get(ayarlar.hgkanalid)
  kanal1.send(
    new Discord.RichEmbed()
  .setDescription(`
  <a:kirmi:737779840773521449> **${member} ${member.guild.name} Sunucumuza Hoşgeldin , Seninle Beraber Toplam \`${member.guild.memberCount}\` Kişiyiz.**

  <a:kirmi:737779840773521449> **Kayıt Olmak İçin Ses Teyit Kanalına Giriş Yapabilirsin !**

  <a:kirmi:737779840773521449> **<@&${ayarlar.kayıtcırolid}> Rolündekiler Seninle İlgilenecektir !**

  <a:kirmi:737779840773521449> **Hesabın Kuruluş Tarihi : \`${zaman}\`**
  
  <a:kirmi:737779840773521449> **Ailemize Katılmak İçin \`${ayarlar.tag}\` Tagımızı Alabilirsin !**
  `)
    .setImage("https://media.discordapp.net/attachments/608711494279888952/741890644183613491/ses2.gif")
)
  kanal1.send(`<@&${ayarlar.kayıtcırolid}>`).then(msg => msg.delete(5000))
});
client.on('message' , async message => {
  if(message.content === "tag") {
    message.channel.send(ayarlar.tag)
  }
    if(message.content === "!tag") {
    message.channel.send(ayarlar.tag)
  }
})
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "⁶⁰⁶"; //tagınız
    let sunucu = "744658041583960095"; //sunucu ID
    let kanal = "744658323982516253" //log kanal id
    let rol = "744658291929645186"; // rol ID
    if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(kanal).send(`${newUser} ${tag} tagını aldığı için Crew rolünü kazandı!`)
      client.guilds.get(sunucu).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
      client.channels.get(kanal).send(`${newUser} ${tag} tagını çıkardığı için Crew rolünü kaybetti!`)
    }

  }
})  // aga kalk sikiş var - avezy // uuuuu