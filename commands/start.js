const { Command } = require('klasa');
const { Collection, MessageEmbed } = require('discord.js');
const { decks } = require('cards');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        let users = message.guild.settings.get("playerInGame");
        // if(users.length < 2) return message.send("Player insufficant.")
        var gameMessage = await message.send("Game starting...");
        const deck = new decks.StandardDeck();
        deck.shuffleAll();
        var hands = new Collection();
        users.forEach(element => {
            hands.set(element,deck.draw(Math.floor(52/users.length)))
        });
        for (let index = 0; index < 20; index++) {
            var card = hands.first().shift();
        console.log(card)
        var rank = isNaN(card.rank.shortName)?card.rank.longName.toLowerCase():card.rank.shortName;
        var embed = 
        {
            image: {
                url: `https://github.com/thomasxd24/SlapJackBot/blob/master/assets/cards/${rank}_of_${card.suit.name}.png?raw=true`
              }
        }
        gameMessage.edit(new MessageEmbed(embed))
        await sleep(5000)
            
        }
        
        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
