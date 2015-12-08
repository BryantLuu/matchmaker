var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(__dirname + "/static"));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs'); 

require("./config/routes.js")(app);

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
