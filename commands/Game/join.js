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
            description: 'Allows you to join a party of your choice.',
            extendedHelp: 'No extended help available.',
            usage: '[userJoin:user]',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [user]) {
        const users = message.guild.settings.get("playerInGame");
        
        if(user)
        {
            if(users.includes(user)) return message.send("Already in game!");
            message.guild.settings.update("playerInGame",user.id,{action:"add"});
            return message.send(`${user} have joined the game!`)
        }
        else
        {
            if(users.includes(message.author.id)) return message.send("Already in game!");
            message.guild.settings.update("playerInGame",message.author.id,{action:"add"});
            return message.send("You have joined the game!")
        }
        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
