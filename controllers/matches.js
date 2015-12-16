 //require the Twilio module and create a REST client 
var client = require('twilio')();

var matchQueue = {'1' : [],
                  '2' : [],
                  '3' : [],
                  '4' : [],
                  '5' : [],
                  '6' : []
                  };
var matched = {};

module.exports = {
  findMatch: function(req, res){
    var usertel = req.body.usertel
    var skill = req.body.skill

    client.outgoingCallerIds.create({
      phoneNumber: usertel
    }, function(err, callerId) {
      if (callerId){
        res.render('confirmation', {callerId: callerId})
      } else if (err.code === 21450){
        
        if (matchQueue[skill].length == 0){
          matchQueue[skill].push(usertel);
          sendMessage(usertel, "You are waiting to be matched with level" + skill + " players.")
        } else {
          sendMessage(usertel, "You have been matched with a level " + skill + " player")
          matched[usertel] = matchQueue[skill][0].shift();
          matched[matchQueue[skill][0].shift()] = usertel;
        }
        res.redirect('/');
      }
    });
    
  },
  verifiedNumber: function(req, res){

  },
  receivedMessage: function(req, res){
    console.log (req.body);
  }
}

function queueOrMatch(user){
  var skill = user.body.skill;
  var telephone = user.body.usertel;
  if (matchQueue[skill].length == 0){
    matchQueue[skill].push(user.body.usertel)
  }
}

function sendMessage(num, message){
  client.messages.create({ 
      to: num, 
      from: "+16503833792", 
      body: message, 
      mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
    }, function(err, message) { 
          console.log(message); 
    });
}
