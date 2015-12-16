 
//require the Twilio module and create a REST client 
var client = require('twilio')

var matchQueue = {'1' : [],
                  '2' : [],
                  '3' : [],
                  '4' : [],
                  '5' : [],
                  '6' : []
                  };

module.exports = {
  findMatch: function(req, res){
    client.outgoingCallerIds.create({
      phoneNumber: req.body.usertel
    }, function(err, callerId) {
      if (callerId){
        res.render('confirmation', {callerId: callerId})
      } else if (err.code === 21450){
        sendMessage(req.body.usertel, req.body.skill)
        res.redirect('/');
      }
    });
    
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

function sendMessage(num, skill){
  client.messages.create({ 
      to: num, 
      from: "+16503833792", 
      body: "You are waiting to be matched with " + skill + " level players", 
      mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
    }, function(err, message) { 
          console.log(message); 
    });
}
