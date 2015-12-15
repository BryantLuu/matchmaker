// Twilio Credentials 
var credentials = require('../config/credentials.js')
 
//require the Twilio module and create a REST client 
var client = require('twilio')(credentials.accountSid, credentials.authToken); 

var matchQueue = {'1' : [],
                  '2' : [],
                  '3' : [],
                  '4' : [],
                  '5' : [],
                  '6' : []
                  };

module.exports = {
  findMatch: function(req, res){
    verifyUser(req.body.usertel)    
  },
  verifiedNumber: function(req, res){

  }
}

function queueOrMatch(user){
  var skill = user.body.skill;
  var telephone = user.body.usertel;
  if (matchQueue[skill].length == 0){
    matchQueue[skill].push(user.body.usertel)
  }
}

function validateUser(num){
  client.outgoingCallerIds.create({
    phoneNumber: num,
    statusCallback: "url" // url
  }, function(err, callerId) {
    return callerId.validationCode;
  });
}

function sendMessage(num, mess){
  client.messages.create({ 
      to: num, 
      from: "+16503833792", 
      body: mess, 
      mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
    }, function(err, message) { 
          console.log(message); 
    });
}
