const express = require ('express');
const bodyParser = require ('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: `postgresql://jalal_postgresql_user:Xofey8mBYChofiKRwB51U73FwpnIKnxZ@dpg-cr0r333tq21c73ckb580-a.oregon-postgres.render.com/jalal_postgresql`,
    ssl: true 
  },
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{res.send('it is working!') })
app.post('/signin', signin.handleSignin(db, bcrypt)) // this function will run wit db and bcrybt, then it will run with req and res (advanced function topic)
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})
