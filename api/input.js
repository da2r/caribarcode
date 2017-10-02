const sqlite3 = require('sqlite3');

exports.execute = function (param) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database('./database.db');
		const stmt = db.prepare("REPLACE INTO upc_data(upc, data) VALUES (?, ?)");
		stmt.run(param.upc, JSON.stringify(param));
		stmt.finalize();

		// console.log('printout values :');
		// db.each("SELECT * FROM upc_data", function (err, row) {
		// 	console.log(row);
		// });

		resolve({ s: true });
	});
}