function selLayerChanged() {
	console.log(parent.wsks);
	var selected = document.getElementById('setLayersForExecution').selectedIndex;
	if (selected > 0) {
		currentWS = parent.wsks[selected - 1];
		if (currentWS != null) {
			sendMessageWS(currentWS, '{"header":{"idRequest":"testConsoleExecution"}, "component":"coreControl", "request":{"method":"getComponentInfoList","fields":[{"value":"com.caixabank.tas.core.commons.model.component.IComponent"}]}}');
		} else {
			alert('Layer not connected');
		}
	}
	eraseComponentsList();
}

function eraseComponentsList() {
	eraseList("setComponentsForExecution");
	document.getElementById("setComponentsForExecution").appendChild(document.createElement('option'));
	eraseInterfacesList();
}

function eraseInterfacesList() {
	eraseList("setInterfacesForExecution");
	activeInterfaces = new Array();
	eraseMethodsList();
}

function eraseMethodsList() {
	eraseList("setMethodsForExecution");
	document.getElementById("setMethodsForExecution").appendChild(document.createElement('option'));
	eraseParametersSection();
	recalculateExecTracesSpace();
	loggingActive = false;
}

function eraseParametersSection() {
	loggingActive = false;
	var papar = document.getElementById("executionTable");
	if (childsToKeep == 0) {
		childsToKeep = papar.childNodes.length;
		console.log('childsToKeep: ' + childsToKeep);
	}
	while (papar.childNodes.length > childsToKeep) {
		papar.removeChild(papar.lastChild);
	}
	parent.extraLogger = null;
	$("div#logAreaExecution").html("");
	$("#executionSuperTable").addClass('hidden');
}

function initializeInterfacesStage(methodsList) {
	eraseInterfacesList();
	publicmethods = methodsList;
	var papar = document.getElementById("setInterfacesForExecution");
	var lastInterface = "";
	for ( var meth in publicmethods) {
		var parts = meth.split(":");
		var miniparts = parts[0].split(".");
		var currentInterface = miniparts[0].replace("#", "").replace("*", "");
		if (currentInterface != lastInterface) {
			var label = document.createElement('label');
			label.setAttribute('class', 'labelaligned');
			var input = document.createElement('input');
			input.setAttribute('type', 'checkbox');
			label.appendChild(input);
			var checked = 'checked';
			if (miniparts[0].indexOf("#") != -1 || currentInterface == "IComponent") {
				checked = '';
			} else {
				checked = 'checked';
				activeInterfaces.push(currentInterface);
			}
			label.innerHTML = '<input type="checkbox" id="checkbox' + currentInterface + '" value="" onchange="recalculateMethods(this)" ' + checked + '>' + currentInterface;
			papar.appendChild(label);
		}
		lastInterface = currentInterface;
	}
	initializeMethodsStage();
}

function recalculateMethods(check) {
	var currentInterface = check.id.substring('checkbox'.length);
	console.log('Algun check ha canviat: ' + check.id + ' currentInterface: ' + currentInterface + ' checked: ' + check.checked);
	console.log(activeInterfaces);
	if (!check.checked) {
		var index = activeInterfaces.indexOf(currentInterface);
		if (index > -1) {
			activeInterfaces.splice(index, 1);
		}
	} else {
		activeInterfaces.push(currentInterface);
	}
	console.log(activeInterfaces);
	initializeMethodsStage();
}

function initializeMethodsStage() {
	eraseMethodsList();

	var papar = document.getElementById("setMethodsForExecution");
	for ( var meth in publicmethods) {
		var paramsInList = publicmethods[meth];
		var parts = meth.split(":");
		var miniparts = parts[0].split(".");
		var currentInterface = miniparts[0].replace("#", "").replace("*", "");
		if (activeInterfaces.indexOf(currentInterface) > -1) {
			var element = document.createElement('option');
			element.value = parts[0];
			element.innerHTML = parts[1];
			papar.appendChild(element);
		}
	}
}

function selComponentChanged() {
	selectedcomponent = setComponentsForExecution.value;
	console.log('selectedcomponent: ' + selectedcomponent);
	var externalInterface = "";
	var className = "";
	for (i = 0; i < publiccomponents.length; i++) {
		if (publiccomponents[i].componentName == selectedcomponent) {
			externalInterface = publiccomponents[i].componentInterfaceName;
			className = publiccomponents[i].componentClassName;
		}
	}
	console.log('externalInterface: ' + externalInterface);
	sendMessageWS(currentWS, '{"header":{"idRequest":"testConsole"}, "component":"autoexecutor", "request":{"method":"getExportedPublicMethods","fields":[{"value":"' + className + '"}]}}');
	eraseInterfacesList();
}

function selMethodChanged() {
	eraseParametersSection();
	var paramsInList = "";
	for ( var methd in publicmethods) {
		var parts = methd.split(":");
		if (parts[0] == setMethodsForExecution.value) {
			selectedmethod = parts[1];
			paramsInList = publicmethods[methd];
			break;
		}
	}
	var parametersList = paramsInList.split(":");
	var papar = document.getElementById("executionTable");
	if (parametersList.length > 1) {
		for (i = 0; i < parametersList.length - 1; i++) {
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			var input = document.createElement('input');
			if (parametersList[i].includes("Callback")) {
				input.value = "CALLBACK";
			}
			input.id = 'valueParameter' + i;
			input.setAttribute("style", "width: 95%; padding: 0px 3px;")
			td1.appendChild(input);
			tr.appendChild(td1);
			var td2 = document.createElement('td');
			td2.id = 'typeParameter' + i;
			td2.innerHTML = parametersList[i];
			tr.appendChild(td2);
			papar.appendChild(tr);
		}
		sendMessageWS(currentWS, '{"header":{"idRequest":"testConsole"},"component":"autoexecutor", "request":{"method":"getParametersInfo","fields":[{"value":"' + selectedcomponent + '"},{"value":"' + selectedmethod + '"},{"value":"' + paramsInList + '"}]}}');
		$("#executionSuperTable").removeClass('hidden');
	}
	recalculateExecTracesSpace();
}

function updateParams(remote) {
	var enumValues = remote.enumValues;
	for (var i = 0; i < 100; i++) {
		console.log('typeParameter' + i);
		var typePar = document.getElementById('typeParameter' + i);
		if (typePar != null) {
			console.log(typePar.innerHTML);
			var enums = enumValues[typePar.innerHTML];
			console.log(enums);
			if (enums.length > 0) {
				var papar = document.getElementById('valueParameter' + i).parentElement;
				papar.removeChild(document.getElementById('valueParameter' + i));
				var selection = document.createElement('select');
				selection.id = 'valueParameter' + i;
				selection.setAttribute('class', 'selectpicker tableselect');
				selection.setAttribute("style", "width: 95%; padding: 0px 3px; height: 24px;");
				var element = document.createElement('option');
				selection.appendChild(element);
				for (var j = 0; j < enums.length; j++) {
					element = document.createElement('option');
					element.innerHTML = enums[j];
					selection.appendChild(element);
				}
				papar.appendChild(selection);
			}
		} else {
			break;
		}
	}

	var lastValues = remote.lastValues;
	for (var i = 0; i < lastValues.length; i++) {
		try {
			var input = document.getElementById('valueParameter' + i);
			console.log(lastValues[i]);
			input.value = lastValues[i];
		} catch (err) {
			break;
		}
	}
}

function executeAction() {
	try {
		$("div#logAreaExecution").html("");
	} catch (err) {
		alert('if you are navigating via file maybe you need to allow it.\nTry restart Chrome using: ".../chrome.exe -allow-file-access-from-files"');
	}

	var fields = '';
	var fieldsList = '';
	for (var i = 0; i < 100; i++) {
		var input = document.getElementById('valueParameter' + i);
		var typec = document.getElementById('typeParameter' + i);
		if (input == null) {
			break;
		}
		console.log(input.value);
		if (i != 0) {
			fields += ',';
			fieldsList += ',';
		}
		if (input.value == "CALLBACK") {
			fields += '{"type":"CALLBACK","className":"' + typec.innerHTML + '"}';
		} else {
			var inputvalue = input.value.trim();
			if (!inputvalue.startsWith("{")) {
				inputvalue = '"' + inputvalue + '"';
			}
			fields += '{"className":"' + typec.innerHTML + '","value":' + inputvalue.replace(/'/g, '"') + '}';
		}
		fieldsList += '"' + input.value.replace(/"/g, "'") + '"';
	}

	var execMsg = '{"header":{"idRequest":"testConsole"},"component":"' + selectedcomponent + '", "request":{"method":"' + selectedmethod + '","fields":[' + fields + ']}}';

	console.log(execMsg);

	try {
		$("div#logAreaExecution").html("");
	} catch (err) {
		alert('if you are navigating via file maybe you need to allow it.\nTry restart Chrome using: ".../chrome.exe -allow-file-access-from-files"');
	}

	if (fieldsList.length > 0) {
		loggingActive = true;
		var tmpMsg = '{"header":{"idRequest":"testConsole"},"component":"autoexecutor", "request":{"method":"setLastParameters","fields":[{"value":"';
		tmpMsg += selectedcomponent + '"},{"value":"' + selectedmethod + '"},{"className":"java.util.ArrayList","value":[';
		tmpMsg += fieldsList;
		tmpMsg += ']}]}}';

		sendMessageWS(currentWS, tmpMsg);
		logMessageExecution(tmpMsg, "grayText");

		setTimeout(function() {
			sendMessageWS(currentWS, execMsg);
			logMessageExecution(execMsg, "blueText");
		}, 50);
	} else {
		loggingActive = true;
		sendMessageWS(currentWS, execMsg);
		logMessageExecution(execMsg, "blueText");
	}
}

function recalculateExecTracesSpace() {
	var traceBox = document.getElementById('logAreaExecution');
	var theTop = traceBox.getBoundingClientRect().top;
	var theBottom = parent.window.innerHeight;
	console.log('top: ' + theTop);
	console.log('bottom: ' + theBottom);
	traceBox.setAttribute("style", "width: 100%; height: " + (theBottom - theTop - 80) + "px;");
}

function messageReceived(res) {
	console.log('messageReceived in executions');
	if (res.component == "coreControl") {
		var lastPrior = "NONE";
		var numComponents = 0;
		var numExtras = 0;

		if (res.header.idRequest == "testConsoleExecution" && res.response.method == "getComponentInfoList") {
			console.log(res);
			var componentsList = res.response.fields[0].value;
			var cLen = componentsList.length;
			publiccomponents = new Array();

			for (i = 0; i < cLen; i++) {
				if (componentsList[i].componentClassName.indexOf("ParametersMapsManagementComponent") == -1) {
					var newComponent = {};
					newComponent.componentName = componentsList[i].componentId;
					newComponent.componentInterfaceName = componentsList[i].componentInterfaceName;
					newComponent.componentClassName = componentsList[i].componentClassName;
					publiccomponents[numComponents] = newComponent;
					numComponents++;
				}
			}
			console.log(publiccomponents);
			var isSorted = false;
			while (!isSorted) {
				isSorted = true;
				for (i = 0; i < numComponents - 1; i++) {
					if (publiccomponents[i + 1].componentName.toLowerCase() < publiccomponents[i].componentName.toLowerCase()) {
						isSorted = false;
						var tmpComponent = publiccomponents[i];
						publiccomponents[i] = publiccomponents[i + 1];
						publiccomponents[i + 1] = tmpComponent;
					}
				}
			}
			var papar = document.getElementById("setComponentsForExecution");
			for (i = 0; i < numComponents; i++) {
				var element = document.createElement('option');
				element.innerHTML = publiccomponents[i].componentName;
				papar.appendChild(element);
			}
			setTimeout(function() {
				recalculateExecTracesSpace();
			}, 50);
		}
	} else if (res.component == 'autoexecutor') {
		if (res.response.method == 'getExportedPublicMethods') {
			initializeInterfacesStage(res.response.fields[0].value);
		} else if (res.response.method == 'getParametersInfo') {
			updateParams(res.response.fields[0].value);
		}
	}
}

function takeMessage(message) {
	var res = JSON.parse(message);
	if (res.code == "OK") {
		if (res.component == "autoexecutor") {
			logMessageExecution(message, 'grayText');
		} else {
			logMessageExecution(message, 'greenText');
		}
	} else {
		logMessageExecution(message, "redText");
	}
}

function logMessageExecution(mess, style) {
	// console.log(style + " " + loggingActive + " " + mess);
	if (loggingActive) {
		try {
			var stringfied = JSON.stringify(JSON.parse(mess), null, 4);
			var messages = stringfied.replace(/[\n\r]/g, '<br/>').split(' ').join('&nbsp;');
			$("div#logAreaExecution").prepend('<span class="' + style + '">' + messages + ' </span> <br/>');
		} catch (err) {
			var messages = ('<span class="' + style + '">' + mess + ' </span> <br/>');
			$("div#logAreaExecution").prepend(messages);
		}
	}
}
