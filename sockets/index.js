var shorturl = require('shorturl');
var UrlShortner = require('../template/urlSchema.js');

module.exports = function (io) {
	io.sockets.on('connection', function (socket) {
		console.log('-- Socket connectée --');
		
		socket.on('message', function (message) {
			shorturl(message, 'arseh.at', function (result) {
				socket.emit('message', {url: message, shortenUrl: result});
				var shorten = new UrlShortner({
					cpt: 0,
					url: message,
					shortenUrl: result
				});
				shorten.save(function (error) {
					if (error) {
						console.log(error);
					}
				});
			});
		});

		socket.on('count', function (url) {
			var cpt = 0;
			UrlShortner.find({}, function (error, docs) {
				docs.forEach(function (entry) {
					if (entry.url == url) {
						cpt = entry.cpt;
						++cpt;
						UrlShortner.update({'url': url}, {'cpt': cpt}, function (err) {
						})
					}
				})
			})
		});

		UrlShortner.find({}, function (error, docs) {
			docs.forEach(function (entry) {
				socket.emit('docs', {cpt: entry.cpt, url: entry.url, shortenUrl: entry.shortenUrl});
			});
			socket.emit('length', {length: docs.length});
		});
	});
}
