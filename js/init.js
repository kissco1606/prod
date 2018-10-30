function init() {
	transitonMenu();
	// const obj = {
	// 	connection: ""
	// };
	// var p = new Parallel(1000, {
	// 	evalPath: 'lib/parallel-js/eval.js'
	// });
	// const log = function(data) { console.log(data); };
	// const test = function(n) {
	// 	const ax = new ActiveXObject("ADODB.Connection");
	// 	return n;
	// };
	// p.map(test).then(log);
	// const slowSquare = function(n) { 
	// 	let i = 0; 
	// 	while (++i < n * n) {}
	// 	return i;
	// };
	// p.spawn(slowSquare).then(function(data) {
	// 	console.log(data);
	// });

	// let testObj = new Object();
    // testObj["one"] = {
    //     a: 1,
    //     b: 2
	// };
	// const oc = new ObjectController();
	// testObj = oc.connect(testObj, ["one", "c"]).update(3);
	// testObj = oc.connect(testObj, ["one", "b"]).update(4);
	// console.log(testObj);
	test();
	// const t = new Object();
	// setObject(t, ["a", "b"], 123);
	// console.log(t);
};

function test() {
	const path = "C:\\Users\\psm37\\Desktop\\tools";
	new FileTree(path).build();
	// store.eliminatePath = getRootPath(path);
    // iterateFiles(path, null, true, setFilesTree);
};

function setFileTreeObject(obj, keys, value) {
    return keys.reduce(function(prev, curr, i, a) {
        if(a.length === i + 1) {
			if(isVoid(prev[curr])) return prev[curr] = value;
			return prev[curr].files = prev[curr].files.concat(value.files);
		}
        if(isVoid(prev[curr])) return prev[curr] = new Object();
        return prev[curr];
    }, obj);
};

const FileTree = function(path) {
	this.eliminatePath = null;
	this.path = path;
	this.tree = new Object();
	this.u = "\\"
};
FileTree.prototype = {
	getRootPath: function() {
		return this.path.split("\\").filter(function(item, i, a) { return a.length > i + 1; }).join(this.u);
	},
	getAccessKey: function(path) {
		return getExistArray(path.replace(this.eliminatePath, SIGN.none).split(this.u));
	},
	setFilesTree: function(fileObj, _this) {
		const folder = fileObj.folder;
		const path = fileObj.path;
		const file = fileObj.file;
		const keys = _this.getAccessKey(path);
		// setFileTreeObject(_this.tree, keys, { files: [file.Name] });
		// console.log(keys);
		console.log(path + " > " + folder + " > " + file.Name);
	},
	iterateFiles: function(path, folder, recursive, actionPerFileCallback) {
		const _this = this;
		const fso = new ActiveXObject("Scripting.FileSystemObject"); 
		const folderObj = fso.GetFolder(path);
		const fileEnum = new Enumerator(folderObj.Files);
		for(; !fileEnum.atEnd(); fileEnum.moveNext()){
			const fileObj = {
				path: path,
				folder: folder ? folder : SIGN.none,
				file: fso.GetFile(fileEnum.item())
			};
			actionPerFileCallback(fileObj, _this);
		}
		if(recursive){
			const subFolderEnum = new Enumerator(folderObj.SubFolders);
			for(; !subFolderEnum.atEnd(); subFolderEnum.moveNext()){
				var subFolderObj = fso.GetFolder(subFolderEnum.item());
				this.iterateFiles(subFolderObj.Path, subFolderObj.Name, true, actionPerFileCallback);
			}
		}
	},
	build: function() {
		this.eliminatePath = this.getRootPath(this.path);
		this.iterateFiles(this.path, null, true, this.setFilesTree);
		const tree = this.tree;
		// console.log(tree);
	}
};

// function getRootPath(path) {
// 	return path.split("\\").filter(function(item, i, a) { return a.length > i + 1; }).join("\\");
// };

// function setFilesTree(fileObj) {
// 	const folder = fileObj.folder;
// 	const path = fileObj.path;
// 	const file = fileObj.file;
//     console.log(path + " > " + folder + " > " + file.Name);
// };

// function iterateFiles(path, folder, recursive, actionPerFileCallback){ 
//     const fso = new ActiveXObject("Scripting.FileSystemObject"); 
//     const folderObj = fso.GetFolder(path);
//     const fileEnum = new Enumerator(folderObj.Files);
//     for(; !fileEnum.atEnd(); fileEnum.moveNext()){
//         const fileObj = {
// 			path: path,
// 			folder: folder ? folder : SIGN.none,
// 			file: fso.GetFile(fileEnum.item())
//         };
//         actionPerFileCallback(fileObj);
//     }
//     if(recursive){
//         const subFolderEnum = new Enumerator(folderObj.SubFolders);
//         for(; !subFolderEnum.atEnd(); subFolderEnum.moveNext()){
//             var subFolderObj = fso.GetFolder(subFolderEnum.item());
//             iterateFiles(subFolderObj.Path, subFolderObj.Name, true, actionPerFileCallback);
//         }
//     }
// };

const ObjectController = function () {
    this.fromState = null;
    this.state = null;
	this.map = null;
};
ObjectController.prototype = {
    connect: function (state, map) {
        if (state) {
            this.fromState = state;
            this.state = Immutable.fromJS(state);
        }
		if (map) this.map = map;
        return this;
    },
    select: function () {
        if (!this.fromState || !this.map) return null;
        return Immutable.fromJS(this.fromState).getIn(this.map).toJS();
    },
    update: function (data) {
        if (!this.fromState || !this.state || !this.map) return null;
        const updated = this.state.updateIn(this.map, function(item) {
			// if(typeIs(item).object) return item.merge(data);
            return data;
        });
		this.fromState = updated.toJS();
        return this.fromState;
    },
    delete: function () {
        if (!this.fromState || !this.state || !this.map) return null;
        const updated = this.state.deleteIn(this.map);
        const rootMap = [];
        const filtered = updated.setIn(rootMap, updated.getIn(rootMap).filter(function(item, key) { return item.size >= 1; }));
        this.fromState = filtered.toJS();
        return this.fromState;
    }
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
	if(!(TYPES.client.activeXObejct in window)) {
		new Notification().warning().open("Not supported this client");
	}
};