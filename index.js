var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// порт
server.listen(3000);

// url адреса і відображення  HTML сторінки
app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

// Масив з всіма підключеннями
connections = [];

// Функція, яка спрацює при підключенні до сторінки
// рахуєтсья к новий користувач
io.sockets.on('connection', function(socket) {
	console.log("Успешное соединение");
	//  додавання нового з'єднання в масив
	connections.push(socket);

	// Функція, яка спрацює при відключенні від сервера
	socket.on('disconnect', function(data) {
		// Видалення користувача з масиву
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});

	// Функція, яка отримує повідомлення від будь - якого користувача
	socket.on('send mess', function(data) {
		// Всередені функції ми передаємо подію 'add mess',
		// яка буде визвана у всіх користувачів і в них з'явиться нове повідомлення
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

});
