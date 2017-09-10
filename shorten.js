var isUrl = require("is-url");
var data = require('./datab.js');
var assert = require('assert');
var express = require('express');
var app = express();


module.exports.change = function (req, res) {

    var yoururl = req.params[0];


    if (!isUrl(yoururl)) {
        res.json({
            "Error": "Invalid URL",
        });
    } else if (isUrl(yoururl)) {

        data.connectToServer(function (err) {
            var db = data.getDB();



            db.collection('addresslist').find({
                url: yoururl
            }, function (err, ans) {



                if (ans.length) {
                    console.log("yes")
                } else {
                    console.log("no")
                }

            });

            /*  console.log("test");
                var collectionInfo = db.collection('addresslist');

                collectionInfo.find({}).toArray(function (err, result) {
                    console.log(result);
                });
                */

        });



    }

}
