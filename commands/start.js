const Discord = require('discord.js');

module.exports = {
    name: 'start',
    description: "This displays all of my commands!",
    async execute(message, args) {
        var description = 'š„š¦\nšØš©';
        var emojiName = '';
        var randomSquare = Math.floor(Math.random() * (4 - 1) + 1)
        console.log(randomSquare)
        if (randomSquare === 1) {
            description = 'ā¬š¦\nšØš©';
            emojiName = 'š„';
        } else if (randomSquare === 2) {
            description = 'š„ā¬\nšØš©';
            emojiName = 'š¦';
        } else if (randomSquare === 3) {
            description = 'š„š¦\nā¬š©';
            emojiName = 'šØ';
        } else {
            description = 'š„š¦\nšØā¬';
            emojiName = 'š©';
        }
        message.channel.send(`Starting your game!`);
        var gameMessage = await message.channel.send({
            embed: {
                color: '#FFFF00',
                description: `š„š¦\nšØš©`,
                author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                },
                footer: {
                    text: `Support: DM Kermit#3000`
                }
            }
        })
        gameMessage.react('š„')
        gameMessage.react('š¦')
        gameMessage.react('šØ')
        gameMessage.react('š©')
            .then(

                setTimeout(function () {
                    gameMessage.edit({
                        embed: {
                            color: '#FFFF00',
                            description: description,
                            author: {
                                name: message.author.tag,
                                icon_url: message.author.displayAvatarURL()
                            },
                            footer: {
                                text: `Support: DM Kermit#3000`
                            }
                        }
                    })
                }, 2000),
                setTimeout(function () {
                    gameMessage.edit({
                        embed: {
                            color: '#FFFF00',
                            description: `š„š¦\nšØš©\n\nYou got 10 seconds to answer!`,
                            author: {
                                name: message.author.tag,
                                icon_url: message.author.displayAvatarURL()
                            },
                            footer: {
                                text: `Support: DM Kermit#3000`
                            }
                        }
                    })
                }, 2500),
                gameMessage.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == 'š„' || reaction.emoji.name == 'š¦' || reaction.emoji.name == 'šØ' || reaction.emoji.name == 'š©'),
                    { max: 1, time: 150000 }).then(collected => {
                        if (collected.first().emoji.name == emojiName) {
                            message.channel.send('You got it right!');
                            gameMessage.reactions.cache.get(emojiName).remove(message.author);
                        } else {
                            message.reply('You clicked the wrong one! you lost.');
                        }
                    }).catch((err) => {
                        console.log(err);
                        message.reply('No reaction after 15 seconds, You automatically lost!');
                    })
            )
    }
}