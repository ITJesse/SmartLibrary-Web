//Config
var config = require('./config');

//Module
var request = require('request');
var cheerio = require('cheerio');
var crypto = require('crypto');

//MongoDB
var db = require('../modules/connect_db');
var libHotTmp = db.libHotTmp;
var userSession = db.userSession;
var temp = db.Temp;

//MySQL
var mysql = require('../modules/mysql');

//图书馆登录
var logIntoLibrary = function (userID, password, callback){
	var j = request.jar();
	var options = {
		uri: 'http://218.199.187.110/reader/captcha.php?code=1',
		timeout: 5000,
		jar: j,
	};
	request(options, function(err, response, body){
		if(err) return callback(err);
		if(!password){
			password = userID;
		}
		var options = {
			uri: 'http://218.199.187.110/reader/redr_verify.php',
			form: {
				number : userID,
				passwd : password,
				captcha : 1,
				select : 'cert_no',
				returnUrl: ''
			},
			jar: j,
			timeout: 5000,
		};
		request.post(options, function(err, response, body){
			if(err) return callback(err);
			if(body.indexOf('密码错误') != -1){
				return callback('Wrong password!');
			}
			var options = {
				uri: 'http://218.199.187.110/reader/redr_info.php',
				jar: j,
				timeout: 5000,
			};
			request.get(options, function(err, response, body){
				if(err) return callback(err);
				if(body.indexOf('五天内即将过期') != -1){
					return callback(null, j);
				}else{
					return callback('Server error');
				}
			});
		});
	});
};

//拉取用户信息
var fetchUserInfo = function(userID, callback){
	mysql.query("SELECT name,class,college FROM wit_user_info_view WHERE studentId='"+userID+"'", function(err, rows, fields){
		if(err) return callback(err);
		if(rows[0]){
			var info = {};
			info.name = rows[0]['name'] ? rows[0]['name'] : null;
			info.classname = rows[0]['class'] ? rows[0]['class'] : null;
			info.college = rows[0]['college'] ? rows[0]['college'] : null;
			return callback(null,info);
		}
		return callback('Wrong userID');
	});
};

//从MongoDB获取热门图书
var fetchLibraryHotMongo = function(classNum, callback){
	libHotTmp.findOne({'classNum': classNum}, 'data time', function(err, docs){
		if(err) return callback(err);
		if(!docs) return callback('Expired');
		var time = new Date().getTime();
		if(time - docs.time > 60*60*24*7*1000){
			return callback('Expired');
		}
		return callback(null, JSON.parse(docs.data));
	});
};

//获取热门图书并缓存
var fetchLibraryHotCurl = function(classNum, callback){
	var url = 'http://218.199.187.110/top/top_lend.php';
	var field = ['', 'name', 'author', 'press', 'callno', 'collections', 'lend_count', 'lend_ratio'];
	if(classNum){
		url += '?cls_no='+classNum;
	}
	var options = {
		uri: url,
		timeout: 5000
	};
	request.get(options, function(err, response, body){
		if(err) return callback(err);
		$ = cheerio.load(body);
		var data = new Array();
		$('.table_line').find('tr').each(function(i, item){
			data[i] = {};
			this.find('td').each(function(k, item){
				if(i != 0 && k != 0){
					data[i][field[k]] = this.text();
				}
			});
		});
		data.splice(0,1);
		var time = new Date().getTime();
		var jsondata = JSON.stringify(data);
		libHotTmp.update({'classNum': classNum}, {$set:{'data': jsondata, 'time': time}}, {upsert:true}, function(err){
			if(err) return callback(err);
			return callback(null, data);
		});
	});
};

//从MongoDB拉取热门检索词
var fetchLibraryHotWordsMongo = function(callback){
	temp.findOne({'name': 'libraryHotWords'}, 'data time', function(err, docs){
		if(err) return callback(err);
		if(!docs) return callback('Expired');
		var time = new Date().getTime();
		console.log(docs);
		if(time - docs.time > 60*60*24*7*1000){
			return callback('Expired');
		}
		return callback(null, JSON.parse(docs.data));
	});
};

//从图书馆网站爬热门检索词并缓存到MongoDB
var fetchLibraryHotWordsCurl = function(callback){
	var options = {
		uri: 'http://218.199.187.110/opac/top100.php',
		timeout: 10000
	};
	request.get(options, function(err, response, body){
		if(err) return callback(err);
		if(body.indexOf('热门检索') == -1){
			if(err) return callback('Server error');
		}else{
			$ = cheerio.load(body);
			var data = [];
			$('.thinBorder').find('td').each(function(i, item){
				if(i < 10){
					data[i] = this.text().replace(/\s/g,'');
				}
			});
			var time = new Date().getTime();
			var jsondata = JSON.stringify(data);
			temp.update({'name': 'libraryHotWords'}, {$set:{'data': jsondata, 'time': time}}, {upsert:true}, function(err){
				if(err) return callback(err);
				return callback(null, data);
			});
		}
	});
};

//创建SessionID
exports.createSessionID = function(userID, password, callback){
	var time = new Date().getTime();
	var sessionid = crypto.createHash('md5').update(userID+password+config.common.cookieSecret+time).digest('hex');
	fetchUserInfo(userID, function(err, info){
		if(err){
				return callback(err);
		}
		userSession.update({'userID': userID}, {$set:{'sessionID': sessionid, 'password': password, 'info': info, 'time': time}}, {upsert:true}, function(err){
			if(err){
				return callback(err);
			}
			return callback(null, sessionid, info);
		});
	});
}

//从数据库认证登陆
exports.checkUserMySQL = function(userID, password, callback){
	mysql.query("SELECT pass FROM wit_user WHERE studentId='"+userID+"'", function(err, rows, fields){
		if(err) return callback(err);
		if(rows[0]){
			if(password == rows[0]['pass']){
				return callback(null,true);
			}
		}
		return callback('Wrong password or username');
	});
};

//检查SessionID
exports.checkSessionID = function(sessionid, callback){
	if(!sessionid){
		return callback('Empty SessionID');
	}
	userSession.findOne({'sessionID': sessionid}, 'userID password', function(err, doc){
		if(err) return callback(err);
		if(!doc){
			return callback('Wrong SessionID');
		}else{
			return callback(null, doc.userID, doc.password);
		}
	});
}

exports.fetchLibraryHotWords = function(callback){
	fetchLibraryHotWordsMongo(function(err, data){
		if(err && err != 'Expired'){
			return callback(err);
		}else if(err == 'Expired'){
			fetchLibraryHotWordsCurl(function(err, data){
				if(err){
					return callback(err);
				}
				return callback(null, data);
			});
		}else{
			return callback(null, data);
		}
	});
};

//从教务处认证登陆
exports.checkUserCurl = function(userID, password, callback){
	var options = {
		headers: {'content-type' : 'application/x-www-form-urlencoded'},
		uri: 'http://61.183.207.40/zjdxgc/(3rldu355ex4e5m45j0tk1jal)/default3.aspx',
		body: "__VIEWSTATE=dDwtMTM2MTgxNTk4OTs7PmQFAZ2Hg7RHAtV9jFf%2FgU27llpd&__VIEWSTATEGENERATOR=F8141CFA&TextBox1=" + userID + "&TextBox2=" + password + "&ddl_js=%D1%A7%C9%FA&Button1=+%B5%C7+%C2%BC+",
		timeout: 10000,
	};
	request.post(options, function(err, response, body){
		if(err) return callback(err);
		if(body.indexOf('xs_main') != -1){
			mysql(function(conn){
				conn.query("UPDATE wit_user SET pass='"+password+"' WHERE uid='"+userID+"'", function(err){
					if(err){
						return callback(err);
					}
					return callback(null,true);
				});
			});
		}else{
			return callback('Wrong password or username');
		}
	});
};

//查热门图书整合
exports.fetchLibraryHot = function(classNum, callback){
	if(!classNum){
		classNum = 'ALL';
	}
	fetchLibraryHotMongo(classNum, function(err, data){
		if(err && err != 'Expired'){
			return callback(err);
		}else if(err == 'Expired'){
			fetchLibraryHotCurl(classNum, function(err, data){
				if(err) return callback(err);
				return callback(null,data);
			});
		}else{
			return callback(null, data);
		}
	});
};

//书目检索
exports.fetchLibraryBookList = function(str, strSearchType, match_flag, doctype, callback){
	var url = 'http://218.199.187.110/opac/openlink.php?';
	var field = ['', 'title', 'author', 'press', 'callno', 'type'];
	if(!doctype){
		doctype = 'ALL';
	}
	if(!match_flag){
		match_flag = 'forward';
	}
	if(!strSearchType){
		strSearchType = 'title';
	}
	url +=
		'&strSearchType=' + strSearchType +
		'&match_flag=' + match_flag +
		'&historyCount=' + '1' +
		'&strText=' + str +
		'&doctype=' + doctype +
		'&displaypg=' + '100' +
		'&showmode=' + 'table' +
		'&sort=' + 'CATA_DATE' +
		'&orderby=' + 'desc' +
		'&dept=' + 'ALL';
	var options = {
		uri: url,
		timeout: 5000
	};
	console.log(url);
	request.get(options, function(err, response, body){
		if(err) return callback(err);
		if(body.indexOf('没有') != -1){
			return callback('None result');
		}
		$ = cheerio.load(body);
		var data = new Array();
		$('.table_line').find('tr').each(function(i, item){
			data[i] = {};
			this.find('td').each(function(k, item){
				if(i != 0 && k != 0){
					data[i][field[k]] = this.text();
				}
				//获取书目marc_no
				if(k == 1){
					var href = this.find('a').attr('href');
					var marc_no = /\d{10}/.exec(href);
					//console.log(marc_no);
					data[i]['marc_no'] = marc_no;
				}
			});
		});
		data.splice(0,1);
		return callback(null, data);
	});
};

//书目详情
exports.fetchLibraryBookInfo = function(isbn, callback){
	var url = 'https://api.douban.com/v2/book/isbn/' + isbn;
	var options = {
		uri: url,
		timeout: 5000
	};
	request.get(options, function(err, response, body){
		if(err) return callback(err);
		var json_data = JSON.parse(body);
		if(!json_data.summary) return callback('Fetch info failed');
		return callback(null, json_data);
	});
};


//查借书
exports.fetchLibraryBorrow = function(userID, callback){
	var sql = "SELECT * FROM lend_view WHERE studentId = '"+userID+"' AND isReturn = 0";
	mysql.query(sql, function(err, rows){
		if(err) return callback(err);
		return callback(null, rows);
	});
};
