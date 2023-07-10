const {Pool} = require("pg");

const close = async(conn) => {
    conn.end();
}

const connect = async() => {
    try {
        const client = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        })

        await client.connect();
        return client;
    } catch(err){
        console.log(err);
    }
} 

module.exports = {
    connect,
    close
}