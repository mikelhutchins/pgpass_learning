const { Pool, Client } = require('pg');
const Query = require('pg').Query;
const connectionString = 'postgresql://mike@192.168.1.29:5432/usmaps'
var q = '';
const query = new Query('select name from us_states');
// const pool = new Pool({
//   connectionString: connectionString,
// });

// pool.query('select * from us_states', (err, res) => {
//   //console.log('Goodbye: ' + err, 'Hello: ' + res)
//   console.log(JSON.stringify(res.fields));
//   pool.end();
// });

const client = new Client({
  connectionString: connectionString,
});
client.connect();

const result = client.query(query);
//assert(query === result);

query.on('row', (row) => {
  //console.log('row!', row.name); // { name: 'brianc' }
   q = 'insert into testing values (\'' + row.name + '\')'
   client.query(q, (err1, re1s) => {
      });
});

query.on("end", function (result)
    {
        console.log("Fetch end ", result.rows);
        console.log("End time", Date.now());
        //client.end();
        //return;
    });

query.on('error', (err) => {
  console.error(err.stack);
});
