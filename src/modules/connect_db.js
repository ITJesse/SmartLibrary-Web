
/*
 * Connect to MongoDB & MySQL
 */


var config = require('./config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//连接MongoDB
mongoose.connect('mongodb://'+config.mongodb.host+'/'+config.mongodb.database+'');

//Mongodb数据结构
var _Temp = new Schema({
	name: String,
	data: String,
	time: String
});

var _userBind = new Schema({
	openID: String,
	userID: String
});

var _userSession = new Schema({
	userID: String,
	password: String,
	sessionID: String,
	info: {
		name: String,
		classname: String,
		college: String
	},
	time: String
});

var _expressTmp = new Schema({
	orderID: String,
	expressID: String,
	data: String,
	time: String
});

var _cetTmp = new Schema({
	admissionID: String,
	name: String,
	data: String,
	tine: String
});

var _libHotTmp = new Schema({
	classNum: String,
	data: String,
	time: String
});



exports.Temp = mongoose.model('Temp', _Temp);
exports.userBind = mongoose.model('userBind', _userBind);
exports.userSession = mongoose.model('userSession', _userSession);
exports.expressTmp = mongoose.model('expressTmp', _expressTmp);
exports.cetTmp = mongoose.model('cetTmp', _cetTmp);
exports.libHotTmp = mongoose.model('libHotTmp', _libHotTmp);
