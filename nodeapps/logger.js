let bunyan = require('bunyan');
let argv = require('yargs').argv;
var logLevel = argv.logLevel || 'debug';

//definind the log rules
var logRules = {
    "error": [
        "error"
    ],
    "debug": [
        "error",
        "debug",
        "info"
    ],
    "info": [
        "info",
        "error"
    ]
};

var loggerJSON = {
    type: 'rotating-file',
    period: '1d'
};

// construct log file path with name 
function getLogFileName(logLevel) {
    return `./logs/node-test-${logLevel}-${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}-${new Date().getMilliseconds()}.log`;
}

function buildStreamsArray() {
    var arr = logRules[logLevel];
    var stremArr = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = JSON.parse(JSON.stringify(loggerJSON));
        obj.level = arr[i];
        obj.path = getLogFileName(arr[i]);
        stremArr.push(obj);
    }
    return stremArr;
}

module.exports = {
    logger: bunyan.createLogger({
        name: 'Customer Profile Logger',
        streams: buildStreamsArray()
    })
};