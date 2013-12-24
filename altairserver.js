var i18n = require("i18n");
var fs = require('fs');
var file = __dirname + '/config.json';
var webserver = require('./server/server');
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  config = JSON.parse(data);
 
  i18n.configure({
    locales:config.locales.list,
    defaultLocale: config.locales.default,
    directory: __dirname + '/locales'
  });

  var uid = parseInt(process.env.SUDO_UID);
  if (uid) process.setuid(uid);

  if(uid) {
    if(config.services.smtp.run) {
      webserver.smtp(config);
    }
    if(config.services.pop3.run) {
      webserver.pop3(config);
    }
    if(config.services.imap.run) {
      webserver.imap(config);
    }
    if(config.services.web.run) {
      webserver.web(config);
    }
    if(config.services.ftp.run) {
      new webserver.ftp(config);
    }
  } else {
    console.error(i18n.__('error_sudo'));
  }
});