
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
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
    if (msg.startsWith(prefix + 'Purge')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
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
        if (!args) return message.channel.send(`${member} اكتب اسم اسكنك`);
        const image = new Discord.Attachment(`https://minotar.net/armor/body/${args}`, "skin.png");
    message.channel.send(image)
        }
    });


client.login(process.env.BOT_TOKEN);
