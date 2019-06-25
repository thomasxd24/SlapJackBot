require('dotenv').config()
const { Client } = require('klasa');
const { config, token } = require('./config');


class MyKlasaClient extends Client {

    constructor(...args) {
        super(...args);

        // Add any properties to your Klasa Client
    }

    // Add any methods to your Klasa Client

}
KlasaClient.defaultGuildSchema.add('playerInGame', 'User', { array: true });
KlasaClient.defaultGuildSchema.add('gameStarted', 'boolean');
new MyKlasaClient(config).login(token);
