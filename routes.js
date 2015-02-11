'use strict';
var configRoutes;
// MongoDB用ファイルを指定
var mongo = require('./mongo');

configRoutes = function(app, server) {
    app.get('/', function(request, response) {
        response.redirect('/index.html');
    });

    // パスが'/*'の場合は、jsonにして、
    app.all('/*', function(request, response, next){
        response.contentType('json');
        response.header('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/find', function(request, response) {
        mongo.find('test', {}, {}, 
        	function(list){
        		response.send(list);
        	}
        );
    });
    app.get('/find/:name', function(request, response) {
        mongo.find('test', {name: request.params.name}, {}, 
        	function(list){
        		response.send(list);
        	}
        );
    });

    app.get('/insert/:name', function(request, response) {
    	mongo.insert('test', {name: request.params.name}, {},
    		function(result){
    			response.send(result);
    		}
    	);
    });
    app.get('/update/:name1/:name2', function(request, response) {
    	mongo.update('test', {name: request.params.name1}, {name: request.params.name2}, {},
    		function(result){
    			response.send(result);
    		}
    	);
    });
    app.get('/remove/:name', function(request, response) {
    	mongo.remove('test', {name: request.params.name}, {justOne: false},
    		function(result){
    			response.send(result);
    		}
        );
    });
    app.get('/remove', function(request, response) {
    	mongo.remove('test', {}, {justOne: false},
    		function(result){
    			response.send(result);
    		}
        );
    });
}

module.exports = {configRoutes: configRoutes};