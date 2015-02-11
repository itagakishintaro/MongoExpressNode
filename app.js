'use strict';
var http = require('http');
var express = require('express');
// ルーティングファイルを指定
var routes = require('./routes');
var app = express();
var server = http.createServer(app);

// 静的ファイルのルートディレクトリを指定
app.use(express.static(__dirname + '/public'));

routes.configRoutes(app, server);

server.listen(3000);
console.log('Listening on port %d in %s mode', server.address().port, app.settings.env);