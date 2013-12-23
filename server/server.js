var i18n = require('i18n');
var net = require('net');
var http = require('http');

var getPort = function(port, debug) {
	console.log(arguments);
	if(debug) {
		console.log(parseInt(port) + 60000);
		return parseInt(port) + 60000;
	} else {
		return parseInt(port);
	}
}

exports.web = function(config) {
	var server = http.createServer(function(req, res) {
		res.writeHead(200);
  		res.end("hello world\n");
	});

	var port = getPort(config.services.web.port, config.global.debugports);

	server.listen(port, function() {
		console.log(i18n.__("init_service", "web", port));
	});
};

exports.ftp = function(config) {
	var server = net.createServer(function(socket) {
		socket.on("data", function(buffer) {
			var data = buffer.toString();
		});
	});

	var port = getPort(config.services.ftp.port, config.global.debugports);

	server.listen(port, function() {
		console.log(i18n.__("init_service", "ftp", port));
	});
};

exports.smtp = function(config) {
	var server = net.createServer(function(c) {});
	var port = getPort(config.services.smtp.port, config.global.debugports);

	server.listen(port, function() {
		console.log(i18n.__("init_service", "smtp", port));
	});
};

exports.pop3 = function(config) {
	var server = net.createServer(function(c) {});
	var port = getPort(config.services.pop3.port, config.global.debugports);

	server.listen(port, function() {
		console.log(i18n.__("init_service", "pop3", port));
	});
};

exports.imap = function(config) {
	var server = net.createServer(function(c) {});
	var port = getPort(config.services.imap.port, config.global.debugports);

	server.listen(port, function() {
		console.log(i18n.__("init_service", "imap", port));
	});
};