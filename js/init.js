function init() {
	new Module().menu();
	
    // const db = new DB().setConObj();
    // state.db = db;
    // db.setConObj().setConnection(ct.direct).open().setCommand();
    createAccessCommand();
};

const Module = function() {
	this.container = jqById("container");
};
Module.prototype = {
	clear: function() {
		this.container.empty();
		return this;
	},
	menu: function() {
		this.clear();
		initMenuModule(this.container);
		return this;
	},
	sql: function() {
		this.clear();
		return this;
	},
	batch: function() {
		this.clear();
		return this;
	}
};

function initMenuModule(container) {
	const contents = jqNode("div", { id: "menu-contents" });
	const plate = jqNode("div", { id: "plate" });
	const modules = [
		{
			id: "sql-pannel",
			name: "SQL Management",
			callback: function() {
				new Module().sql();
			}
		},
		{
			id: "batch-pannel",
			name: "Batch Management",
			callback: function() {
				new Module().batch();
			}
		}
	];
	modules.forEach(function(item) {
		plate.append(createPannel(item.id, item.name, item.callback));
	});
	contents.append(plate);
	container.append(contents);
};

function createPannel(id, name, callback) {
	const pannel = jqNode("div", { id: id, class: "pannel" });
	pannel.text(name);
	pannel.click(function() {
		callback();
	});
	return pannel;
};



// function headerEnableScroll() {
// 	$(window).on("scroll", function() {
// 		jqById("header").css("left", -$(window).scrollLeft());
// 	});
// };

function createAccessCommand() {
	const accessCommand = jqById("access-command");
	const getInput = function(id, ph) {
		const input = jqNode("input", { type: "text", id: id, placeholder: ph });
		input.keypress(function(e) {
			const keyCode = e.which || e.keyCode;
			if(keyCode === 13) {
				onAccess();
			}
		});
		return input;
	};
	const getButton = function() {
		const button = jqNode("button", {}).text("ACCESS");
		button.click(function() {
			onAccess();
		});
		return button;
	};
	const sid = jqNode("div", { id: "command-line" }).append(getInput("sid", "SID"));
	const uid = jqNode("div", { id: "command-line" }).append(getInput("uid", "USER ID"));
	const pwd = jqNode("div", { id: "command-line" }).append(getInput("pwd", "PASSWORD"));
	const confirm = jqNode("div", { id: "command-line" }).append(getButton());
	[sid, uid, pwd, confirm].forEach(function(item) { accessCommand.append(item); });
};

function onAccess() {
	console.log("access");
};
