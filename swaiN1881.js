const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const db = require("quick.db")
const moment = require('moment');
client.conf = {"pref": process.env.prefix, "own": process.env.OWNER} 
    client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.conf.pref)) return;
  let command = message.content.split(" ")[0].slice(client.conf.pref.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})


client.on("ready", () => {  console.log(`[swaiN] ${client.user.username} ismi ile çalışıyorum!`);
  client.user.setStatus("idle")
  client.user.setActivity("By ` swaiN#1881`");
  console.log(` Oynuyor ayarlandı!`);
 });

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^READY.JS RİCH PRECENCE^^^^^^^^^^^^^^^^^^^^^^
var prefix = client.conf.prefix;

const log = message => {
  console.log(`[ADLMedia] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklenmeye hazır. Başlatılıyor...`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut yükleniyor: ${props.help.name}'.`);
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
      let cmd = require(`./komular/${command}`);
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


//^^^^^^^^^^^^^^^^^^^^SYNC KOMUTLARI^^^^^^^^^^^^^^^^
client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
  if(message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 4;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 5;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 6;
  if(message.author.id === message.guild.ownerID) permlvl = 7;
  if(message.author.id === client.conf.own) permlvl = 8;
  return permlvl;
};

//MAİNE ATKLACAKLAR AŞŞAĞIYA









 






// MAİNE ATILACAKLAR YUKA










 client.login(process.env.TOKEN);




////////////////////////////
//////////Dash kısmı////////////

const dc = require("discord.jsv2");
const dcc = new dc.Client();

client.ayar = db;
client.config = require("./ayarlar.js");
client.ayarlar = require("./ayarlar.js")

dcc.ayar = db;
dcc.config = require("./ayarlar.js");
dcc.ayarlar = require("./ayarlar.js")


require("./modüller/fonksiyonlar.js")(dcc);

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  dcc.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
    dcc.appInfo = await client.fetchApplication();
  }, 60000);
  require("./modüller/panel.js")(dcc, client);
});

dcc.login(process.env.TOKEN);