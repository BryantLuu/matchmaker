var matches = require('../controllers/matches.js');

module.exports = function(app){
  app.get('/', function (req, res){
    res.render('index');
  })

  app.post('/findmatch', function (req, res){
    matches.findMatch(req, res);
  })

  app.post('/receivedMessage', function (req, res){
    matches.receivedMessage(req, res);
  })

  app.get('/confirmation', function (req, res){
    matches.confirmation
  })
};