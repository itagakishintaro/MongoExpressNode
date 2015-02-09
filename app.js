'use strict';
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

app.get('/', function(request, response) {
    response.send('Hello Express');
});

server.listen(3000);

console.log('Listening on port %d in %s mode', server.address().port, app.settings.env);