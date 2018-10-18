const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '*'

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

client.on('message', message => {
  if(message.content.startsWith("#credit <@500019474494128139>","#credits <@500019474494128139>")) {
    let role = message.guild.roles.find("name", "Donatour");
    if(!role) {
      return message.channel.send('مشكور على لمساعده ❤');
    }
      message.member.addRole(role);
      let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("مشكور والله على مساعده انا عطيتك رتبة ");

        message.author.sendEmbed(embed);
  }
});
 
client.on('message', message => {
    if (message.content.startsWith("رابط")) {

  message.channel.createInvite({
        thing: true,
        maxUses: 4,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
  message.channel.send("**تم ارسال الرابط برسالة خاصة**")

message.author.send(`**مدة الرابط : يـوم
عدد استخدامات الرابط : 4**`)


    }
});

client.login(process.env.BOT_TOKEN2);
