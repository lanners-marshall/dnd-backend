const express = require('express');
const router = express.Router();
const knex = require('knex')

const environment = process.env.NODE_ENV || 'development'

const dbConfig = require('../knexfile.js')[environment]
const db = knex(dbConfig)

const protects = require('./middleWear.js');


// -----Create-----
//create a new encounter for the session
router.post('/:id', (req, res) => {
	const {encounter_name, monsters} = req.body
	const {id} = req.params;
	console.log(id)
	console.log(req.body)
	if (!req.body.encounter_name){
		return res.status(400).json({msg: 'please provide encounter name'})
	}

	db.insert({encounter_name, session_id: id, monsters }).into('encounters')
		.then(response => {
			console.log(JSON.parse(response))
			return res.status(201).json({msg: 'encounter created'})
		})
		.catch(error => {
			res.status(500).json(error)
		})
})


// -----Read-----
//get an encounter from a session
router.get('/:id', (req, res) => {
	const {id} = req.params;
	db('encounters')
	.where({id})
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error finding encounter'})
	})
})

// -----Update-----
//update  an encounter
router.put('/:id', (req, res) => {
	const {id} = req.params;
	const { encounter_name} = req.body;

	if(!req.body.encounter_name){
		return res.status(400).json({msg: 'please provide new name of encounter'})
	}

	db('encounters')
	.where({id})
	.update({encounter_name})
	.then(response => {
		res.status(200).json({response})
	})
	.catch(error => {
		res.status(500).json({msg: 'error updating encounter'})
	})
})


// -----Delete-----
//delete an encounter
router.delete('/:id', (req, res) => {
	const {id} = req.params;

	db('encounters')
	.where({id})
	.del()
	.then(response => {
		if (response === 0){
			return res.status(404).json({msg: 'no encounter to delete at id'})
		}
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(response)
	})
})

module.exports = router;