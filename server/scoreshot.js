var webshot = require('node-webshot');

var options = {
    screenSize: { width: 1440, height: 800 }, 
    shotSize: { width: 840, height: 400 },
    renderDelay: 10000,
};

const url = 'http://localhost:8080';
const name = `score.png`
webshot(url, name, options, function (err) {
    console.error(err);
});