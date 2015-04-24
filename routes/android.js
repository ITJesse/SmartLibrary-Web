//Config
var config = require('../modules/config');

//Module
var crypto = require('crypto');
var request = require('request');
var cheerio = require('cheerio');

//Custom Module
var checkStr = require('../modules/antiInject');
var common = require('../modules/common');

//Database
var db = require('../modules/connect_db');
var mysql = require('../modules/mysql');
var userSession = db.userSession;
var temp =db.Temp;

//检查验证字符串
exports.checkSignString = function(req, res, next) {
	console.log(req.body);
	var timestamp = checkStr(req.body.timestamp);
	var sign = checkStr(req.body.sign);
	var salt = config.android.salt;
	var signTrue = crypto.createHash('md5').update(salt+timestamp).digest('hex').toUpperCase();
	if(sign != signTrue){
		var result = {};
		result.error = '-2';
		return res.json(result);
	}
	next();
};

//查热门图书
exports.libraryHot = function(req, res){
	var classNum = checkStr(req.body.classNum);
	var result = {};
	common.fetchLibraryHot(classNum, function(err, data){
		if(err){
			console.log(err);
			result.error = '-5';
			return res.json(result);
		}
		result.error = null;
		result.hot = data;
		return res.json(result);
	});
};

//查借书
exports.libraryBorrow = function(req, res){
	var sessionID = checkStr(req.body.sessionid);
	var password = checkStr(req.body.password);
	var result = {};
	if(!sessionID){
		result.error = '-1';
		return res.json(result);
	}
	common.checkSessionID(sessionID, function(err, userID){
		if(err && err = 'Wrong SessionID'){
			result.error = '-5';
			return res.json(result);
		}else if(err && err = 'Empty SessionID'){
			result.error = '-7';
			return res.json(result);
		}else if(err){
			console.log(err);
			result.error = '-5';
			return res.json(result);
		}
		common.fetchLibraryBorrow(userID, password, function(err, data){
			if(err && err == 'Wrong password!'){
				result.error = '-3';
				return res.json(result);
			}else if(err){
				console.log(err);
				result.error = '-5';
				return res.json(result);
			}else{
				result.error = null;
				result.borrow = data;
				return res.json(result);
			}
		});
	});
};

//书目检索
exports.libraryBookList = function(req, res){
	var str = checkStr(req.body.str);
	var strSearchType = checkStr(req.body.strSearchType);
	var match_flag = checkStr(req.body.match_flag);
	var doctype = checkStr(req.body.doctype);
	var result = {};
	if(!str){
		result.error = '-1';
		return res.json(result);
	}
	common.fetchLibraryBookList(str, strSearchType, match_flag, doctype, function(err, data){
		if(err){
			console.log(err);
			result.error = '-5';
			return res.json(result);
		}
		result.error = null;
		result.book = data;
		return res.json(result);
	});
};

//书目详情
exports.libraryBookInfo = function(req, res){
	var isbn = req.body.isbn;
	var result = {};
	if(!isbn){
		result.error = '-1';
		return res.json(result);
	}
	common.fetchLibraryBookInfo(isbn, function(err, info){
		if(err){
			console.log(err);
			result.error = '-5';
			return res.json(result);
		}
		result.error = null;
		result.info = info;
		return res.json(result);
	});
};

//热门检索词
exports.libraryHotWords = function(req, res){
	var result = {};
	common.fetchLibraryHotWords(function(err, data) {
		var result = {};
		if(err){
			console.log(err);
			result.error = '-5';
			return res.json(result);
		}else{
			result.error = null;
			result.data = data;
			return res.json(result);
		}
	})
};

//登陆
exports.Login = function(req, res) {
	var userID = checkStr(req.body.userID);
	var password = checkStr(req.body.password);
	var result = {};
	if(!password || !userID){
		result.error = '-1';
		return res.json(result);
	}
	common.checkUserMySQL(userID, password, function(err, sign){
		if(err && err != 'Wrong password or username'){
			result.error = '-3';
			return res.json(result);
		}
		if(!sign){
			common.checkUserCurl(userID, password, function(err, sign){
				if(err){
					console.log(err);
					result.error = '-5';
					return res.json(result);
				}
				if(sign){
					common.createSessionID(userID, password, function(err,sessionid,info){
						if(err){
							console.log(err);
							result.error = '-5';
							return res.json(result);
						}
						result.error = null;
						result.sessionid = sessionid;
						result.userinfo = info;
						return res.json(result);
					});
				}
			});
		}else{
			common.createSessionID(userID, password, function(err,sessionid,info){
				if(err){
					console.log(err);
					result.error = '-5';
					return res.json(result);
				}
				result.error = null;
				result.sessionid = sessionid;
				result.userinfo = info;
				return res.json(result);
			});
		}
	});
};

//登陆（临时）
// exports.Login = function(req, res) {
// 	var userID = checkStr(req.body.userID);
// 	var password = checkStr(req.body.password);
// 	var result = {};
// 	if(!password || !userID){
// 		result.error = 'Maybe Inject';
// 		return res.json(result);
// 	}
// 	checkUserCurl(userID, password, function(err, sign){
// 		if(err){
// 			result.error = err;
// 			return res.json(result);
// 		}
// 		if(sign){
// 			createSessionID(userID, password, function(err,sessionid,info){
// 				if(err){
// 					result.error = err;
// 					return res.json(result);
// 				}
// 				result.error = null;
// 				result.sessionid = sessionid;
// 				result.userinfo = info;
// 				return res.json(result);
// 			});
// 		}
// 	});
// };

//忘记密码
exports.forgetPass = function(req, res) {
	var idcard = checkStr(req.body.idcard);
	var name = checkStr(req.body.name);
	var userID = checkStr(req.body.userID);
	var result = {};
	if(!idcard || !name || !userID){
		result.error = '-1';
		return res.json(result);
	}
	var sql = "SELECT name,idcard,pass FROM wit_user_info_view WHERE studentId='"+userID+"'";
	mysql.query(sql, function(err, rows, fields){
		if(err){
			console.log(err);
			result.error = '-5';
			return res.json(result);
		}
		if(!rows[0]){
			result.error = '-4';
			return res.json(result);
		}else{
			if(idcard == rows[0]['idcard'] && name == rows[0]['name']){
				result.error = null;
				result.password = rows[0]['pass'];
				return res.json(result);
			}else{
				result.error = '-3';
				return res.json(result);
			}
		}
	});
};
