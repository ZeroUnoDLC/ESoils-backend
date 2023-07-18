import pkg from 'pg';
const { Pool } = pkg;


import  { db } from './config.js'


export const pool = new Pool({
    user:db.user,
    password: db.passsword,
    host: db.host,
    port: db.port,
    database: db.database
});

