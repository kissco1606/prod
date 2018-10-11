function init() {
	transitonMenu();
};

const Module = function() {
	this.container = jqById(eId.container);
};
Module.prototype = {
	menu: function() {
		state.module = { id: null };
		const _this = this;
		fadeOut(_this.container).then(function() {
			clearContainer();
			initMenuModule(_this.container);
		});
		return this;
	},
	sql: function() {
		state.module = { id: MI.sql };
		fadeOut(this.container).then(function() {
			clearContainer();
			new SqlModule().initSqlModule();
		});
		return this;
	},
	batch: function() {
		state.module = { id: MI.batch };
		fadeOut(this.container).then(function() {
			clearContainer();
			initBatchModule();
		});
		return this;
	}
};

function initMenuModule($container) {
	$container.css({ "margin-top": 0, "background-color": "transparent" });
	const contents = jqNode("div", { id: eId.menuContents });
	const plate = jqNode("div", { id: eId.plate });
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
	$container.append(contents);
	fadeIn($container);
};

function createPannel(id, name, callback) {
	const pannel = jqNode("div", { id: id, class: eClass.pannel });
	pannel.text(name);
	pannel.click(function() {
		callback();
	});
	return pannel;
};

function clearContainer() {
	jqById(eId.container).empty();
};

function transitonMenu() {
	new Module().menu();
};

// function headerEnableScroll() {
// 	$(window).on("scroll", function() {
// 		jqById("header").css("left", -$(window).scrollLeft());
// 	});
// };