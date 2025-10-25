import express from 'express'
import dotenv from 'dotenv'
import https from 'https'
import fs from 'fs' //modul za rad s fileovima
import path from 'path'
//import { getComments } from './db.ts';

dotenv.config()

const app = express();

/* app.get('/comments', async (req, res) => {
  const comments = await getComments();
  res.json(comments);
});
 */

app.set("view engine", "ejs"); 
app.set("views", "./views");
app.use(express.static('./public')); 

app.get('/', (req, res) => {
  res.render('index');
});

const externalUrl = process.env.RENDER_EXTERNAL_URL; //uzima javni URL sa rendera, ako postoji
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const config = {
  baseURL: externalUrl || `https://localhost:${port}`,
};

if (externalUrl) {
  const hostname = '0.0.0.0';
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  });
}
else {
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
    console.log(`Server running at https://localhost:${port}/`);
  });
}