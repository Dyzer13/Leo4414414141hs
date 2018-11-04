const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '*'
client.on('ready', function(){
    var ms = 10000 ;
    var setGame = [`.help ON ${client.guilds.size} Servers`,`.help ${client.users.size} Users`];
    var i = -1;
    var j = 0;
    setInterval(function (){
        if( i == -1 ){
            j = 1;
        }
        if( i == (setGame.length)-1 ){
            j = -1;
        }
        i = i+j;
        client.user.setGame(setGame[i],`http://www.twitch.tv/clo_wiin`);
    }, ms);

});

 

client.on('message',async message => {
  if(message.author.bot || message.channel.type === 'bc') return;
  let args = message.content.split(' ');
  if(args[0] === `${prefix}bc`) {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('- **أنت لا تملك الصلاحيات اللازمة لأستخدام هذا الأمر**');
    if(!args[1]) return message.channel.send('- **يجب عليك كتابة الرسالة بعد الأمر**');
  
    let msgCount = 0;
    let errorCount = 0;
    let successCount = 0;
    message.channel.send(`**- [ :bookmark: :: ${msgCount} ] ・عدد الرسائل المرسلة**\n**- [ :inbox_tray: :: ${successCount} ] ・عدد الرسائل المستلمة**\n**- [ :outbox_tray: :: ${errorCount} ]・عدد الرسائل الغير مستلمة**`).then(msg => {
      message.guild.members.forEach(g => {
        g.send(args.slice(1).join(' ')).then(() => {
          successCount++;
          msgCount++;
          msg.edit(`**- [ :bookmark: :: ${msgCount} ] ・عدد الرسائل المرسلة**\n**- [ :inbox_tray: :: ${successCount} ] ・عدد الرسائل المستلمة**\n**- [ :outbox_tray: :: ${errorCount} ]・عدد الرسائل الغير مستلمة**`);
        }).catch(e => {
          errorCount++;
          msgCount++;
          msg.edit(`**- [ :bookmark: :: ${msgCount} ] ・عدد الرسائل المرسلة**\n**- [ :inbox_tray: :: ${successCount} ] ・عدد الرسائل المستلمة**\n**- [ :outbox_tray: :: ${errorCount} ]・عدد الرسائل الغير مستلمة**`);
        });
      });
    });
  }
});

client.on('message', message => {
    if (message.content.startsWith("رابط")) {
 
  message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("| :white_check_mark:  | :heart:  تم ارسال الرابط على الخاص  ")
      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
                .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`
**
---------------------
-[${message.guild.name}]  هذا هو رابط سيرفر
---------------------
-هذا الرابط صالح ل 100 مستخدم فقط
---------------------
-هذا الرابط صالح لمده 24 ساعه فقط
---------------------
**`)
      message.author.sendEmbed(Embed11)
    }
});


client.on('message', function(message) {
    if (!message.member.hasPermissions(['ADMINISTRATOR'])){
            let command = message.content.split(" ")[0];
        if(message.content.includes('discord.gg')){
        message.reply (' ')
           if(!message.channel.guild) return message.reply('** This command only for servers**');
     message.member.addRole(message.guild.roles.find('name', 'Muted'));
    const embed500 = new Discord.RichEmbed()
      .setTitle(":x: | تمت معاقبتك")
            .addField(`** لقد قمت بمخالفة قوانين السيرفر من خلال نشر سيرفرات اخرى  **` , `**ملاحظة  : إن كآن هذآ الميوت عن طريق الخطأ تكلم مع الادآرة**`)
      .addField(`by`,`Ḿiĉhǿu`)
            .setColor("c91616")
            .setThumbnail(`${message.author.avatarURL}`)
            .setAuthor(message.author.username, message.author.avatarURL)
        .setFooter(`${message.guild.name} Server`)
     message.channel.send(embed500)
   
       
    }
    }
})


client.on('guildMemberAdd',member=>{
  if(member.guild.id !== "505076617945808897") return;
setTimeout(() => {

  client.channels.get("505076713441460234").sendMessage("**#Welcome to __North Network__ **");
},1500);

});

client.on("message", async message => {
  const prefix = config.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.id !== client.user.id || message.content.indexOf(client.config.prefix) !== 0) return;

  if (command === "1") {
    var count = 1; // Number of messages sent (modified by sendSpamMessage)
    var maxMessages = 100000; // Change based on how many messages you want sent

    function sendSpamMessage() {
      // You could modify this to send a random string from an array (ex. a quote), create a
      // random sentence by pulling words from a dictionary file, or to just send a random
      // arrangement of characters and integers. Doing something like this may help prevent
      // future bots from detecting that you sent a spam message.
      message.channel.send("تلفيل #" + count);

      if (count < maxMessages) {
        // If you don't care about whether the messages are deleted or not, like if you created a dedicated server
        // channel just for bot spamming, you can remove the below line and the entire prune command.
        message.channel.send("");
        count++;

        /* These numbers are good for if you want the messages to be deleted.
         * I've also noticed that Discord pauses for about 4 seconds after you send 9
         * messages in rapid succession, and this prevents that. I rarely have any spam
         * messages slip through unless there is a level up from mee6 or Tatsumaki. */
        let minTime = Math.ceil(2112);  // Rush RP1
        let maxTime = Math.floor(3779); // Arbitrary integer
        let timeToWait = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
        setTimeout(sendSpamMessage, timeToWait);
      } else {
        // Sends a message when count is equal to maxMessages. Else statement can be 
        // modified/removed without consequence.
        message.channel.send("------------------");
        message.channel.send("I AM FINISHED!!!");
        message.channel.send("------------------");
      }
    }

    message.delete().catch(O_o=>{})
    sendSpamMessage();
  }

  if (command === "2") {
    message.channel.fetchMessages()
    .then(messages => {
      let message_array = messages.array();
      message_array.length = 2;
      message_array.map(msg => msg.delete().catch(O_o => {}));
     });
  }
});
client.login(process.env.BOT_TOKEN2);
