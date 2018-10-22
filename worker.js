var count = 0;
self.onmessage = function(e) {
	// count++;
	// const a = 1 + vaelw;
	// self.postMessage(count + ': ' + e.data.toUpperCase());
	while(count < 99999) {
		// console.log(count);
		count++;
	}
	self.postMessage(count);
	self.close();
};