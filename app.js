'use strict';
var http = require('http');
var express = require('express');
// passport-twitter用
var session = require('express-session')
var auth = require('./passport');
var passport = auth.passport;
// ルーティングファイルを指定
var routes = require('./routes');
var app = express();
var server = http.createServer(app);

// passport-twitter用
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(session({secret: 'itagaki'}));
// 静的ファイルのルートディレクトリを指定
app.use(express.static(__dirname + '/public'));
// ルーティングを設定
routes.configRoutes(app, server, passport);
// リッスン
server.listen(3000);
console.log('Listening on port %d in %s mode', server.address().port, app.settings.env);