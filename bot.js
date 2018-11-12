
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

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') {
        let active = await db.fetch(`support_${message.author.id}`);
        let guild = client.guilds.get(serverStats.guildID);
        let channel, found = true;
        try {
            if (active) client.channels.get(active.channelID)
                .guild;
        } catch (e) {
            found = false;
        }
        if (!active || !found) {
            active = {};
            channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`)
            channel.setParent(serverStats.ticketCategoryID)
            channel.setTopic(`/complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)

            channel.overwritePermissions("465147579517370368", { //Role id (when someone join my server get this role with id <<, i dont know how to change it for @everyone. This will prevent users to see the channel, only admins will see!
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });



            let author = message.author;
            const newChannel = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(author.tag, author.avatarURL)
                .setFooter('Support Ticket Created!')
                .addField('User', author)
                .addField('ID', author.id)
            await channel.send(newChannel);
            const newTicket = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hello, ${author.username}`, author.avatarURL)
                .setFooter('Support Ticket Created!')
            await author.send(newTicket);
            active.channelID = channel.id;
            active.targetID = author.id;
        }
        channel = client.channels.get(active.channelID);
        const dm = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`Thank you, ${message.author.username}`, message.author.avatarURL)
            .setFooter(`Your message has been sent - A staff member will be in contact soon.`)
        await message.author.send(dm);
        if (message.content.startsWith(prefix + 'complete')) return;
        const embed5 = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(message.content)
            .setFooter(`Message Received - ${message.author.tag}`)
        await channel.send(embed5);
        db.set(`support_${message.author.id}`, active);
        db.set(`supportChannel_${channel.id}`, message.author.id);
        return;
    }
    let support = await db.fetch(`supportChannel_${message.channel.id}`);
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = client.users.get(support.targetID);
        if (!supportUser) return message.channel.delete();
        if (message.content.toLowerCase() === '/complete') {
            const complete = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
                .setFooter('Ticket Closed -- Nebulous')
                .setDescription('*Your ticket has been marked as complete. If you wish to reopen it, or create a new one, please send a message to the bot.*')
            supportUser.send(complete);
            message.channel.delete();
            db.delete(`support_${support.targetID}`);
            let inEmbed = new Discord.RichEmbed()
                .setTitle('Ticket Closed!')
                .addField('Support User', `${supportUser.tag}`)
                .addField('Closer', message.author.tag)
                .setColor('RANDOM')
            const staffChannel = client.channels.get('489156917092941826'); //Create a log channel and put id here
            staffChannel.send(inEmbed);
        }
        const embed4 = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setFooter(`Message Received - Nebulous`)
            .setDescription(message.content)
        client.users.get(support.targetID)
            .send(embed4);
        message.delete({
            timeout: 10000
        });
        embed4.setFooter(`Message Sent -- ${supportUser.tag}`)
            .setDescription(message.content);
        return message.channel.send(embed4);
    }
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

	// Bot.on
    client.on('guildMemberAdd', async member => { // If User Joins A Guild
        let channelspam = await db.fetch(`pmessageChannel_${member.guild.id}`) // Fetch Welcome/Leaving Channel
        let messagess = await db.fetch(`pjoinMessage_${member.guild.id}`) // Fetch Join Message
        if (!channelspam) return; // If Welcome/Leaving Channel Is Existent
        if (!messagess) return // If The Join Message Is Existent

        if (!member.guild.channels.get(channelspam)) return // If Channel Welcome/Leave Exists Within Guild As A Channel
        let channeled = member.guild.channels.get(channelspam) // Grabs Channel ID Enabling Input Of Server

        var joinEmbed = new Discord.RichEmbed()
            .setColor('00FF00')
            .setDescription(`${messagess.replace('{user}', member).replace('{members}', member.guild.memberCount)}`) // Adding .replace('{user}', member) will be if a someone uses {user} in there welcome message it'll prompt the user joining.
            .setFooter(`Welcome To The Server - Respect The Rules & Staff`) // Feel Free To Customise You Bildge Rats >:D
            .setTimestamp()
        return channeled.send(joinEmbed).catch((err) => message.reply(`My System Isn't Able To Allow The Request. [User Joining || JoinMessage]\nError Report: ${err}`));
    });

    client.on('guildMemberAdd', async member => {
        let dmuser = await db.fetch(`pjoinMessageDM_${member.guild.id}`) // If DMing User Message Is Active
        if (!dmuser) return;

        var joinEmbed = new Discord.RichEmbed()
            .setColor('00FF00')
            .setDescription(`${dmuser.replace('{user}', member).replace('{members}', member.guild.memberCount)}`) // Adding .replace('{user}', member) will be if a someone uses {user} in there welcome message it'll prompt the user joining.
            .setFooter(`Welcome To The Server ${member.guild.name} - Respect The Rules & Staff`) // Feel Free To Customise You Bildge Rats >:D
            .setTimestamp()
        return member.send(joinEmbed).catch((err) => message.reply(`My System Isn't Able To Allow The Request. [User Joining || DM]\nError Report: ${err}`))
    })

    client.on('guildMemberRemove', async member => {
        let channelspam = await db.fetch(`pmessageChannel_${member.guild.id}`) // Fetch Welcome/Leaving Channel
        let messagess = await db.fetch(`pleaveMessage_${member.guild.id}`) // Fetch Leave Message
        if (!channelspam) return; // If Welcome/Leaving Channel Is Existent
        if (!messagess) return // If The Leave Message Is Existent

        if (!member.guild.channels.get(channelspam)) return
        let channeled = member.guild.channels.get(channelspam)

        var leaveEmbed = new Discord.RichEmbed()
            .setColor('#FF0000')
            .setDescription(`${messagess.replace('{user}', member).replace('{members}', member.guild.memberCount)}`) // Adding .replace('{user}', member) will be if a someone uses {user} in there welcome message it'll prompt the user joining.
            .setFooter(`Someone Deserted Us.. He Is A Lone Wanderer`) // Feel Free To Customise You Bildge Rats >:D
            .setTimestamp()
        return channeled.send(leaveEmbed).catch((err) => message.reply(`My System Isn't Able To Allow The Request. [User Joining || LeaveMessage]\nError Report: ${err}`));
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











client.on('message', message => {
            if (message.content.startsWith(prefix + 'mixer')) {
                var suffix = message.content.split(" ").slice(1).join(" ");
                if (suffix == "" || suffix == null) return message.channel.sendMessage("Do " + config.prefix + "mixer <username?> for Online Status!");
                request("https://mixer.com/api/v1/channels/" + suffix, function(error, response, body) { //set info for the streamer in JSON
                    if (error) {
                        console.log('Error encounterd: ' + err);
                        message.channel.send("Horrible stuff happend D:. Try again later.");
                        return;
                    }
                    if (!error && response.statusCode == 200) {
                        var stream = JSON.parse(body);
                        if (stream.online) {
                            let embed = new Discord.RichEmbed();
                            embed.setColor(0x9900FF)
                            embed.setTitle(suffix + "'s Mixer Channel")
                            if (stream.bannerUrl) {
                                embed.setImage(stream.bannerUrl)
                            } else {
                                embed.setImage(stream.thumbnail.url)
                            }
                            embed.setThumbnail("https://firebottle.tv/projects/mixiversary/images/logo-ball.png")
                            embed.setURL("https://mixer.com/" + suffix)
                            if (stream.online == true) {
                                embed.addField("Online", "Live!", true)
                            }
                            if (stream.partnered == true) {
                                embed.addField("Partner", "Partner Stream!", true)
                            } else {
                                embed.addField("Partner", "Not Partner Stream!", true)
                            }
                            embed.addField("Title", stream.name, true)
                            embed.addField("Followers", stream.numFollowers, true)
                            if (stream.type) {
                                embed.addField("Game", stream.type.name, true)
                            } else {
                                embed.addField("Game", "No Game SET!", true)
                            }
                            embed.addField("Watching", stream.viewersCurrent, true)
                            embed.addField("Total Views", stream.viewersTotal, true)
                            embed.addField("Joined Mixer", moment(stream.createdAt).format('D MMM YYYY, h:mm:ss A'), true)
                            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                            embed.setTimestamp()

                            message.channel.send({
                                embed
                            })
                        } else {
                            let embed = new Discord.RichEmbed();
                            embed.setColor(0x9900FF)
                            embed.setTitle(suffix + "'s Mixer Channel")
                            if (stream.bannerUrl) {
                                embed.setImage(stream.bannerUrl)
                            } else {
                                embed.setImage(stream.thumbnail.url)
                            }
                            embed.setThumbnail("https://firebottle.tv/projects/mixiversary/images/logo-ball.png")
                            embed.setURL("https://mixer.com/" + suffix)
                            if (stream.online == false) {
                                embed.addField("Online", "Offline!", true)
                            }
                            if (stream.partnered == true) {
                                embed.addField("Partner", "Partner Stream!", true)
                            } else {
                                embed.addField("Partner", "Not Partner Stream!", true)
                            }
                            embed.addField("Title", stream.name, true)
                            embed.addField("Followers", stream.numFollowers, true)
                            if (stream.type) {
                                embed.addField("Game", stream.type.name, true)
                            } else {
                                embed.addField("Game", "No Game SET!", true)
                            }
                            embed.addField("Watching", stream.viewersCurrent, true)
                            embed.addField("Total Views", stream.viewersTotal, true)
                            embed.addField("Joined Mixer", moment(stream.createdAt).format('D MMM YYYY, h:mm:ss A'), true)
                            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                            embed.setTimestamp()

                            message.channel.send({
                                embed
                            })
                        }
                    } else if (response.statusCode == 404) {
                        let embed = new Discord.RichEmbed();
                        embed.setColor(0x9900FF)
                        embed.setTitle(suffix + "'s Mixer Channel")
                        embed.setThumbnail("https://firebottle.tv/projects/mixiversary/images/logo-ball.png")
                        embed.setURL("http://mixer.com/" + suffix)
                        embed.addField("Error", "Channel not found.", true)
                        embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                        embed.setTimestamp()

                        message.channel.send({
                            embed
                        })
                    }
                })
            }
        });

client.on('message', message => { //Message Event | Listener

    if (message.content.startsWith(PREFIX + 'Userinfo')) {

        const UserInfo = new Discord.MessageEmbed()

            //All Fields are Optional Pick Any some

            .setAuthor(message.author.username, message.author.avatarURL()) //Heading With Username & Their Avatar 
            .setTitle('UserInfo')
            .setURL('www.google.com') //Any Vaild Link
            .setColor('RANDOM') //You Can Use HexColour Ex:- #000000
            .setImage(message.author.avatarURL()) //Add Any Image URl || Image
            .setThumbnail(message.author.avatarURL()) //Add Any Image URl || ThumbNail

            //All Feilds Are Just Examples pick Some & add as you like

            .addField('Avatar', message.author.avatar, true) //The ID of the user's avatar //Inline True or false
            .addField('AvatarURL', message.author.avatarURL({
                format: 'png'
            }), true) //{options} options are Size?: 128 | 256 | 512 | 1024 | 2048, Format?: "webp" | "png" | "jpg" | "gif" //.defaultAvatarURL() A link to the user's default avatar //.displayAvatarURL() A link to the user's avatar if they have one. Otherwise a link to their default avatar will be returned
            .addField('AvatarURL', message.author.avatarURL({
                size: '2048'
            }), true)
            .addField('Bot', message.author.bot, true) //Returns True If Message Author = Bot || False If Message Author not Bot.
            .addField('Created At', message.author.createdAt, false) //The time the user was created || .createdTimestamp - The timestamp the user was created at
            .addField('Discrim', message.author.discriminator, true) //A discriminator/tag based on username for the user Ex:- 0001
            .addField('DMChannel', message.author.dmChannel) //The DM between the client's user and this user || If Nothing Returns "Null"
            .addField('ID', message.author.id) //The ID of the User/author
            .addField('Last Message', message.author.lastMessage) //The Message object of the last message sent by the user, if one was sent
            .addField('Last Message ID', message.author.lastMessageID) //The ID of the last message sent by the user, if one was sent
            .addField('Presence', message.author.presence) //The presence of this user
            .addField('Presence Status', message.author.presence.status) //The presence status of this user
            .addField('Presence Game', message.author.presence.activity.name) //The presence Game of this user
            .addField('Tag', message.author.tag) //The Discord "tag" for this user || Ex:- Sai Chinna#6718
            .addField('Username', message.author.username) //The username of the user || Ex:- Sai Chinna
            .addField('Nick Name', message.guild.member(target).displayName) //Nick Name In That (message sent) server || Define target as message Author Ex:- let target = message.author; || Add This Line in Top

            .setFooter('Requested By', message.author.tag) //Change To Anything As You Wish
            .setTimestamp() //The timestamp of this embed

        message.channel.send(UserInfo);
    }
});
	
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
client.login(process.env.BOT_TOKEN);
