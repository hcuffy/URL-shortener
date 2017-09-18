var mongodb = require('mongodb');
var url = 'mongodb://short:HaveFun@ds123614.mlab.com:23614/shortener';
var MongoClient = mongodb.MongoClient;
var database;

module.exports = {

    connectToServer: function (callback) {

        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                console.log('Connection to mongoDB established.');

                db.createCollection('addresslist', function (err, res) {

                    if (err) throw err;

                    database = db;

                    console.log('Collection created!');

                    /*var collectionInfo = database.collection('addresslist');
                       
                       collectionInfo.find({}).toArray(function(err, result) {
                          console.log(result);
                       });*/

                    return callback(err);
                });
            }
        });

    },

    getDB: function () {
        return database;
    }
};
