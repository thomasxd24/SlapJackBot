const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text'],
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
        await message.guild.settings.update("playerInGame",message.author.id,{action: "remove"})
        if(message.guild.hands != null)
        {
            var oldHand = message.guild.hands.get(message.author.id)
            message.guild.hands.delete(message.author.id)
            var users = message.guild.settings.get("playerInGame")
            var eachItem = Math.floor(oldHand.length / users.length)
            users.forEach(element => {
                message.guild.hands.get(element).push(...oldHand.splice(0,eachItem))
            });
        }
        message.send(`<@${message.author.id}> left the match!`)
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
