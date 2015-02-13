var mongoose = require('mongoose');

var UrlShortnerSchema = new mongoose.Schema({
	cpt: Number,
	url: String,
	shortenUrl: String
});

module.exports = mongoose.model('URL', UrlShortnerSchema);
