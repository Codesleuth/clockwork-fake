var express = require('express'),
    xmlparser = require('express-xml-bodyparser'),
    fs = require('fs'),
    path = require('path');

module.exports.create = function () {
  var clockworkApp = express();
  var messages = [];

  var sendResponse = fs.readFileSync(path.join(__dirname, 'responses', 'send.xml'));

  clockworkApp.use(xmlparser());

  clockworkApp.post('/xml/send.aspx', function (req, res) {
    var key = req.body.message.key[0];
    var sms = req.body.message.sms;
    
    sms.forEach(function (msg) {
      messages.push({
        to: msg.to[0],
        body: msg.content[0],
        key: key
      });
    });

    res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' });
    res.write(sendResponse);
    res.end();
  });

  return {
    app: clockworkApp,
    messages: messages
  };
};