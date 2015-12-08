var matches = require('../controllers/matches.js');

module.exports = function(app){
  app.get('/', function (req, res){
    res.render('index');
  })

  app.post('/match', function (req, res){
    matches.addQueue(req, res);
  })
};