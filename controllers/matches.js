// Twilio Credentials 
var credentials = require('../config/credentials.js')
 
//require the Twilio module and create a REST client 
var client = require('twilio')(credentials.accountSid, credentials.authToken); 

var matchQueue = [];

module.exports = {
  addQueue: function(req, res){
    client.messages.create({ 
      to: "+14086558756", 
      from: "+16503833792", 
      body: req.body.message, 
      mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
    }, function(err, message) { 
          console.log(message.sid); 
    });
    matchQueue[req.body.message] = req.body.message;
    console.log(matchQueue);
    res.redirect('/');
    sayHello();
  }
}

function sayHello(){
  console.log('hi');
}
