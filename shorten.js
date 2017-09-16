var isUrl = require("is-url");
var data = require('./datab.js');
var assert = require('assert');
var express = require('express');
var app = express();
var db;
var id;


data.connectToServer(function (err) {
    db = data.getDB();

});


module.exports.create = function (req, res) {
    var yoururl = req.params[0];



    function display() {

        console.log('in check');
        db.collection('addresslist').find({
            original_url: yoururl
        }, {
            _id: 0
        }).toArray(function (err, ans) {

            if (err) throw err;

            res.redirect({ans
                
            });

        });

    }

    function addToDB() {
        var place = {
            'original_url': yoururl,
        };

        db.collection('addresslist').insert(place, function (err, doc) {
            var id = doc.insertedIds[0].toString();
            var newid = id.substring(id.length - 5);

            var newplace = {
                $set: {
                    'shortform': 'https://power-debt.glitch.me/' + newid
                }
            };

            if (err) throw err;
            console.log('Inserted Document');

            db.collection("addresslist").update(place, newplace, function (err, ans) {

                if (err) throw err;
                console.log("Document updated");
                display();

            });


            //    res.json(doc.insertedIds[0]);

        });

    }



    if (!isUrl(yoururl)) {
        res.json({
            "Error": 'Invalid URL',
        });

    } else if (isUrl(yoururl)) {

        db.collection('addresslist').count({
            'original_url': yoururl
        }).then(function (nums) {

            if (nums > 0) {
                display();
            } else {
                addToDB();
            }


        });




    }
}
