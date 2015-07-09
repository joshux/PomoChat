var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.get('/', function(req,res){
  res.render('index');
});
app.post('/', function(req,res){
  console.log(req.body);
});
app.listen(3000);
