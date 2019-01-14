const express = require('express');
const router = express.Router();
const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('custom-env').env('staging')
const secret = process.env.DB_PASS
const jwt_id = process.env.DB_HOST
const environment = process.env.NODE_ENV || 'development'

const dbConfig = require('../knexfile.js')[environment]
const db = knex(dbConfig)

const protects = require('./middleWear.js');

function generateToken(user){
	const payload = {
		username: user.username,
	};
	const options = {
		expiresIn: '4h',
		jwtid: jwt_id,
	}
	return jwt.sign(payload, secret, options)
}


// -----Create-----
// create a new user
router.post('/register', (req, res) => {
	let  {username, email, password} = req.body
	password = bcrypt.hashSync(password, 13)
	db('users')
		.insert({username, email, password})
		.then(ids => {
			db('users') 
				.where({username, email, password})
				.first()
				.then(user => {
					const token = generateToken(user);
					return res.status(200).json({token, id: user.id})
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({msg: 'error generating token'})
				})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({msg: "there was an error registering user"})
		})
})

// -----Create-----
// creat a new user session
router.post('/login', (req, res) => {
	const creds = req.body;
	db('users')
		.where({username: creds.username})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				//console.log(user)
				const token = generateToken(user);
				res.status(200).json({token, id: user.id})
			} else {
				res.status(401).json({msg: 'You have failed to log in'})
			} 
		})
})

// -----Read-----
//get all game sessions for the user
router.get('/:id', protects, (req, res) => {
	const { id } = req.params
	db('users')
		.join('sessions', 'sessions.user_id', '=', 'users.id')
		.where({user_id: id})
		.then(response => {
			if (response.length == 0){
				return res.status(404).json({msg: 'no sessions found'})
			}

			let ar = []

			for (let i in response){
				ar.push({session_name: response[i].session_name, session_id: response[i].id})
			}

			return res.status(200).json({sessions: ar, by_user: response[0].username, email: response[0].email})
		})
		.catch(error => {
			res.status(500).json({msg: 'there was an error getting sessions'})
		})
})



// -----Update-----
//update a users name/email
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { username, email  } = req.body;

	//make sure form is filled out
	if(!req.body.username || !req.body.email){
		return res.status(400).json({msg: 'please provide information'})
	}

	db('users')
	.where({id})
	.update({username, email })
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error updating session'})
	})
})

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('users')
	.where({id})
	.del()
	.then(response => {
		if (response === 0){
			return res.status(404).json({msg: 'no user to delete'})
		}
		return res.status(200).json(response)
	})
})

module.exports = router;