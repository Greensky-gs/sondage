//create a discord client

client.on('message', (message) => {
  const prefix = "!";
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift();
  
  if (commandName === 'sondage') {
    const array = args.join(" ").split('--');

    let question;
    
    if (array.join(' ') === args.join(" ")) {
        question = args.join(" ");
    } else {
        question = array.shift();
    };

    const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    var embed = new Discord.MessageEmbed()
        .setAuthor(question)
        .setColor('ORANGE')
        .setTitle("Sondage")
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL({dynamic: true}))

    let ouiNon = false;

    if (question === args.join(" ")) {
        embed.setDescription(`Oui :👍\n\nNon :👎`)
            
        ouiNon = true;
    } else {
        embed.setDescription(array.map((question, i) => i < 10 ? `\n${reactions[i]} : ${array[i]}` : ''))
    };

    return message.channel.send(embed).then(async(sondage) => {
        if (ouiNon === false) {
            for (let i = 0; i < array.length;i++) {
                await sondage.react(reactions[i])
            };
        } else {
            await sondage.react('👍');
            await sondage.react('👎');
        }
    });
  }
});
