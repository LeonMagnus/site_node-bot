var fs = require("fs"), //importe le file system
	app = require("express")(),//comme le http
	server = require('http').createServer(app),//pour cree le serveur
	io = require("socket.io").listen(server),//pour lechange entre le client et le serveur
	ent = require('ent'),//pour plus de securite pour le moment je luse pas
	EventEmitter = require('events').EventEmitter,//pour les event avec mon bot ect
	bots = require('./bot/bot.js');//ramener le code mon bot
//si il ce co par la page principale ou pas
var nom = "";
//pour le bot
var co=false;
var bot = new EventEmitter();
//pour la page principale
app.get("/", (req, res) => {
	res.sendfile(__dirname + '/connection/index.html');
});
app.get("/image/img3.jpg", (req, res) => {
	res.sendfile(__dirname + '/connection/image/img3.jpg');
});
app.get("/image/img4.jpg", (req, res) => {
	res.sendfile(__dirname + '/connection/image/img4.jpg');
});
//pour le chat entre perssone + bot
app.get("/chat.html", (req, res) => {
	if (co||nom != "")
			res.sendfile(__dirname + '/chat bot/chat.html');
		else
			res.sendfile(__dirname + '/chat bot/chaterr.html');
	});
	app.get("/image/img1.jpg", (req, res) => {
		res.sendfile(__dirname + '/chat bot/image/img1.jpg');
	});
	app.get("/image/img2.jpg", (req, res) => {
		res.sendfile(__dirname + '/chat bot/image/img2.jpg');
	});

//pour les video
app.get("/video/video1.mp4", (req, res) => {
	res.sendfile(__dirname + '/video/video1.mp4');
});
app.get("/video/video2.mp4", (req, res) => {
	res.sendfile(__dirname + '/video/video2.mp4');
});
app.get("/video/video3.mp4", (req, res) => {
	res.sendfile(__dirname + '/video/video3.mp4');
});
	//connection entre clien et serveur en temps real
io.sockets.on('connection', (socket, name) => {
	//event recupere depuis le client
	socket.on('new', name => {
		nom = name;
	});
	socket.on("del", () => {
		nom = "";
	});
	//resevoir et envoille le message a tous le monde
	socket.on("message", data => {
		socket.broadcast.emit("send", { name: data.user, mes: data.message });
	});
	//event emut pour le clien
	socket.emit("name", nom);
	//pour le bot il va verifier les commande
	socket.on("message", data => {
		bot.emit("message", data);
	});
	bot.on("message", data => {
		data.rep = false;
		data = bots.cmd(data);
		if (data.rep) {
			data.user = "bot";
			socket.broadcast.emit("send", { name: data.user, mes: data.message });
		}

	});

	});
server.listen(8080);
