/*! server.js */
var sys = require('sys'),
    http = require('http'),
    url = require('url'),
    movie = require('./movie'),
    router = require('choreographer').router();
 
var API_KEY = '8f00c2e270ce31b8834ec57c1cf9f562';
 
//Search URL
//Used to call the API for the movie entered.
router.get('/search/*', function(req, res, term) {
   var args = {};
  var m = movie.createMovie( API_KEY );
  m.search(term, args, function(error, result) {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
    //sys.puts("Result is " + result);
    res.end( JSON.stringify(result) );
  });
});

//Called when searching for movie id
router.get('/id/*', function(req, res, term) {

  var args = {};
    //MOVE THIS SO ONLY ONE MOVIE OBJECT IS CREATED
  var m = movie.createMovie( API_KEY );
  m.searchId(term, args, function(error, result) {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
    sys.puts("Result is " + result);
    res.end( JSON.stringify(result) );
  });
  
});

//Called when searching for movie release info
router.get('/release-info/*', function(req, res, term) {

  var args = {};
  
  //MOVE THIS SO ONLY ONE MOVIE OBJECT IS CREATED
  var m = movie.createMovie( API_KEY );
  m.searchIdInfo(term, args, function(error, result) {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
    sys.puts("Result is " + result);
    res.end( JSON.stringify(result) );
  });
  
});

//Create the server and listen on port 3000
http.createServer(router).listen(3000, "127.0.0.1");
sys.puts('server running at http://127.0.0.1:3000');