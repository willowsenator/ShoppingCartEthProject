const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database:'postgres',
    password:'my_secret_pw',
    port: 5432
});

const query = (sql, parameters) => {
    return new Promise((resolve, reject)=>{
        pool.connect((err, client, done)=>{
            if(err){
                reject(err);
                return;
            }
            client.query(sql, parameters, (error, result)=>{
                done();
                if(error){
                    reject(error);
                    return;
                }
                resolve(result.rows);
            });
        });
    });
}

module.exports = {
    query
}
