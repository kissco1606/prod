$(function () {
    init();
});

function run() {
	const value = jqById("textarea").val();
	const list = value.split(NL);
	const collection = new Object();
	list.forEach(function(item) {
		const temp = item.split(ES);
		const code = temp[0];
		const version = temp[1];
		if(collection[code]) {
			collection[code].version = version;
		}
		else {
			collection[code] = {
				code: code,
				version: version
			};
		}
	});

	state.collection = collection;
	const textList = new Array();
	Object.keys(collection).forEach(function(key) {
		const t = collection[key];
		const context = t.code + ES + t.version;
		textList.push(context);
	});
	
	const output = jqById("output");
	output.empty();
	output.append(jqNode("textarea").val(textList.join(NL)));
	output.append(jqNode("textarea", { id: "select" }));
	
	const selectButton = jqNode("button").text("select");
	selectButton.click(function() {
		versionSelect();
	});
	output.append(jqNode("div").append(selectButton));
	output.append(jqNode("div", { id: "select-output" }));
};

function versionSelect() {
	const value = jqById("select").val();
	const list = value.split(NL);
	const textList = new Array();
	list.forEach(function(item) {
		const t = state.collection[item];
		if(t) {
			textList.push(t.version);
		}
	});
	
	jqById("select-output").empty().append(jqNode("textarea").val(textList.join(NL)));
};


function execBatch(id) {
	let batchFilePath = jqById(getParameterId(params.bfp, id)).val();
	if(!batchFilePath) {
		alert("Please input batch file path");
		return false;
	}
	batchFilePath = batchFilePath.replace(new RegExp("\\\\", "g"), "\\\\");
	switch(id) {
		case ids[0]: {
			execRatePBatch(id, batchFilePath);
			break;
		}
		case ids[1]: {
			execRateVBatch(id, batchFilePath);
			break;
		}
		case ids[2]: {
			execByTableBatch(id, batchFilePath);
			break;
		}
	}
};

function execRatePBatch(id, path) {
	const tableName = jqById(getParameterId(params.tn, id)).val();
	if(!tableName) {
		alert("Please input table name");
		return false;
	}
	const productsCode = jqById(getParameterId(params.pc, id)).val();
	if(!productsCode) {
		alert("Please input products code");
		return false;
	}
	const shell = new ActiveXObject(WSH);
	const execList = productsCode.split(NEXT_LINE);
	execList.forEach(function(item, index) {
		if(item) {
			const commandList = new Array();
			commandList.push(path);
			commandList.push(tableName);
			commandList.push(item);
			const command = commandList.join(WHITE_SPACE);
			shell.Run(command, intWindowStyle, true);
			console.log("Complete exec[rate-p] > line:" + (index + 1) + " > parameter1:" + tableName + " & parameter2:" + item);
		}
	});
};

function execRateVBatch(id, path) {
	const productsCodeWithVersion = jqById(getParameterId(params.pc, id)).val();
	if(!productsCodeWithVersion) {
		alert("Please input products code");
		return false;
	}
	const shell = new ActiveXObject(WSH);
	const execList = productsCodeWithVersion.split(NEXT_LINE);
	execList.forEach(function(item, index) {
		if(item) {
			const commandList = new Array();
			commandList.push(path);
			const withList = item.split(EXCEL_SEPARATOR);
			const productsCode = withList[0];
			const version = withList[1];
			commandList.push(productsCode);
			commandList.push(version);
			const command = commandList.join(WHITE_SPACE);
			shell.Run(command, intWindowStyle, true);
			console.log("Complete exec[rate-v] > line:" + (index + 1) + " > parameter1:" + productsCode + " & parameter2:" + version);
		}
	});
};

function execByTableBatch(id, path) {
	const tableName = jqById(getParameterId(params.tn, id)).val();
	if(!tableName) {
		alert("Please input table name");
		return false;
	}
	const shell = new ActiveXObject(WSH);
	const execList = tableName.split(NEXT_LINE);
	execList.forEach(function(item, index) {
		if(item) {
			const commandList = new Array();
			commandList.push(path);
			commandList.push(item);
			const command = commandList.join(WHITE_SPACE);
			shell.Run(command, intWindowStyle, true);
			console.log("Complete exec[by-table] > line:" + (index + 1) + " > parameter1:" + item);
		}
	});
};

function execBatch1() {
	const shell = new ActiveXObject(WSH);
	const path = "C:\\Users\\psm37\\Desktop\\batch_test\\app.bat";
	["M320", "T210"].forEach(function(param) {
		const command = new Array();
		command.push(path);
		[param].forEach(function(item) { command.push(item) });
		shell.Run(command.join(WHITE_SPACE), 1, true);
	});
};