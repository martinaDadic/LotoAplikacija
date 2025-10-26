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
    ssl : true //koristi sigurni kanal      promjeni na true za render
})

export async function unosPodataka(iskaznica, lotoBrojevi) {
    await pool.query(
        'INSERT INTO loto_rezultati (broj_iskaznice, loto_brojevi) VALUES ($1, $2)', [iskaznica, lotoBrojevi]
    )
    const result = await pool.query('SELECT id FROM loto_rezultati WHERE broj_iskaznice = $1 ORDER BY vrijeme DESC LIMIT 1', [iskaznica])
    return result.rows[0].id;
}
/* export async function getComments() {
    const comments : string[] = [];
    const results = await pool.query('SELECT id, comment from comments');
    results.rows.forEach(r => {
    comments.push(r["comment"]);
});
return comments;
} */