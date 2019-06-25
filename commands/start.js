const { Command } = require('klasa');
const { Collection, MessageEmbed } = require('discord.js');
const { decks } = require('cards');


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
        var embed = 
        {
            image: {
                url: "https://github.com/hayeah/playing-cards-assets/raw/master/png/10_of_hearts.png"
              }
        }
        gameMessage.edit(new MessageEmbed(embed))
        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
