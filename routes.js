'use strict';
var configRoutes;
// MongoDB用ファイルを指定
var mongo = require('./mongo');
var fs = require('fs');

configRoutes = function(app, server, passport) {
    app.get('/secret', function(request, response) {
        // 認証保護
        if(passport.session && passport.session.id){
            fs.readFile('./secret/secret.html', 'utf8', function (error, html) {
                response.send(html);
            });
        } else {
            response.redirect('/login');
        }   
    });

    app.get('/login', function(request, response) {
        response.redirect('/login.html');
    });

    // パスが'/*'の場合は、jsonにして、
    app.all('/api/*', function(request, response, next){
        response.contentType('json');
        response.header('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/api/find', function(request, response) {
        mongo.find('test', {}, {}, 
        	function(list){
        		response.send(list);
        	}
        );
    });
    app.get('/api/find/:name', function(request, response) {
        mongo.find('test', {name: request.params.name}, {}, 
        	function(list){
        		response.send(list);
        	}
        );
    });
    app.get('/api/insert/:name', function(request, response) {
    	mongo.insert('test', {name: request.params.name}, {},
    		function(result){
    			response.send(result);
    		}
    	);
    });
    app.get('/api/update/:name1/:name2', function(request, response) {
    	mongo.update('test', {name: request.params.name1}, {name: request.params.name2}, {},
    		function(result){
    			response.send(result);
    		}
    	);
    });
    app.get('/api/remove/:name', function(request, response) {
    	mongo.remove('test', {name: request.params.name}, {justOne: false},
    		function(result){
    			response.send(result);
    		}
        );
    });
    app.get('/api/remove', function(request, response) {
    	mongo.remove('test', {}, {justOne: false},
    		function(result){
    			response.send(result);
    		}
        );
    });

    // passport-twitter ----->
    // http://passportjs.org/guide/twitter/
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', 
        passport.authenticate('twitter', { successRedirect: '/secret',
                                                failureRedirect: '/login' }));
    // <-----
}

module.exports = {configRoutes: configRoutes};