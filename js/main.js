$(function () {
    init();
});

function accessDB() {
	const sid = jqById("sid").val();
	const uid = jqById("uid").val();
	const pwd = jqById("pwd").val();
	state.db.setParameter(sid, uid, pwd).setConnection(ct.direct);
	const conn = state.db;
	conn.open().then(function() {
		console.log("Successfully connected");
	}).catch(function(e) {
		console.log("Cannot connects to database");
	});
};