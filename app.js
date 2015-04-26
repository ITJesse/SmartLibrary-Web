var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./modules/config');
var routes = require('./routes/index');
var login = require('./routes/login');
var web = require('./routes/web');
var book = require('./routes/book');
var student = require('./routes/student');
var android = require('./routes/android');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: config.common.cookieSecret,
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//客户端部分API路由
app.use('/API/Client', book);
app.use('/API/Client', student);

//Web部分API路由
app.use('/API/Web/', web);

//APP部分API路由
app.all('/API/Android/*', android.checkSignString);
app.post('/API/Android/Login', android.Login);
app.post('/API/Android/ForgetPass', android.forgetPass);
app.post('/API/Android/LibraryHot', android.libraryHot);
app.post('/API/Android/LibraryHotWords', android.libraryHotWords);
app.post('/API/Android/LibraryBorrow', android.libraryBorrow);
app.post('/API/Android/LibraryBookList', android.libraryBookList);
app.post('/API/Android/LibraryBookInfo', android.libraryBookInfo);
app.post('/API/Android/StudyRoomSeat', android.getStudyRoomSeat);

//Test路由
app.get('/Test', function(req, res) {
    res.render('test');
});

//Web页面路由
app.use('/', routes);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    switch(err.status){
        case 404:
            res.render('404');
            break;
        case 403:
            res.render('403');
            break;
        default:
            res.render('500');
    }
});


module.exports = app;
