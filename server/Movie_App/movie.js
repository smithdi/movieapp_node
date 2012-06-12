/*! movie.js */
var http = require('http'),
    sys = require('sys'),
    utils = require('./utils');
 
var Movie = module.exports = exports = function Movie(api_key) {
  if (!api_key) throw Error("api_key required");
  this.api_key = api_key;
  this.host = "api.themoviedb.org";
  this.port = 80;
  this.per_page = 25;
};
 
exports.createMovie = function( api_key ) {
  return new Movie( api_key );
};
 
Movie.prototype._request = function(method, args, callback) {
 
  // aggregate all params  
  var defaults = {
    method: method,
    format: 'json',
    nojsoncallback: 1,
    api_key: this.api_key
  };
  var params = [];
  for (var key in defaults) {
    params.push( key + "=" + defaults[key] );
  }
  for (var key in args) {
    params.push( key + "=" + args[key] );
  }
 
  // set the url
  var url = "http://" + this.host + "/3/search/movie?query=" + encodeURIComponent(args.text) + "&api_key=" + this.api_key;
    
  sys.puts(url);

  var headers = {
    'accept' : '*/*',
    'host' : this.host,
  };
 
  // call api.themoviedb.org
  var req = http.createClient(this.port, this.host ).request( 'GET', url, headers );

  req.addListener('error', function(error) {
  	sys.put("Error");
  	console.log(error);
  });
       
  req.addListener('response', function(response) {
    var body = '';
    response.setEncoding('utf8');
     
    response.on('data', function(chunk) { 
    
      if (response.statusCode != 200) {
        callback( {stat: 'error', code: response.statusCode, message: 'response_on_data error'} );
        req.abort();
      } else {
        body += chunk;
      }
    });
    
    response.on('end', function() {

      var data = JSON.parse(body);
      
      if (data.total_results > 0) {
      	callback( null, data );
      } 
      else {
      	callback( {stat: 'error', code: data.code, message: data.message} );
      }
 
    });
 
  });
  req.end();
};
 
//Used to search for movie title
Movie.prototype.search = function(term, args, callback) {
   
  var args = args || {};
  var defaults = { privacy_filter:1, per_page:this.per_page, extras:'description,owner_name,url_m', text:term };
 
  var req = this._request( 
      'Movie.search',
      utils.merge( defaults, args ), 
      callback);
};

//For Individual Movie Id
Movie.prototype.searchId = function(term, args, callback) {
  
  var args = args || {};
  var defaults = { privacy_filter:1, per_page:this.per_page, extras:'description,owner_name,url_m', text:term };
  var req = this._requestMovie(
      'Movie.id/en-US/', 
      utils.merge( defaults, args ), 
      callback);
};


Movie.prototype._requestMovie = function(method, args, callback) {
 
  // aggregate all params  
  var defaults = {
    method: method,
    format: 'json',
    nojsoncallback: 1,
    api_key: this.api_key
  };
  var params = [];
  for (var key in defaults) {
    params.push( key + "=" + defaults[key] );
  }
  for (var key in args) {
    params.push( key + "=" + args[key] );
  }
 
  // set the url
  var url = "http://" + this.host + "/3/movie/" + encodeURIComponent(args.text) + "?&api_key=" + this.api_key;

  var headers = {
    'accept' : '*/*',
    'host' : this.host,
  };
 
  // call api.themoviedb.org
  var req = http.createClient(this.port, this.host ).request( 'GET', url, headers );

  req.addListener('error', function(error) {
  	sys.put("Error");
  	console.log(error);
  });
       
  req.addListener('response', function(response) {
    var body = '';
    response.setEncoding('utf8');
     
    response.on('data', function(chunk) { 
    
      if (response.statusCode != 200) {
        callback( {stat: 'error', code: response.statusCode, message: 'response_on_data error'} );
        req.abort();
      } else {
        body += chunk;
      }
    });
    
    response.on('end', function() {

      var data = JSON.parse(body);
      sys.puts(data);
      
      if (data.title != '') {
      	callback( null, data );
      } 
      else {
      	callback( {stat: 'error', code: data.code, message: data.message} );
      }
 
    });
 
  });
  req.end();
};

//For Individual Movie Id
Movie.prototype.searchIdInfo = function(term, args, callback) {
  
  var args = args || {};
  var defaults = { privacy_filter:1, per_page:this.per_page, extras:'description,owner_name,url_m', text:term };
  var req = this._requestMovieInfo(
      'Movie.id.release/en-US/', 
      utils.merge( defaults, args ), 
      callback);
};

Movie.prototype._requestMovieInfo = function(method, args, callback) {
 
  // aggregate all params  
  var defaults = {
    method: method,
    format: 'json',
    nojsoncallback: 1,
    api_key: this.api_key
  };
  var params = [];
  for (var key in defaults) {
    params.push( key + "=" + defaults[key] );
  }
  for (var key in args) {
    params.push( key + "=" + args[key] );
  }
 
  // set the url
  var url = "http://" + this.host + "/3/movie/" + encodeURIComponent(args.text) + "/releases?&api_key=" + this.api_key;
    
  //sys.puts(url);

  var headers = {
    'accept' : '*/*',
    'host' : this.host,
  };
 
  // call api.themoviedb.org
  var req = http.createClient(this.port, this.host ).request( 'GET', url, headers );

  req.addListener('error', function(error) {
  	sys.put("Error");
  	console.log(error);
  });
       
  req.addListener('response', function(response) {
    var body = '';
    response.setEncoding('utf8');
     
    response.on('data', function(chunk) { 
    
      if (response.statusCode != 200) {
        callback( {stat: 'error', code: response.statusCode, message: 'response_on_data error'} );
        req.abort();
      } else {
        body += chunk;
      }
    });
    
    response.on('end', function() {

      var data = JSON.parse(body);
      sys.puts(data);
      
      if (data.countries.length > 0) {
      	callback( null, data );
      } 
      else {
      	callback( {stat: 'error', code: data.code, message: data.message} );
      }
 
    });
 
  });
  req.end();
};