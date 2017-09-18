var isUrl = require("is-url");
var data = require('./datab.js');
var assert = require('assert');
var express = require('express');
var app = express();
var db;



data.connectToServer(function (err) {
    db = data.getDB();

});

function display(shortform, req, res) {
    var link = req.params[0];

    res.json({
        Origin: link,
        Shortened: 'https://power-debt.glitch.me/' + shortform
    });

}

function addToDB(yoururl, req, res) {
    var place = {
        'original_url': yoururl,
    };

    db.collection('addresslist').insert(place, function (err, doc) {
        var id = doc.insertedIds[0].toString();
        var newid = id.substring(id.length - 5);

        var newplace = {
            $set: {
                'shortform': newid
            }
        };

        if (err) throw err;
        console.log('Inserted Document');

        db.collection("addresslist").update(place, newplace, function (err, ans) {

            if (err) throw err;
            console.log("Document updated");
            display(newid, req, res);
        });

    });
}


module.exports.get = function (req1, res1) {

    var id = req1.params[0];

    db.collection('addresslist').find({
        shortform: req1.params.shortform
    }, {
        _id: 0
    }).toArray(function (err, ans) {

        if (err) throw err;
        if (ans.length > 0) {
            res1.redirect(ans[0].original_url

            );
            db.close();
        } else {
            res1.send('The link was not found')
        }
    });

}

module.exports.new = function (req, res) {


    var yoururl = req.params[0];
    console.log(yoururl);
    if (!isUrl(yoururl)) {
        res.json({
            "Error": 'Invalid URL',
        });

    } else if (isUrl(yoururl)) {

        db.collection('addresslist').find({
            'original_url': yoururl
        }).toArray(function (err, ans) {
            console.log(ans);
            if (ans.length > 0) {
                display(ans[0].shortform, req, res);
            } else {
                addToDB(yoururl, req, res);
            }


        });

    }
}
