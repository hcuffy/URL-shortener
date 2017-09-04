var isUrl = require("is-url");
var data = require('./datab.js');
var assert = require('assert');

module.exports.change = function(req, res) {
 
  var theurl = req.params[0];
  
  if(isUrl(theurl)){
  console.log(theurl);
  }
  
  
}