// const constructor = {
// 	type: {
// 		onAccess: "onAccess"
// 	}
// };

// self.onmessage = function(e) {
// 	const _this = e.data.module;
// 	const type = e.data.type;
// 	const params = e.data.params;
// 	switch(type) {
// 		case constructor.type.onAccess: {
// 			// _this.mainConnect().setConnectObject().open(params.connectString);
// 			// self.postMessage(_this);
// 			self.postMessage(_this.Define.CAPTIONS.title);
// 			self.close();
// 			break;
// 		}
// 	}
// };
self.onmessage = function(e) {
	self.onmessage = null; // Clean-up
	eval(e.data);
};