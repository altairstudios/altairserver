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

/*exports.ftp = function(config) {
	var dataServer = net.createServer(function(socket) {
		socket.on("data", function(buffer) {
			var data = buffer.toString();
			console.log(data);
		});

		socket.on("connect", function() {
			console.log(arguments);
		});

		console.log(arguments);
	});

	var controlServer = net.createServer(function(socket) {
		socket.on("data", function(buffer) {
			var data = buffer.toString();
			console.log(data);
		});

		socket.on("connect", function() {
			console.log(arguments);
		});

		socket.on("connection", function() {
			console.log(arguments);
		});

		//console.log(typeof(socket));
		//socket.end([data]
		socket.write(220 + ' HELLO' + '\r\n');
	});

	var dataPort = getPort(config.services.ftp.ports.data, config.global.debugports);
	var controlPort = getPort(config.services.ftp.ports.control, config.global.debugports);

	dataServer.listen(dataPort, function() {
		console.log(i18n.__("init_service", "ftp data", dataPort));
	});

	controlServer.listen(controlPort, function() {
		console.log(i18n.__("init_service", "ftp control", controlPort));
	});
};*/

exports.ftp = require('./ftp.js').ftp;

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