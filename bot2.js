
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ''

client.on('ready', () => { //console.log
  console.log('--------------------------');
  console.log(' Bot Is Online')
  console.log('--------------------------')
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('--------------------------')
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('--------------------------')
  console.log(`servers! * [ " ${client.guilds.size} " ]`);
  console.log('--------------------------')
  console.log(` Users! * [ " ${client.users.size} " ]`);
  console.log('--------------------------')
  console.log(`channels! * [ " ${client.channels.size} " ]`);
 
  });
client.on('ready', () => { //playing
    client.user.setGame(`#Venom 5k`,'https://www.twitch.tv/clo_wiin');
    client.user.setStatus('Online')
});


client.login(process.env.BOT_TOKEN);
