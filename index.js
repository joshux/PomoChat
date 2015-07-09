var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var users = [];

var messages = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded());
app.get('/', function(req,res){
	res.render('index');
});

app.post('/', function(req,res){
	users.push(req.body);
	console.log(users);
	res.redirect('/chatroom');
});

app.get('/chatroom', function(req,res) {
	res.render('chatroom',{userArray:users, messageArray:messages});


});


var server = app.listen(3000);
var io = require('socket.io')(server);

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		messages.push(msg);
		console.log(messages);
		socket.broadcast.emit('server response', msg);
	});
	socket.on('clock start', function(){
		socket.broadcast.emit('server response: start your clocks');
		socket.emit('server response: start your clocks');
		// var intervalCounter=0;
		
		var timer = function (minutes,type) {
			setTimeout(function(){
				console.log(type);
				socket.broadcast.emit('response' , type);
				socket.emit('response' , type);
			}, minutes * 60 * 1000)
		};

		function timeInterval(){
			socket.broadcast.emit('response' , 'work');
			socket.emit('response' , 'work');
			// if (intervalCounter > 3)
			timer(25,'work');			
			timer(25 + 5,'break');
			console.log(new Date);
			// intervalCounter++;			
		}
		timeInterval();
		setInterval(timeInterval, 30 * 60 *1000);
	});
});

