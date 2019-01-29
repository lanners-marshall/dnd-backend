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
	const {encounter_name, k, v} = req.body
	const {id} = req.params;
	if (!req.body.encounter_name){
		return res.status(400).json({msg: 'please provide encounter name'})
	}

	let keys = '{"' + req.body.k.join('","') + '"}'
	let values = '{"' + req.body.v.join('","') + '"}'

	let encounter = {encounter_name, session_id: id, keys, values, }

	db.insert(encounter).into('encounters')
		.then(response => {
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

		let keys_ar = response[0].keys
		let values_ar = response[0].values
		let str, num, counter
		let boolv = false
		let boolv2 = false

		let obj_ar = [];
		let obj = {};

		for (let n = 0; n < values_ar.length; n++){
		  k = keys_ar[n]
		  v = values_ar[n]
		  if (k === 'name' && n !== 0){
		    obj_ar.push(obj)
		    obj = {}
		  }
		  obj[k]= v
		  if (values_ar.length - 1 == n){
		    obj_ar.push(obj)
		    break
		  }
		}
		return res.status(200).json(obj_ar);
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