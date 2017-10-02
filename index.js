// Init Database
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');
db.run("CREATE TABLE IF NOT EXISTS upc_data (upc NUMERIC PRIMARY KEY, data TEXT)");
// db.run("DELETE from upc_data");
db.close();

// Start Server
const server = require('./server');
const PORT = 8916;
server.start(PORT, function () {
	console.log('Server started on port ' + PORT);
});