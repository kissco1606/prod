function init() {
    // const db = new DB().setConObj();
    // state.db = db;
    // db.setConObj().setConnection(ct.direct).open().setCommand();
    createAccessCommand();
};

function headerEnableScroll() {
	$(window).on("scroll", function() {
		jqById("header").css("left", -$(window).scrollLeft());
	});
};

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
