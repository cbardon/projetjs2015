var express = require('express');
var router = express.Router();
var configJS = require('../config.js');
var mongoose = require('mongoose');
var UrlShortner = require('../template/urlSchema.js');

router.get('/', function (req, res) {
	res.render('index.html', {port: configJS.port});
})

router.get('/admin', function (req, res) {
    UrlShortner.find({}, function (error, docs) {
        var cpt = 0;
        docs.forEach(function (entry) {
            cpt += entry.cpt;
        });
        res.render('admin.html', {length: docs.length, cpt: cpt, port: configJS.port});
    });
})

module.exports = router;
