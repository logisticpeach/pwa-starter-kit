const express = require('express')
prpl = require('prpl-server');
const app = express();

let port = 8888;

function reflectConfigFromEnvironment() {
    if (process.env.PORT) {
        console.log(`Setting port number to environt variable ${process.env.PORT}`);
        port = process.env.PORT;
    }

    console.log('Reading CONFIG_VALS from environment...');
    let rawKeys = process.env.CONFIG_VALS;

    if (!rawKeys) {
        console.warn('No environment variales defined');
        return {};
    }

    console.log(`Found CONFIG_VALS value of ${rawKeys}.`);
    let individualKeys = rawKeys.split(',');

    let config = new Object();

    for (let key of individualKeys) {
        console.log(`Attempting to read key "${key}"`);
        let val = process.env[key];
        console.log(`found value ${val}`);
        config[key.toLowerCase()] = val;
    }

    console.log(`Caching config object ${JSON.stringify(config)}`);

    return config;
}

const config = reflectConfigFromEnvironment();

app.get('/api/config', (req, res) => {
    res.json(config);
});

let polyConfigFile = require("./build/polymer.json");
app.get('/*', prpl.makeHandler('./build', polyConfigFile));
app.listen(port, () => console.log(`Express + prpl-server app listening on port ${port}!`));