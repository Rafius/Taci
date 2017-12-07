var paramsArray = [];

function doInit() {
	if (!initalized) {
		initalized = true;
		checkBLConnection();
	}
}

function checkBLConnection() {
	console.log('parent.wsks[0]=' + parent.wsks[0]);
	if (parent.wsks[0] != null) {
		wsBL = parent.wsks[0];
		setTimeout(function() {
			afterOpenBL();
		}, 1000);
	} else {
		setTimeout(function() {
			checkBLConnection();
		}, 5000);
	}
}

function afterOpenBL() {
	eraseList("taulaparams");
	sendMessageWS(wsBL, '{"header": { "idRequest": "testConsoleParameters"}, "component": "parametersHelper", "request": { "method": "getAllParametersContent", "fields": [{ "className": "java.lang.String", "value": ""}]}}');
}

$(document).ready(function() {
	doGrid();
});

function messageReceived(res) {
	// console.log('messageReceived in parameters');
	if (res.component == "parametersHelper") {
		var lastPrior = "NONE";
		var numComponents = 0;
		var numExtras = 0;

		if (res.header.idRequest == "testConsoleParameters" && res.response.method == "getAllParametersContent") {
			paramsArray = [];
			var componentsList = res.response.fields[0].value;
			var keys = Object.keys(componentsList);
			for (i = 0; i < keys.length; i++) {
				var key = keys[i];
				var value = componentsList[key];
				// console.log("parameter[" + key + "] = " + value);
				paramsArray.push({
					ParamKey : key,
					ParamValue : value
				});
			}
			paramsArray.sort(function(a, b) {
				var textA = a.ParamKey.toUpperCase();
				var textB = b.ParamKey.toUpperCase();
				return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});
			// console.log(paramsArray);
			var papar = document.getElementById("taulaparams");

			var sublevels = [];
			for (i = 0; i < 30; i++) {
				sublevels.push({
					sublevel : i,
					word : "",
					owner : 0
				});
			}
			var treeNum = 1;
			var weWannaSort = false;
			paramsArray.forEach(function(item) {
				var treeParent = 0;
				var paramKey = item.ParamKey;
				var nomSplit = item.ParamKey.split('.');
				if (weWannaSort) {
					for (i = 0; i < nomSplit.length; i++) {
						if (nomSplit[i] != sublevels[i].word) {
							sublevels[i].owner = treeNum;
							sublevels[i].word = nomSplit[i];

							var tr = document.createElement('tr');
							tr.setAttribute('class', 'treegrid-' + treeNum);
							if (treeParent != 0) {
								tr.classList.add('treegrid-parent-' + treeParent);
							} else {
								tr.classList.add('treegrid-collapsed');
							}
							var td = document.createElement('td');
							td.classList.add('max400');
							td.innerHTML = nomSplit[i];
							tr.appendChild(td);
							td = document.createElement('td');
							td.innerHTML = "";
							if (i == (nomSplit.length - 1)) {
								td.innerHTML = item.ParamValue;
							}
							tr.appendChild(td);
							papar.appendChild(tr);
							treeParent = treeNum;
							treeNum++;
						} else {
							paramKey = paramKey.substr(nomSplit[i].length + 1);
							treeParent = sublevels[i].owner;
						}
					}
				} else {
					var tr = document.createElement('tr');
					tr.setAttribute('class', 'treegrid-' + treeNum);
					tr.classList.add('treegrid-parent-' + treeParent);
					var td = document.createElement('td');
					// td.classList.add('max400');
					td.innerHTML = paramKey;
					td.setAttribute('alt', item.ParamKey);
					tr.appendChild(td);
					td = document.createElement('td');
					td.innerHTML = item.ParamValue;
					tr.appendChild(td);
					papar.appendChild(tr);
					treeNum++;
					// console.log(item);
				}
			})
			doGrid();
			adjustSizes();
		}

	}
}

function prepareToShow() {
	if (parent.wsks[0] != null) {
		afterOpenBL();
	}
}

function doGrid() {
	// $('.tree').treegrid();
	$('.tree').treegrid({
		onChange : function() {
			adjustSizes();
			console.log("Changed: " + $(this).attr("id"));
		},
		onCollapse : function() {
			console.log("Collapsed: " + $(this).attr("id"));
		},
		onExpand : function() {
			console.log("Expanded " + $(this).attr("id"));
		}
	});
	$('#node-1').on("change", function() {
		console.log("Event from " + $(this).attr("id"));
	});
}

function adjustSizes() {
	var theBottom = document.getElementById('taulaparams').getBoundingClientRect().bottom;
	parent.document.getElementById('divparams').setAttribute('height', (theBottom + 80) + 'px')
}
