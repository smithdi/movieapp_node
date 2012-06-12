/*! utils.js */
var sys = require('sys');
 
exports.merge = function(des, src) {
    for (var key in src) {
        if ( src.hasOwnProperty(key) ) {
            des[key] = src[key];
        }
    }
    return des;
};
 
exports.log = function(req, txt) {
  var ip = '';
  if (req.socket) {
    ip = req.socket.remoteAddress;
  }
  var dt = new Date;
  sys.puts( dt + ' ' + ip + ' ' + txt + ' ' + req.url );
}