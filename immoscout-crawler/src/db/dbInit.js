const mysql = require('mysql');
const { promisify } = require('util');
const { storage: { host, user, password, database } } = require('../config/config');
const connUrl = process.env.NODE_ENV === 'production' ? host : 'localhost';

const createTableSql = `CREATE TABLE IF NOT EXISTS apartments(
  record_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	region VARCHAR(50) NOT NULL,
	date DATE NOT NULL,
	id VARCHAR(20) NOT NULL,
	price DECIMAL(20, 0),
	size DECIMAL(10, 2),
	rooms DECIMAL(3, 1),
	distance DECIMAL(5, 2),
	UNIQUE (id, price),
	INDEX (region, rooms),
	INDEX (date) 
)`;

let connection;

module.exports.getConnection = () => {
  return connection
};

module.exports.createConnection = async () => {
  connection = mysql.createConnection({ host: connUrl, user, password, database });
  connection.connect = promisify(connection.connect);
  await connection.connect();
  connection.on('error', function(err) {
    console.log('Connection error', err);
  });
  connection.query(createTableSql, function(error, results) {
    if (error) console.log(error);
  });
};

module.exports.closeConnection = async () => {
  connection.end = promisify(connection.end);
  await connection.end()
};
