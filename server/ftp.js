var i18n = require('i18n');
var net = require('net');


var getPort = function(port, debug) {
	console.log(arguments);
	if(debug) {
		console.log(parseInt(port) + 60000);
		return parseInt(port) + 60000;
	} else {
		return parseInt(port);
	}
}


exports.ftp = function(config) {
	var self = this;

	this.messages = {
		"200": "Command okay.",
		"500": "Syntax error, command unrecognized.", // This may include errors such as command line too long.
		"501": "Syntax error in parameters or arguments.",
		"202": "Command not implemented, superfluous at this site.",
		"502": "Command not implemented.",
		"503": "Bad sequence of commands.",
		"504": "Command not implemented for that parameter.",
		"110": "Restart marker reply.", // In this case, the text is exact and not left to the particular implementation; it must read: MARK yyyy = mmmm Where yyyy is User-process data stream marker, and mmmm server's equivalent marker (note the spaces between markers and "=").
		"211": "System status, or system help reply.",
		"212": "Directory status.",
		"213": "File status.",
		"214": "Help message.", // On how to use the server or the meaning of a particular non-standard command. This reply is useful only to the human user.
		"215": "NodeFTP server emulator.", // NAME system type. Where NAME is an official system name from the list in the Assigned Numbers document.
		"120": "Service ready in %s minutes.",
		"220": "Service ready for new user.",
		"221": "Service closing control connection.", // Logged out if appropriate.
		"421": "Service not available, closing control connection.", // This may be a reply to any command if the service knows it must shut down.
		"125": "Data connection already open; transfer starting.",
		"225": "Data connection open; no transfer in progress.",
		"425": "Can't open data connection.",
		"226": "Closing data connection.", // Requested file action successful (for example, file transfer or file abort).
		"426": "Connection closed; transfer aborted.",
		"227": "Entering Passive Mode.", // (h1,h2,h3,h4,p1,p2).
		"230": "User logged in, proceed.",
		"530": "Not logged in.",
		"331": "User name okay, need password.",
		"332": "Need account for login.",
		"532": "Need account for storing files.",
		"150": "File status okay; about to open data connection.",
		"250": "Requested file action okay, completed.",
		"257": "\"%s\" created.",
		"350": "Requested file action pending further information.",
		"450": "Requested file action not taken.", // File unavailable (e.g., file busy).
		"550": "Requested action not taken.", // File unavailable (e.g., file not found, no access).
		"451": "Requested action aborted. Local error in processing.",
		"551": "Requested action aborted. Page type unknown.",
		"452": "Requested action not taken.", // Insufficient storage space in system.
		"552": "Requested file action aborted.", // Exceeded storage allocation (for current directory or dataset).
		"553": "Requested action not taken.", // File name not allowed.
	};


	this.protocol = {
		"ABOR": function() {}, // Abort an active file transfer.
		"ACCT": function() {}, // Account information
		"ADAT": function() {}, // Authentication/Security Data (RFC 2228)
		"ALLO": function() {}, // Allocate sufficient disk space to receive a file.
		"APPE": function() {}, // Append.
		"AUTH": function() {}, // Authentication/Security Mechanism (RFC 2228)
		"CCC":  function() {}, // Clear Command Channel (RFC 2228)
		"CONF": function() {}, // Confidentiality Protection Command (RFC 697)
		"ENC":  function() {}, // Privacy Protected Channel (RFC 2228)
		"EPRT": function() {}, // Specifies an extended address and port to which the server should connect. (RFC 2428)
		"EPSV": function() {}, // Enter extended passive mode. (RFC 2428)
		"HELP": function() {}, // Returns usage documentation on a command if specified, else a general help document is returned.
		"LANG": function() {}, // Language Negotiation (RFC 2640)
		"LPRT": function() {}, // Specifies a long address and port to which the server should connect. (RFC 1639)
		"LPSV": function() {}, // Enter long passive mode. (RFC 1639)
		"MDTM": function() {}, // Return the last-modified time of a specified file. (RFC 3659)
		"MIC":  function() {}, // Integrity Protected Command (RFC 2228)
		"MKD":  function() {}, // Make directory.
		"MLSD": function() {}, // Lists the contents of a directory if a directory is named. (RFC 3659)
		"MLST": function() {}, // Provides data about exactly the object named on its command line, and no others. (RFC 3659)
		"MODE": function() {}, // Sets the transfer mode (Stream, Block, or Compressed).
		"NOOP": function() {}, // No operation (dummy packet; used mostly on keepalives).
		"OPTS": function() {}, // Select options for a feature. (RFC 2389)
		"REIN": function() {}, // Re initializes the connection.
		"STOU": function() {}, // Store file uniquely.
		"STRU": function() {}, // Set file transfer structure.
		"PBSZ": function() {}, // Protection Buffer Size (RFC 2228)
		"SITE": function() {}, // Sends site specific commands to remote server.
		"SMNT": function() {}, // Mount file structure.
		"RMD":  function() {}, // Remove a directory.
		"STAT": function() {}, //
		
		"FEAT": function() {},
		"SYST": function() {}, // return system type

		"CDUP": function() {}, // Change to parent directory 
		"CWD":  function() {}, // Change working directory
		"PWD":  function() {}, // Get working directory
		"XPWD": function() {}, // Alias to PWD

		"TYPE": function() {}, // Change data encoding

		"USER": function() {}, //Authentication
		"PASS": function() {}, // Automatically accept password

		"PASV": function() {}, // Enter passive mode
		"PORT": function() {}, // Active mode
		
		"LIST": function() {}, // Filesystem
		"NLST": function() {}, // list of file names
		"RETR": function() {}, // retrive file
		"STOR": function() {}, // store file
		"DELE": function() {}, // delete file
		"RNFR": function() {}, // rename file from
		"RNTO": function() {}, // rename file to
		"REST": function() {}, // resume interrupetd transfer
		"QUIT": function() {} // end comunincation
	}









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
};