var webshot = require('node-webshot');

var options = {
    screenSize: { width: 1280, height: 800 }, 
    shotOffset: { left: 60 , right: 0 , top: 60 , bottom: 0 },
    shotSize: { width: 840, height: 800 },
};

const url = 'http://www.acfun.cn/a/ac10239541';
const parts  = url.split('/');
const name = `${parts[parts.length - 1]}.png`
webshot(url, name, options, function (err) {
    console.error(err);
});