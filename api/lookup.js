const sqlite3 = require('sqlite3');

exports.execute = function (param) {
	return new Promise((resolve, reject) => {

		console.log(param);
		const db = new sqlite3.Database('./database.db');
		db.get("SELECT data FROM upc_data where upc = ?", param.upc, function (err, row) {
			db.close();
			if (row && row.data) {
				resolve({
					s: true,
					d: JSON.parse(row.data)
				});
			} else {
				resolve(null);
			}
		});
	});
}