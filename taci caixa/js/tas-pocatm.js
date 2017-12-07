var connected = false;
var pagewi, pagehe;
function initialize() {
	rotatePubli();
	connectToML();
}
function connectToML() {
	hideAll();
	$("#divoos").removeClass("hidden");
	$("#buttonsarea").removeClass("hidden");
	connected = false;
	var url = "ws://" + getServer() + ":1716/component";
	console.log(url);
	connectTo(url);
}
function rotatePubli() {
	setTimeout(function() {
		if (publiimage == 1) {
			$("#publicitat").attr('src', 'assets/publi02.jpg');
			publiimage = 2;
		} else if (publiimage == 2) {
			$("#publicitat").attr('src', 'assets/publi03.jpg');
			publiimage = 3;
		} else if (publiimage == 3) {
			$("#publicitat").attr('src', 'assets/publi01.jpg');
			publiimage = 1;
		}
		rotatePubli();
	}, 3000);
}
function afterClose() {
	if (connected) {
		connected = false;
		connectToML();
	}
}
function afterError() {
	hideAll();
	$("#divoos").removeClass("hidden");
	setTimeout(function() {
		connectToML();
	}, 5000);
}

function afterOpen() {
	hideAll();
	$("#divpublicitat").removeClass("hidden");
	connected = true;
	setMessage('{"component":"atmPoc", "request":{"method":"doConnect","fields":[]}}');
	sendMessage();
}

function messageReceived(res) {
	console.log('messageReceived in pocatm' + res);

	if (res.response.method == "doConnect") {
		if (res.code == "OK") {
			pagewi = $("#publicitat").width();
			pagehe = $("#publicitat").height();
			hideAll();
			$("#divmenu").removeClass("hidden");
			$("#buttonsarea").removeClass("hidden");
			$("#nomclient").html(res.response.fields[0].value);
			console.log(res.response.fields[0].value);
		} else {
			setTimeout(function() {
				afterOpen();
			}, 5000);
		}
	} else if (res.response.method == "startGetPin") {
		if (res.type == "EVENT") {
			console.log("event amb tecla " + res.response.fields[0].value);
			var tecla = res.response.fields[0].value;
			pintext = pintext + tecla;
			$("#pintext").html(pintext);
			if (pintext.lenght == 4) {
			}
		} else{
			pasta();
		}
	} 

	if (res.response.method == "doExit") {
		setInfo("<br>Gràcies per la confiança");
		setTimeout(function() {
			afterOpen();
		}, 3000);
	}
}

function sortim() {
	$("#buttonsarea").addClass("hidden");
	$("#pinarea").addClass("hidden");
	$("#notesarea").addClass("hidden");
	$("#infoarea").removeClass("hidden");
	setInfo("<br>Recolliu la<br>targeta");
	setMessage('{"component":"atmPoc", "request":{"method":"doExit","fields":[]}}');
	sendMessage();
}
var pintext = "";

function pinnow() {
	$("#buttonsarea").addClass("hidden");
	$("#pinarea").removeClass("hidden");
	$("#notesarea").addClass("hidden");
	pintext = "";
	$("#pintext").html(pintext);
	setMessage('{"component": "atmPoc","request": {"method": "startGetPin","fields": [{"type": "CALLBACK","className": "com.caixabank.tas.ml.component.debug.atmpoc.IAtmPocCallback"}]}}');
	sendMessage();
}

function pasta() {
	$("#buttonsarea").addClass("hidden");
	$("#pinarea").addClass("hidden");
	$("#notesarea").removeClass("hidden");
	can = document.getElementById('canvas');
	can.height = 200;
	can.width = pagewi;
	eurx = -100;
	eury = 20;
	ctx = can.getContext('2d');
	img = new Image();
	img.src = "assets/50eur.png";
	draw();
}

var can, ctx, img;
var eurx, eury;

function draw() {
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, eurx, eury, 180, 98);
	eurx += 20;
	if (eurx < canvas.width) {
		requestAnimationFrame(draw);
	} else {
		$("#notesarea").addClass("hidden");
		sortim();
	}
}

function setInfo(toShow) {
	$("#infoarea").removeClass("hidden");
	$("#texttoinfo").html("<b>" + toShow + "</b>")
}
var ws = null;
var message = null;
var pin = "";

function connect() {
	var URL = document.getElementById('url').value;
	connectTo(URL);
}

function getServer() {
	var server = window.location.hostname;
	if (server == "") {
		server = "localhost";
	}
	return server;
}

function connectTo(URL) {
	disconnect();
	ws = connectToWS(URL, ws);
	return ws;
}

function connectToWS(URL, newws) {
	if ('WebSocket' in window) {
		newws = new WebSocket(URL);
	} else if ('MozWebSocket' in window) {
		newws = new MozWebSocket(URL);
	} else {
		alert('Your web browser does not support WebSockets');
		return;
	}
	newws.onopen = function() {
		console.log('Connected! ' + newws);
		try {
			afterOpen(newws);
		} catch (err) {
			// never mind, we just tries if it exists
		}
	};
	newws.onmessage = function(event) {
		var message = event.data;
		console.log(message);
		var res = JSON.parse(message);
		if (res.code == "OK") {
			if (res.type == "EVENT") {
			} else {
			}
		} else {
		}

		messageReceived(res);
	};

	newws.onclose = function() {
		console.log('Disconnected!');
		newws = null;
		try {
			afterClose();
		} catch (err) {
			// never mind, we just tries if it exists
		}
	};

	newws.onerror = function(event) {
		console.log('There has been an error!');
		ws = null;
		try {
			afterError();
		} catch (err) {
			// never mind, we just tries if it exists
		}
	};

	return newws;
}

function disconnect() {
	if (ws != null) {
		ws.close();
		ws = null;
	}
}

function setMessage(inputMessage) {
	message = inputMessage;
	if (document.getElementById('mensaje') != null) {
		document.getElementById('mensaje').value = message;
	}
}

function sendMessage() {
	sendMessageWS(ws, message)
}

function sendMessageWS(ws, message) {
	if (ws == null) {
		console.log("please do connect", "redText");
	} else if (message == null) {
		console.log("please set a message", "redText");
	} else if (message == "") {
		console.log("please set a message", "redText");
	} else {
		// añadir timestamp actual a la peticion antes de enviarla
		var messageJson = JSON.parse(message);
		messageJson["timestamp"] = new Date().getTime();
		message = JSON.stringify(messageJson);

		ws.send(message);
		if (document.getElementById("sentCounter") != null) {
			document.getElementById("sentCounter").innerHTML = parseInt(document.getElementById("sentCounter").innerHTML, 10) + 1;
		}
	}
}
function hideAll() {
	$("#divpublicitat").addClass("hidden");
	$("#divmenu").addClass("hidden");
	$("#divoos").addClass("hidden");
	$("#buttonsarea").addClass("hidden");
	$("#pinarea").addClass("hidden");
	$("#infoarea").addClass("hidden");
	$("#notesarea").addClass("hidden");
}
