var crypto = require('crypto');
var config = require(__root + '/modules/config').common;

module.exports = function(str) {
    return crypto.createHash('md5').update(config.salt + str + config.salt).digest('hex');
};