const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run() {
        var index=0;
        setInterval(()=> {
                let status = [
                    "!help | Discord Hack Week",
                    `!help | in ${this.client.guilds.size} guilds`,
                    `!help | with ${this.client.guilds
                      .map(guild => guild.memberCount)
                      .reduce((a, b) => a + b)} users`
                  ];
                  if (status.length - 1 == index) {
                    index = 0;
                  } else {
                    index = index + 1;
                  }
                  this.client.user.setActivity(status[index]);
        },15000)

        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
