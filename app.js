var http, server;

http = require( 'http' );
server = http.createServer( function( request, response ){
	response.writeHead( 200, { 'Content-Type': 'text/plain' } );
	response.end( 'Hello, Node.js' );
}).listen( 3000 );

console.log( 'Listening on port %d', server.address().port );