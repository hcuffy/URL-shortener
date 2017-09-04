
var mongodb = require('mongodb');
var url = 'hidden for now';
var MongoClient = mongodb.MongoClient;
var assert = require('assert');


 MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection to mongoDB established.');

    
     db.createCollection('addresslist', function(err, res) {
    
       if (err) throw err;
       
    console.log('Collection created!');
   
       //checking if the collection was really made
       
          var collectionInfo = db.collection('addresslist');
            
            collectionInfo.find({}).toArray(function(err, db) {
               console.log(collectionInfo.name);
            });
 
       module.exports.db = db;
  
      
       
       
    db.close();
       
       
        });
   
  }
   
});



