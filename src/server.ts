import express from 'express'
import dotenv from 'dotenv'
import https from 'https'
import fs from 'fs' //modul za rad s fileovima
import path from "path";
import { fileURLToPath } from "url";
import { auth } from 'express-openid-connect';
//import { getComments } from './db.ts';

dotenv.config()

const app = express();

/* app.get('/comments', async (req, res) => {
  const comments = await getComments();
  res.json(comments);
});
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const externalUrl = process.env.RENDER_EXTERNAL_URL; //uzima javni URL sa rendera, ako postoji
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: externalUrl || `http://localhost:${port}`, //externalUrl || `http://localhost:${port}`
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-i25ptmtk6aiqoev1.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
  res.render('index', {user: req.oidc.user});
});

if (externalUrl) { //externalUrl
  const hostname = '0.0.0.0';
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  });
}
else {
  /* https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
    console.log(`Server running at https://localhost:${port}/`);
  }); */
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}