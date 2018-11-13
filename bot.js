
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "$";
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers | $help`);
});

client.on("guildCreate", guild => {
  //  when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers | $help`);
});

client.on("guildDelete", guild => {
  // when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers | $help`);
});


client.on("channelCreate", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'logs');
	if (!logs) return console.log("Can't find logs channel.");
	const cembed = new Discord.RichEmbed()
		.setTitle("Channel Created")
		.setColor("RANDOM")
		.setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
		.setTimestamp(new Date());
	logs.send(cembed)
});

client.on("channelDelete", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'logs');
	if (!logs) return console.log("Can't find logs channel.");
	const cembed = new Discord.RichEmbed()
		.setTitle("Channel Deleted")
		.setColor("RANDOM")
		.setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
		.setTimestamp(new Date())
	logs.send(cembed)
});









client.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Commands

    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Ping!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.

    }


    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`bot-commander\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }
});



client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('$kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('**I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});
client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('$ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help") {
		 message.channel.send('**تم الأرسال في الخاص**');
            
	


 message.author.sendMessage(`
 **

 ❖ Prefix = ' $ '


❖════════════❖ Admin Commands ❖════════════❖

 ❖ $kick <mention > ➾ لطرد شخص(soon)

 ❖ $clear ➾ لمسح الرسائل(soon)
 
 ❖ $mute < mention > ➾ لأعطاء شخص ميوت(soon)

 ❖ $unmute <mention> ➾ لفك الميوت عن شخص(soon)

 ❖ $ct <name> ➾ لأنشاء روم كتابي(soon)

 ❖ $cv <name> لأنشاء روم صوتي(soon)

 ❖ $bc <message> ➾ لأرسال رسالة لجميع الأعضاء على الخاص(soon)

 ❖ $warn <mention> <reason> ➾ لأعطاء انذار او تحذير لشخص(soon)

 ❖ $rbc <mentionrole><message> ➾ لأرسال رسالة لجميع الأعضاء الي معهم الرتبة على الخاص(soon)


❖════════════❖ General  Commands ❖════════════❖


❖ +member ➾ لمعرفة الأعضاء الموجودة في السيرفر

❖ +uptime ➾ لمعرفة البوت كم صار له اونلاين

❖ $own ➾  (soon) لمعرفة من الأونر مالت البوت

❖ $id ➾ (soon) لروئية الأيدي التك

❖ $avatar ➾ (soon) لروئية صورة حسابك

❖ $ping ➾ (soon) لروئية بينق البوت

❖ $bot ➾ (soon) معلومات عن البوت

❖ $server ➾ (soon) معلومات السيرفر

❖ $inv ➾ لدعوة البوت الى سيرفرك


❖════════════❖ Welcome ❖════════════❖


❖══════════════════════❖ Welcome ❖═══════════════════════❖

Server Support : https://discord.gg/FAzybWQ

❖════════════════════════════════════════════════════════❖

`);

    }
});
  client.on("guildMemberAdd", member => {
           member.createDM().then(function (channel) {
                       return channel.send(`Welcome To Server 
      
Name Member :  ${member}

You  Member Number is ${member.guild.memberCount}`) 
      }).catch(console.error)
 })

client.on("message", message => {
 if (message.content === "$support") {
  const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setFooter('.SoftNetwork')
      .addField('سيرفر الدعم الفني', `https://discord.gg/5qxe8Kv`)
  message.author.send({embed});
      message.channel.send(":white_check_mark: Check Your DM تم الأرسال بلخاص")
 }
});





client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
        if(command === "skin") {
                const args = message.content.split(" ").slice(1).join(" ")
        if (!args) return message.channel.send(` اكتب اسم اسكنك`);
        const image = new Discord.Attachment(`https://minotar.net/armor/body/${args}`, "skin.png");
    message.channel.send(image)
        }
    });



client.on('message', message => {
	if (message.channel.type == "dm") return;
	if (message.member.hasPermission('ADMINISTRATOR')) return; // This ignores admins and lets them say bad words. If you don't want admins saying bad words, delete this line.
    const swearWords = ["fuck","kiss","pussy"]; // These are the words that wll be filtered. If you would like to add more, simple add ,"word" inbetween the [ and ] and then it'll filter that word as well
    if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
        message.delete();
        message.channel.send(`Hey ${message.author}! That word has been banned, please don't use it!`).then(m => m.delete(3000)); // This function will tell the user off for using the filtered words, and then the message which telsl the user off will be deleted after 3 seconds. If you would like to extend the time, feel free to change it but take note that it's measured in milliseconds. If you don't want the bot to remove the warning message, take off the ".then(m => m.delete(3000))" bit!
        embed = new Discord.RichEmbed() // The log feature will log embeds, instead of simple messages. This improves the look of the word filter and makes it easier to code.
        embed.setAuthor(name=`${message.author.tag}`, icon=message.author.avatarURL) // The author label will show the user who actually used the word. It will show their FULL tag and their profile picture.
        embed.setDescription('Offensive or curse word found in message, in '+ message.channel) // This will tell you which channel the word was used in.
        embed.setColor(0xff0000) // This is just a random colour. If you'd like to change it, simple change the "ff0000" to a different code. Make sure "0x" stays before the number.
        embed.addField(name="Message:", value=message.content) // This will tell you the entire message, so you can spot out the word which was used.
        embed.setFooter(name=`ID: ${message.author.id}`) // This will give you the UserID of the user who used a filtered word in the embed's footer.
        embed.setTimestamp() // This will tell you what time the word was used at.

        guild = client.guilds.get("511577932544737281")
        channel = guild.channels.find("id", "511676663982063637") // This will find the channel which it will send the log embed into.
        channel.send(embed)
      }
}); // end of function

client.on('message', msg => {
        if (msg.content.startsWith(prefix + ".warn")) {
           let args = msg.content.split(" ").slice(1);
          if (!msg.mentions.members.first()) return msg.reply('منشن الشخص المحدد')
          if (!args[1]) return msg.reply('``اكتب السبب``')
          //غير اسم الروم او سوي روم بذا الاسم
          if (msg.guild.channels.find('name', 'warns')) {
            //اذا غيرت فوق غير هنا كمان
            msg.guild.channels.find('name', 'warns').send(`
          تم اعطائك تنبيه : ${msg.mentions.members.first()}
          لأنك قمت بما يلي
          ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
          `)
          }
        }
})






client.on('message', message => {
    if(message.content.includes('discord.gg')){
                                            if(!message.channel.guild) return message.reply('');
        if (!message.member.hasPermissions(['ADMINISTRATOR'])){
        message.delete()
    return message.reply(` No links are allowed `)
    }
}
});


  
  client.on("message", msg => {
if(msg.content.startsWith (prefix + "id")) {
if(!msg.channel.guild) return msg.reply(' Sorry but this is for servers only ');
const embed = new Discord.RichEmbed();
embed.addField(":cloud_tornado:  name", `[ ${msg.author.username}#${msg.author.discriminator} ]`, true)
   .addField(":id:  id", `[ ${msg.author.id} ]`, true)
   .setColor("RANDOM")
   .setFooter(msg.author.username , msg.author.avatarURL)
   .setThumbnail(`${msg.author.avatarURL}`)
   .setTimestamp()
   .setURL(`${msg.author.avatarURL}`)
   .addField(':spy:  Case', `[ ${msg.author.presence.status.toUpperCase()} ]`, true)
   .addField(':satellite_orbital:   Play', `[ ${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name} ]`, true)
   .addField(':military_medal:  Ranks', `[ ${msg.member.roles.filter(r => r.name).size} ]`, true)
   .addField(':robot:  Is it a bot', `[ ${msg.author.bot.toString().toUpperCase()} ]`, true);
msg.channel.send({embed: embed})
 }
});


client.on('message', message => {
    if (message.content.startsWith(prefix + "avatar")) {
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      } else {
          var x5bzm = message.author;

      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
	     }
  });




  client.on('message', message => {
    if (message.content.startsWith(prefix +"botinfo")) {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM')
            .setTitle('``INFO  Bot`` ')
            .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('``servers``', [client.guilds.size], true)
            .addField('``channels``' , `[ ${client.channels.size} ]` , true)
            .addField('``Users``' ,`[ ${client.users.size} ]` , true)
            .addField('``My Name``' , `[ ${client.user.tag} ]` , true)
            .addField('``My ID``' , `[ ${client.user.id} ]` , true)
                  .addField('``My Prefix``' , `=` , true)
                  .addField('``My Language``' , `[ Discord.js ]` , true)
                  .setFooter('By |<@506996140898648074> ')
    })
}
});








client.on('message', message => {
    if (message.author.bot) return;
if (message.content.startsWith(prefix + "uptime")) {
   let uptime = client.uptime;

   let days = 0;
   let hours = 0;
   let minutes = 0;
   let seconds = 0;
   let notCompleted = true;

   while (notCompleted) {

       if (uptime >= 8.64e+7) {

           days++;
           uptime -= 8.64e+7;

       } else if (uptime >= 3.6e+6) {

           hours++;
           uptime -= 3.6e+6;

       } else if (uptime >= 60000) {

           minutes++;
           uptime -= 60000;

       } else if (uptime >= 1000) {
           seconds++;
           uptime -= 1000;

       }

       if (uptime < 1000)  notCompleted = false;

   }

   message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} , ${seconds} sec` + "`");


}
});




client.on('message', message => {
    if (message.content === "$bot") {
           if(!message.channel.guild) return message.reply('This command only for servers');
    let embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .addField("The number of servers to which the bot:" , client.guilds.size)
 .addField("Users:", client.users.size)
 .addField("Channels:", client.channels.size)
 .setTimestamp()
message.channel.sendEmbed(embed);
   }
});







client.on('message', msg => {
    //Code By : ‡ ♪ ℬℐℓѦℓ✋ ‡#2026
    if(msg.content.startsWith(prefix +'suggest')) {
      if(!msg.channel.guild) return msg.reply(' This is only for servers');
      if(!msg.guild.channels.find('name', 'suggestions')) return msg.reply('Please add Room as (suggestions)');
      let args = msg.content.split(" ").slice(1);
      if(!args[1]) return msg.reply(`Please write a suggestion`)
      //غيره على حسب اسم روم الاقتراحات او سوي مثل اسم الروم الموجود هنا
      if(msg.guild.channels.find('name', 'suggestions')) {
        //غيره هنا كمان اذا غيرت فوق
        msg.guild.channels.find('name', 'suggestions').send(`
      **New Suggestion By** : ${msg.member}
        **The Suggestion** :
        ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
        `)
        .then(function (message) {
          message.react('✅')
          message.react('❌')
        })
        }
      }
  
  });






  client.on("message", (message) => {
    if (message.content.startsWith(prefix +"setchannel")) {
            let args = message.content.split(" ").slice(1);
        message.guild.createChannel(args.join(' '), 'text');
    message.channel.sendMessage('text Room was successfully created|✅')
    
    }
    });
    
    client.on("message", (message) => {
        if (message.content.startsWith(prefix +"setvoice")) {
                let args = message.content.split(" ").slice(1);
            message.guild.createChannel(args.join(' '), 'voice');
            message.channel.sendMessage('Voice Room was successfully created|✅')
        
        }
        });







        client.on("guildMemberAdd", member => {
            let welcomer = member.guild.channels.find("name","welcome");
                  if(!welcomer) return;
                  if(welcomer) {
                     moment.locale('ar-ly');
                     var h = member.user;
                    let norelden = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(h.avatarURL)
                    .setAuthor(h.username,h.avatarURL)
                    .addField(': The date of your login',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)            
                     .addField(': Date of login in Server',`${moment(member.joinedAt).format('D/M/YYYY h:mm a ')} \n\`\`${moment(member.joinedAt).startOf(' ').fromNow()}\`\``, true) 
                     .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
                 welcomer.send({embed:norelden});          
                           
             
                  }
                  });
        
        
                  client.on("roleCreate", role => {
                    client.setTimeout(() => {
                      role.guild.fetchAuditLogs({
                          limit: 1,
                          type: 30
                        })
                        .then(audit => {
                          let exec = audit.entries.map(a => a.executor.username)
                          try {
                             let log = role.guild.channels.find('name', 'log');
                            if (!log) return;
                            let embed = new Discord.RichEmbed()
                              .setColor('RANDOM')
                              .setTitle('➕ RoleCreated')
                              .addField('Role Name', role.name, true)
                              .addField('Role ID', role.id, true)
                              .addField('By', exec, true)
                              .setTimestamp()
                            log.send(embed).catch(e => {
                              console.log(e);
                            });
                          } catch (e) {
                            console.log(e);
                          }
                        })
                    }, 1000)
                  })
                   client.on("roleDelete", role => {
                    client.setTimeout(() => {
                      role.guild.fetchAuditLogs({
                          limit: 1,
                          type: 30
                        })
                        .then(audit => {
                          let exec = audit.entries.map(a => a.executor.username)
                          try {
                             let log = role.guild.channels.find('name', 'log');
                            if (!log) return;
                            let embed = new Discord.RichEmbed()
                              .setColor('RANDOM')            
                              .setTitle('❌ RoleDeleted')
                              .addField('Role Name:', role.name, true)
                              .addField('Role ID:', role.id, true)
                              .addField('By:', exec, true)
                              .setTimestamp()
                            log.send(embed).catch(e => {
                              console.log(e);
                            });
                          } catch (e) {
                            console.log(e);
                          }
                        })
                    }, 1000)
                  })
                     client.on("roleUpdate", (re,updated) => {
                      client.setTimeout(() => {
                        re.guild.fetchAuditLogs({
                            limit: 1,
                            type: 30
                          })
                          .then(audit => {
                            let exec = audit.entries.map(a => a.executor.username)
                            try {
                    
                              let log = re.guild.channels.find('name', 'log');
                              if (!log) return;
                              let embed = new Discord.RichEmbed()
                                .setColor('BLACK')
                                .setTitle("✏  Role Name Updated")
                                .addField("Old",`${re.name}`,true)
                                .addField("New",`${updated.name}`,true )
                                .addField("Role id",`${re.id}`,true )
                                .addField('By', exec, true)
                                .setTimestamp()
                              log.send(embed).catch(e => {
                                console.log(e);
                              });
                            } catch (e) {
                              console.log(e);
                            }
                          })
                      }, 1000)
                    })
                   client.on("channelDelete",  dc => {
                    const channel = dc.guild.channels.find("name", "log")
                    if(channel) {
                    var embed = new Discord.RichEmbed()
                    .setTitle(dc.guild.name)
                    .setDescription(`***Channel Deleted Name : *** **${dc.name}** ⬅️`)
                    .setColor(`RANDOM`)
                    .setTimestamp();
                    channel.sendEmbed(embed)
                    }
                    });
                     
                    
                  client.on('messageUpdate', (message, newMessage) => {
                      if (message.content === newMessage.content) return;
                      if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
                      const channel = message.guild.channels.find('name', 'log');
                      if (!channel) return;
                       let embed = new Discord.RichEmbed()
                         .setAuthor(`${message.author.tag}`, message.author.avatarURL)
                         .setColor('RANDOM')
                         .setDescription(`✏ **Message Edited
                  Sender <@${message.author.id}>                                                                                                                         Edited In** <#${message.channel.id}>\n\nBefore Edited:\n \`${message.cleanContent}\`\n\nAfter Edited:\n \`${newMessage.cleanContent}\``)
                         .setTimestamp();
                       channel.send({embed:embed});
                   });
                   client.on('messageDelete', message => {
                      if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
                      const channel = message.guild.channels.find('name', 'log');
                      if (!channel) return;
                      
                      let embed = new Discord.RichEmbed()
                         .setAuthor(`${message.author.tag}`, message.author.avatarURL)
                         .setColor('RANDOM')
                         .setDescription(`🗑️ **Message Deleted**
                  **Sender <@${message.author.id}>                                                                                                                        Deleted In** <#${message.channel.id}>\n\n \`${message.cleanContent}\``)
                         .setTimestamp();
                       channel.send({embed:embed});
                   });
                   client.on('guildMemberAdd', member => {
                      if (!member || !member.id || !member.guild) return;
                      const guild = member.guild;
                      
                      const channel = member.guild.channels.find('name', 'log');
                      if (!channel) return;
                      let memberavatar = member.user.avatarURL
                      const fromNow = moment(member.user.createdTimestamp).fromNow();
                      const isNew = (new Date() - member.user.createdTimestamp) < 900000 ? '🆕' : '';
                      
                      let embed = new Discord.RichEmbed()
                         .setAuthor(`${member.user.tag}`, member.user.avatarURL)
                         .setThumbnail(memberavatar)
                         .setColor('RANDOM')
                         .setDescription(`📥 <@${member.user.id}> **Joined To The Server**\n\n`)
                         .setTimestamp();
                       channel.send({embed:embed});
                  });
                   client.on('guildMemberRemove', member => {
                      if (!member || !member.id || !member.guild) return;
                      const guild = member.guild;
                      
                      const channel = member.guild.channels.find('name', 'log');
                      if (!channel) return;
                      let memberavatar = member.user.avatarURL
                      const fromNow = moment(member.joinedTimestamp).fromNow();
                      
                      let embed = new Discord.RichEmbed()
                         .setAuthor(`${member.user.tag}`, member.user.avatarURL)
                         .setThumbnail(memberavatar)
                         .setColor('RAMDOM')
                         .setDescription(`📤 <@${member.user.id}> **Leave From Server**\n\n`)
                         .setTimestamp();
                       channel.send({embed:embed});
                  });
                   client.on('voiceStateUpdate', (oldM, newM) => {
                    let m1 = oldM.serverMute;
                    let m2 = newM.serverMute;
                     let d1 = oldM.serverDeaf;
                    let d2 = newM.serverDeaf;
                     let ch = oldM.guild.channels.find('name', 'log')
                    if(!ch) return;
                       oldM.guild.fetchAuditLogs()
                      .then(logs => {
                         let user = logs.entries.first().executor
                       if(m1 === false && m2 === true) {
                         let embed = new Discord.RichEmbed()
                         .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
                         .setDescription(`${newM} has muted in server`)
                         .setFooter(`By : ${user}`)
                          ch.send(embed)
                      }
                      if(m1 === true && m2 === false) {
                         let embed = new Discord.RichEmbed()
                         .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
                         .setDescription(`${newM} has unmuted in server`)
                         .setFooter(`By : ${user}`)
                         .setTimestamp()
                          ch.send(embed)
                      }
                      if(d1 === false && d2 === true) {
                         let embed = new Discord.RichEmbed()
                         .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
                         .setDescription(`${newM} has deafened in server`)
                         .setFooter(`By : ${user}`)
                         .setTimestamp()
                          ch.send(embed)
                      }
                      if(d1 === true && d2 === false) {
                         let embed = new Discord.RichEmbed()
                         .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
                         .setDescription(`${newM} has undeafened in server`)
                         .setFooter(`By : ${user}`)
                         .setTimestamp()
                          ch.send(embed)
                      }
                    })
                  });
                     client.on("guildBanAdd", (guild, member) => {
                    client.setTimeout(() => {
                      guild.fetchAuditLogs({
                          limit: 1,
                          type: 22
                        })
                        .then(audit => {
                          let exec = audit.entries.map(a => a.executor.username);
                          try {
                            let log = guild.channels.find('name', 'log');
                            if (!log) return;
                            client.fetchUser(member.id).then(myUser => {
                            let embed = new Discord.RichEmbed()
                          .setAuthor(exec)
                          .setThumbnail(myUser.avatarURL)
                          .addField('- Banned User:',`**${myUser.username}**`,true)
                          .addField('- Banned By:',`**${exec}**`,true)
                          .setFooter(myUser.username,myUser.avatarURL)
                              .setTimestamp();
                            log.send(embed).catch(e => {
                              console.log(e);
                            });
                            });
                          } catch (e) {
                            console.log(e);
                          }
                        });
                    }, 1000);
                  });
                  











                  client.on('message', msg => {
                    if(msg.author.bot) return;
                    
                    if(msg.content === '.linkserver') {
                      client.guilds.forEach(g => {
                        
                        let l = g.id
                        g.channels.get(g.channels.first().id).createInvite({
                          maxUses: 5,
                          maxAge: 86400
                        }).then(i => msg.channel.send(`
                        Invite Link : <https://discord.gg/${i.code}>
                        Server : ${g.name} | Id : ${g.id} 
                        Owner ID : ${g.owner.id}`))
                      })
                    }
                    
});





                    client.on('guildCreate', guild => {
                        var embed = new Discord.RichEmbed()
                        .setColor(0x5500ff)
                        .setDescription('شكراً لك لإضافه البوت الى سيرفرك')
                            guild.owner.send(embed)
                      });
                      
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
client.login(process.env.BOT_TOKEN);
