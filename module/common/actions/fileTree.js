importScripts("../../../js/define.js");
importScripts("../../../js/services.js");

self.onmessage = function(e) {
    const printStack = new Array();
    const c = SIGN.c;
    const u = "\\";
    const tree = e.data.tree;
    const treeSize = e.data.size;
    Object.keys(tree).forEach(function(key) {
        const self = tree[key];
        self.files.forEach(function(file) {
            const root = key.split(u);
            const paddingSize = treeSize - root.length;
            const p = getIterator(paddingSize).map(function(item) { return SIGN.dash; });
            const lineString = root.concat(p).concat([file]).join(c);
            printStack.push(lineString);
        });
    });
    const fileTreeData = printStack.join(SIGN.nl);
	self.postMessage(fileTreeData);
    self.close();
};