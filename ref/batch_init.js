function init() {
    // setEvent();
    setParameterInput();
};

function setEvent() {
	jqById("run").click(function() {
		run();
	});
};

function setParameterInput() {
	ids.forEach(function(id, idx) {
		const section = getSection(id);
		const batchFilePath = createInputNode(params.bfp, id, "Batch File Path");
		const appendList = new Array();
		appendList.push(batchFilePath);
		switch(idx) {
			case 0: {
				const tableName = createInputNode(params.tn, id, "Table Name");
				const productsCode = createTextareaNode(params.pc, id, "Products Code");
				appendList.push(tableName);
				appendList.push(productsCode);
				break;
			}
			case 1: {
				const productsCodeWithVersion = createTextareaNode(params.pc, id, "Products Code&Version");
				appendList.push(productsCodeWithVersion);
				break;
			}
			case 2: {
				const tableName = createTextareaNode(params.tn, id, "Table Name");
				appendList.push(tableName);
				break;
			}
		}
		appendList.forEach(function(item) {
			section.append(item);
		});
		setExecButton(id);
	});
};

function setExecButton(sectionId) {
	const buttonId = exec_type[sectionId];
	const button = jqNode("button", { id: buttonId }).text("EXEC");
	button.click(function() { execBatch(sectionId) });
	getTitle(sectionId).append(button);
};

function getTitle(id) {
	return jqById("title-" + id);
};

function createInputNode(paramId, sectionId, nodeName) {
	const div = jqNode("div", { class: "command-area" });
	const label = jqNode("label").text(nodeName);
	const input = jqNode("input", { type: "text", id: getParameterId(paramId, sectionId) });
	[label, input].forEach(function(item) {
		div.append(item);
	});
	return div;
};

function createTextareaNode(paramId, sectionId, nodeName) {
	const div = jqNode("div", { class: "command-area" });
	const label = jqNode("label").text(nodeName);
	const textarea = jqNode("textarea", { id: getParameterId(paramId, sectionId) });
	[label, textarea].forEach(function(item) {
		div.append(item);
	});
	return div;
};

function getSection(id) {
	return jqById("section-parameter-" + id);
};

function getParameterId(paramId, sectionId) {
	return paramId + "-" + sectionId;
};
