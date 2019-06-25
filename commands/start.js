const { Command } = require('klasa');
const { Collection, MessageEmbed } = require('discord.js');
const { decks } = require('cards');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        var users = message.guild.settings.get("playerInGame");
        // if(users.length < 2) return message.send("Player insufficant.")
        var gameMessage = await message.send("Game starting in 5 seconds...")
        gameMessage.react("🖐")

        const originalDeck = new decks.StandardDeck();
        originalDeck.shuffleAll();
        var hands = new Collection();
        var deck = [];
        users.forEach(element => {
            hands.set(element,originalDeck.draw(Math.floor(52/users.length)))
        });
        var win = false;
        while(!win)
        {
            for (let index = 0; index < users.length; index++) {
                const current = users[index];
                if(hands.get(current).length == 0) continue;
                var card = hands.get(current).shift();
                deck.push(card)
                gameMessage.edit("React to 🖐 to Slap!",new MessageEmbed(this.formatGameToEmbed(hands,card,deck)))
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '🖐' && users.includes(user.id);
                };
                
                var reaction = await gameMessage.awaitReactions(filter, { max: 1, time: 2000, errors: ['time'] })
                    .then(collected => collected.get("🖐"))
                    .catch(collected => null);
                
                if(reaction != null)
                {
                    var slappedUser = reaction.users.get(reaction.users.keyArray()[1]);
                    if(card.rank.longName == "Jack")
                    {
                        await gameMessage.edit(`**${slappedUser.username}** Slapped a **Jack**!\nGame Resuming in 3 seconds!*`,new MessageEmbed(this.formatGameToEmbed(hands,card,deck)))
                        hands.get(slappedUser.id).push(...deck);
                        shuffle(hands.get(slappedUser.id))
                        deck = []
                    } 
                    else
                    {
                        let index = users.indexOf(slappedUser.id)+1;
                        if(index >= users.length) index = 0;
                        var nextUser = users[index];
                        await gameMessage.edit(`**${slappedUser.username}** Slapped! But it was not a Jack!\nGame Resuming in 3 seconds!*`,new MessageEmbed(this.formatGameToEmbed(hands,card,deck)))
                        hands.get(nextUser).push(...deck);
                        shuffle(hands.get(nextUser))
                        deck = []
                    } 
                    users.forEach(user => reaction.users.remove(user))
                    await sleep(3000)
                }
            }
        
            
        }
        
        

    }

    formatGameToEmbed(hands,currentCard,deck)
    {
        var rank = isNaN(currentCard.rank.shortName)?currentCard.rank.longName.toLowerCase():currentCard.rank.shortName;
        var userArray = hands.map((value,index) => `<@${index}> : ${value.length} card(s)`).join("\n");
        var embed = 
        {
            description: `Deck: ${deck.length}\n${userArray}`,
            image: {
                url: `https://github.com/thomasxd24/SlapJackBot/blob/master/assets/cards/${rank}_of_${currentCard.suit.name}.png?raw=true`
              }
        }
        return embed;
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
