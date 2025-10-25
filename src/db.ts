//povezivanje sa PostgreSQL bazom

import { Pool } from 'pg'  //Pool je klasa koja omogućuje stvaranje pool-a konekcija prema bazi koje se ponovo koriste
import dotenv from 'dotenv' //omogućuje čitanje podataka iz .env filea pomoću process.env
dotenv.config() //čita env file i dodaje te vrijednosti u process.env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl : true //koristi sigurni kanal
})

/* export async function getComments() {
    const comments : string[] = [];
    const results = await pool.query('SELECT id, comment from comments');
    results.rows.forEach(r => {
    comments.push(r["comment"]);
});
return comments;
} */