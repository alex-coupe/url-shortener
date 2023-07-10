const fs = require('fs');
const { readFile } = require('fs/promises')
const db = require('./connection');
const migrationsFolder = './database/migrations';
const dotenv = require('dotenv');
dotenv.config();

const migrateDB = async() => {
    const conn = await db.connect();
    
    if (conn){
        console.log("Migrating the database...");
        await checkForMigrationsTable(conn);
        await migrate(conn);
        await conn.end();
        console.log("Migration complete");
    } else {
        console.log("unable to get connection to DB");
    }

}
migrateDB();
const migrate = async(conn) => {
    try {
        // Get the files as an array
        const files = await fs.promises.readdir( migrationsFolder );
        if (files.length > 0){
            for( const file of files ) {
                const fileString = await readFile(migrationsFolder + '\\' + file,'utf-8');
                try {
                    const res = await conn.query(`SELECT count(*) from migrations where name = '${file}';`)
                    if (res.rows.length > 0 && res.rows[0].count === '0'){
                        console.log(`Migrating ${file}`)
                        await conn.query(fileString);
                        const date = new Date();
                        await conn.query(`INSERT INTO migrations (name,rolled_back,date_added) VALUES ('${file}',false,'${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}')`)
                        console.log("Migrated!")
                    }
                } catch (err){
                    console.log(`unable to migrate ${file} - ${err}`)
                }
            }
        } else {
            console.log('No migrations found');
        }
    }catch(err){
        console.log(err);
    }
    process.exit(0);
} 

const checkForMigrationsTable = async(conn) => {
    const res = await conn.query(`SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'migrations'
        );`)
        if (res.rows.length > 0 && res.rows[0].exists === false){
           await conn.query(`CREATE TABLE IF NOT EXISTS migrations (
                id BIGSERIAL PRIMARY KEY,
                name text UNIQUE,
                rolled_back boolean,
                date_added timestamp
             );`)
        }
}
