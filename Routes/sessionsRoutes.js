const express = require('express');
const router = express.Router();
const knex = require('knex')

const environment = process.env.NODE_ENV || 'development'

const dbConfig = require('../knexfile.js')[environment]
const db = knex(dbConfig)

const protects = require('./middleWear.js');

// -----Create-----
//post to sessions
router.post('', (req, res) => {
	const {session_name, user_id} = req.body

	//make sure form is filled out fully
	if (!req.body.session_name){
		return res.status(400).json({msg: 'please provide session name'})
	}

	db.insert({session_name, user_id}).into('sessions')
		.then(response => {
			return res.status(201).json({msg: 'session created'})
		})
		.catch(error => {
			res.status(500).json(error)
		})
})


// -----Read-----
//get all encounters for a session
router.get('/:id', protects, (req, res) => {
	const { id } = req.params
	db('sessions')
		.join('encounters', 'sessions.id', '=', 'encounters.session_id')
		.where({session_id: id})
		.then(response => {
			if (response.length == 0){
				return res.status(404).json({msg: 'no sessions found'})
			}
			console.log(response)

			let ar = []
			//I am finding all the encounters for a session
			for (let i in response){
				ar.push({encounter_name: response[i].encounter_name, monsters: response[i].monsters, session_id: response[i].session_id})
			}

			return res.status(200).json({session_encounters: ar})
		})
		.catch(error => {
			res.status(500).json({msg: 'there was an error getting sessions'})
		})
})

// -----Update-----
//update sessions/:id
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { session_name } = req.body;

	//make sure form is filled out
	if(!req.body.session_name){
		return res.status(400).json({msg: 'please provide information session name for update'})
	}

	db('sessions')
	.where({id})
	.update({session_name})
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error updating session'})
	})
})

// -----Delete-----
//delete a users session and all related encounters
router.delete('/:id', (req, res) => {
	const { id } = req.params
	db('sessions')
	.where({id})
	.del()
	.then(response => {
		console.log(response)
		if (response === 0){
			res.status(404).json({msg: 'no session to delete'})
		}
		return res.status(200).json(response)
		// db('encounters')
		// .where('session_id', id)
		// .del()
		// .then(response => {
		// 	if (response === 0){
		// 		return res.status(404).json({msg: 'no encounters to delete for session'})
		// 	} 
		// 	res.status(200).json(response)
		// })
	})
})

module.exports = router;