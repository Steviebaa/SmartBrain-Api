const express = require('express');
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcryptjs')

const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'test',
		database: 'smartbrain',
	}
});

const app = express();
app.use(express.json());
app.use(cors());

// GET ROOT
app.get('/', (req,res) => {	res.send(database.users) })

// POST SIGNIN
app.post('/signin', signIn.handleSignIn(db, bcrypt))

//POST REGISTER
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// GET PROFILE:userid
app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)})

// PUT IMAGE
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(3001, () => { console.log('app is running on port 3001') })