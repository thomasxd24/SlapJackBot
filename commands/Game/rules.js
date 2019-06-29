const { Command } = require('klasa');

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
            description: 'Explain how does the game works.',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        message.send("**How To Play:**\
        ```asciidoc\n= The Pack =\nThe standard 52-card pack is used.\n\n\
= Object Of The Game =\n\
The goal is to win all the cards, leaving everyone else with zero cards.\n\n\
= The Play =\n\n\
Each player automatically puts one card at a time from their pile and places it face up.  When the card played to the center is a jack the first player to slap their hand down on the jack takes it, as well as all the cards beneath it. The player winning these cards gets them all in their deck.  If it is a sandwich, then you slap the third card.  Example of sandwich: ace, two, ace.  Same card, different card, same card.  If it's a double, slap the second card.  A double is the same card twice in a row, for example: ace, ace.  Same card, same card.\n\n\
When more than one player slaps at a card, the one who slapped first wins the pile. If a player slaps at any card that is not a correct card, they must give all the cards to the person placing their card next. When a player has no more cards left, they are out and can not slap until the next game.```")
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
