var ws = null;
var wsRequest = null;
var httpRequest = null;
var message = null;
var printImage = 0;
var contador = 0;
var devicesList = [ "camera", "scannerBcs", "scannerCamera", "clientInterface", "beeper", "persistInHard", "sensors", "safeDoor", "fasciaLights", "operatorKey", "hardwarePc", "ttu", "card", "passbook", "nfc", "receipt", "envelopesAcceptor", "notesAcceptor", "billsDispenser", "billsRecycler",
		"encryptor", "checksAcceptor", "greeting" ];

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
	logMessage('connecting to ' + URL, "blueText");
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
		logMessage('Connected!', 'greenText');
		try {
			afterOpen(newws);
		} catch (err) {
			// never mind, we just tries if it exists
		}
	};
	newws.onmessage = function(event) {
		var message = event.data;
		// console.log(message);
		var res = JSON.parse(message);
		if (res.code == "OK") {
			if (res.type == "EVENT") {
				if (document.getElementById("okEvents") != null) {
					document.getElementById("okEvents").innerHTML = parseInt(document.getElementById("okEvents").innerHTML, 10) + 1
				}
				if (showMessages()) {
					logMessage(message, 'greenText');
				}
			} else {
				if (document.getElementById("okCounter") != null) {
					document.getElementById("okCounter").innerHTML = parseInt(document.getElementById("okCounter").innerHTML, 10) + 1
				}
				if (showMessages()) {
					if (res.component == "autoexecutor") {
						logMessage(message, 'grayText');
					} else {
						logMessage(message, 'greenText');
					}
				}
			}
		} else {
			if (document.getElementById("errorCounter") != null) {
				document.getElementById("errorCounter").innerHTML = parseInt(document.getElementById("errorCounter").innerHTML, 10) + 1
			}
			logMessage(message, 'redText'); // con error rojo
		}
		if (res.component == "camera") {
			if (res.response.method == "startCamera") {
				// alert(res.response.fields[0].value);
				ready(res.response.fields[0].value.replace("localhost", getServer()));
			}
		}
		try {
			console.log(res.response.fields[0].value);
		} catch (err) {
		}
		try {
			messageReceived(res);
		} catch (err) {
			console.log('messageReceived not found, but never mind');
		}
		try {
			takeMessage(message);
		} catch (err) {
			// never mind, we just tries if it exists
		}
	};

	newws.onclose = function() {
		logMessage('Disconnected!', 'redText');
		newws = null;
		try {
			afterClose();
		} catch (err) {
			// never mind, we just tries if it exists
		}
	};

	newws.onerror = function(event) {
		logMessage('There has been an error!', 'redText');
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

var timesSent = 0;
var checkTimesSentAndSendMessageId = null;

function sendMessageNTimes() {
	timesSent = 0;
	var intervalAux = document.getElementById('interval').value;
	checkTimesSentAndSendMessageId = setInterval(checkTimesSentAndSendMessage, intervalAux);
}

// Comprueba que aun no se ha llegado al numero de envios y envia la petición
function checkTimesSentAndSendMessage() {
	var timesAux = document.getElementById('times').value;
	if (timesSent < timesAux) {
		sendMessage();
		timesSent++;
	} else {
		// deshabilitar el setInterval
		clearInterval(checkTimesSentAndSendMessageId);
	}
}

function sendMessage() {
	sendMessageWS(ws, message)
}

function sendMessageWS(ws, message) {
	if (ws == null) {
		logMessage("please do connect", "redText");
	} else if (message == null) {
		logMessage("please set a message", "redText");
	} else if (message == "") {
		logMessage("please set a message", "redText");
	} else {
		// añadir timestamp actual a la peticion antes de enviarla
		var messageJson = JSON.parse(message);
		messageJson["timestamp"] = new Date().getTime();
		message = JSON.stringify(messageJson);

		ws.send(message);
		if (document.getElementById("sentCounter") != null) {
			document.getElementById("sentCounter").innerHTML = parseInt(document.getElementById("sentCounter").innerHTML, 10) + 1;
		}
		if (showMessages()) {
			logMessage(message, "blueText");
		}
	}
}

function startCamera() {
	setMessage('{"component":"camera", "request":{"method":"startCamera","fields":[]}}');
	sendMessage();
}

function stopCamera() {
	wsRequest = null;
	httpRequest = null;
	setMessage('{"component":"camera", "request":{"method":"stopCamera","fields":[]}}');
	sendMessage();
	setNoCamera();
}

function setNoCamera() {
	$("#image").attr('src', 'assets/nocamera.png');
	$("#imageMirrowed").attr('src', 'assets/nocamera.png');
}

function ready(url) {
	if (url.substring(0, 4) != "http") {
		if (wsRequest == null) {
			wsRequest = new WebSocket(url);
			wsRequest.onopen = function() {
				wsRequest.send('Ping');
			};

			wsRequest.onerror = function(e) {
			};

			wsRequest.onerror = function(error) {
			};

			var img;
			wsRequest.onmessage = function(e) {
				if (wsRequest != null) {
					logImage(e.data.substring(0, 99), 'success');
					$("#image").attr('src', 'data:image/jpg;base64,' + e.data);
					$("#imageMirrowed").attr('src', 'data:image/jpg;base64,' + e.data);
				}
			}
		}
	} else {
		if (httpRequest == null) {
			httpRequest = new XMLHttpRequest();
			httpRequest.onreadystatechange = function() {
				if (httpRequest.readyState == 4) {
					try {
						data = this.responseText;
						logImage(data.substring(0, 99), 'warning');
						$("#image").attr('src', 'data:image/jpg;base64,' + data);
						$("#imageMirrowed").attr('src', 'data:image/jpg;base64,' + data);
					} catch (err) {
					}
					contador = contador + 1;
					setTimeout(function() {
						httpRequest.open('GET', url + '?_=' + new Date().getTime());
						httpRequest.send();
					}, 50);
				}
			}
			httpRequest.open('GET', url + '?_=' + new Date().getTime());
			httpRequest.send();
		}
	}
}

function logMessage(mess, style) {
	try {
		var stringfied = JSON.stringify(JSON.parse(mess), null, 4);
		var messages = stringfied.replace(/[\n\r]/g, '<br/>').split(' ').join('&nbsp;');
		//console.log("ganganstyle: " + style);
		$("div#logArea").prepend('<span class="' + style + '">' + messages + ' </span> <br/>');
	} catch (err) {
		var messages = ('<span class="' + style + '">' + mess + ' </span> <br/>');
		$("div#logArea").prepend(messages);
	}
}

function logImage(mess, style) {
	printImage++;
	document.getElementById("alerta").className = 'alert alert-' + style;
	$("div#alerta").html(mess + ' ' + printImage);
}

function clearLog(message) {
	$("div#logArea").html("");
}

var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
function chrono() {
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	var hr = diff.getHours() - 1
	if (min < 10) {
		min = "0" + min
	}
	if (sec < 10) {
		sec = "0" + sec
	}
	document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec
	timerID = setTimeout("chrono()", 10)
}

function chronoStart() {
	var myElement = document.getElementById('cronoStart');
	if (myElement != null) {
		myElement.innerHTML = myElement.innerHTML.replace("start", "pause");
		myElement.onclick = chronoStop;
		myElement.className = myElement.className.replace("btn-success", "btn-primary");
	}
	if (document.getElementById("cronoReset") != null) {
		document.getElementById("cronoReset").onclick = chronoReset
	}
	start = new Date()
	chrono()
}

function chronoContinue() {
	var myElement = document.getElementById('cronoStart');
	if (myElement != null) {
		myElement.innerHTML = myElement.innerHTML.replace("resume", "pause").replace("start", "pause");
		myElement.className = myElement.className.replace("btn-warning", "btn-primary");
		myElement.onclick = chronoStop;
	}
	document.getElementById("cronoReset").onclick = chronoReset
	start = new Date() - diff
	start = new Date(start)
	chrono()
}

function chronoReset() {
	document.getElementById("chronotime").innerHTML = "0:00:00";
	start = new Date()
}

function chronoStopReset() {
	document.getElementById("cronoStart").onclick = chronoStart
	var myElement = document.getElementById('cronoStart');
	if (myElement != null) {
		myElement.innerHTML = myElement.innerHTML.replace("resume", "start");
		myElement.className = myElement.className.replace("btn-warning", "btn-success");
		myElement.onclick = chronoStart;
	}
	document.getElementById("chronotime").innerHTML = "0:00:00";
}

function chronoStop() {
	var myElement = document.getElementById('cronoStart');
	if (myElement != null) {
		myElement.innerHTML = myElement.innerHTML.replace("pause", "resume");
		myElement.className = myElement.className.replace("btn-primary", "btn-warning");
		myElement.onclick = chronoContinue;
	}
	document.getElementById("cronoReset").onclick = chronoStopReset
	clearTimeout(timerID)
}

function changeTimeIterval(times, interval) {
	document.getElementById('times').value = times;
	document.getElementById('interval').value = interval;
}

function resetCounter(counter) {
	document.getElementById(counter).innerHTML = 0
}

function resetCounters(counter1, counter2, counter3, counter4) {
	resetCounter(counter1);
	resetCounter(counter2);
	resetCounter(counter3);
	resetCounter(counter4);
}

function querySt(ji) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");

	for (i = 0; i < gy.length; i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji) {
			return ft[1];
		}
	}
}

function sleep(miliseconds) {
	var currentTime = new Date().getTime();
	while (currentTime + miliseconds >= new Date().getTime()) {
	}
}

function showHideMessages() {
	if (document.getElementById('hideMessages') == null) {
		return;
	}
	var myElement = document.getElementById('hideMessages');
	if (showMessages()) {
		myElement.innerHTML = "Hidding messages";
		myElement.className = myElement.className.replace("btn-primary", "btn-danger");
	} else {
		myElement.innerHTML = "Showing messages";
		myElement.className = myElement.className.replace("btn-danger", "btn-primary");
	}
}

function showMessages() {
	if (document.getElementById('hideMessages') == null) {
		return true;
	}
	if (document.getElementById('hideMessages').innerHTML.includes('Hid')) {
		return false;
	}
	return true;
}

function eraseList(id) {
	var papar = document.getElementById(id);
	while (papar.firstChild) {
		papar.removeChild(papar.firstChild);
	}
}
