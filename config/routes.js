var matches = require('../controllers/matches.js');

module.exports = function(app){
  app.get('/', function (req, res){
    res.render('index');
  })

  app.post('/findmatch', function (req, res){
    matches.findMatch(req, res);
  })
};