const db = require('../database/connection');

const getUrls = async() => {
    const conn = await db.connect();
    const res = await conn.query('SELECT id, short_url, long_url, date_added from url;')
    await db.close(conn);
    return res.rows;
}

const addUrl = async(longUrl) => {
    const query = `INSERT INTO url(short_url, long_url,date_added) VALUES('${randomString(5)}',$1,'${timestamp()}') RETURNING *`
    const values = [longUrl];
    const conn = await db.connect();
    const res = await conn.query(query, values)
    await db.close(conn);
    return res.rows[0];
}

const deleteUrl = async(id) => {
    const query = `DELETE from url WHERE id = $1`;
    const values = [id];
    const conn = await db.connect();
    const res = await conn.query(query, values)
    await db.close(conn);
    return res.rows[0];
}

const redirectUrl = async(short_url) => {
    const query = `SELECT long_url from url WHERE short_url = $1`;
    const values = [short_url];
    const conn = await db.connect();
    const res = await conn.query(query, values)
   
    await db.close(conn);
    if (res.rows.length > 0){
        return res.rows[0].long_url;
    }
}

const timestamp = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


module.exports = {
    getUrls,
    addUrl,
    deleteUrl,
    redirectUrl
}