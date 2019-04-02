const connection = require('./dbInit');
const format = require('date-fns/format');

const insertApartments = (apartments, region) => {
  const sqlInsert = `INSERT IGNORE INTO apartments
    (date, region, id, price, size, rooms, distance)
    VALUES `;

  const date = format(new Date(),'YYYY-MM-DD');
  let sql = apartments.reduce((query, item) => {
   return  query = query + `('${date}', '${region}', '${item.id}', ${item.price}, ${item.size}, ${item.rooms}, ${item.distance}),`
  }, sqlInsert);
  sql = sql.substring(0, sql.length - 1) + ';';

  connection.getConnection().query(sql, function (error, results) {
    if (error) {
      console.log(error)
    }
  });
};

module.exports = (apartments, region) => {
  insertApartments(apartments, region);
};