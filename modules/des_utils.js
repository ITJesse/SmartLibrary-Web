var _crypto = require('crypto')

var cipheriv = function(en, code, data) {
    var buf1 = en.update(data, code),
        buf2 = en.final();
    var r = new Buffer(buf1.length + buf2.length);
    buf1.copy(r);
    buf2.copy(r, buf1.length);
    return r;
};

exports.EncryptDES = function(data, key, vi) {
    return data = cipheriv(_crypto.createCipheriv('des', key, vi), 'utf8', data).toString('base64');
};

exports.DecryptDES: function(data, key, vi) {
    return cipheriv(_crypto.createDecipheriv('des', key, vi), 'base64', data).toString('utf8');
};
