const express = require('express')
const router = express.Router()

const db = require('../data/helpers/actionModel')

//CREATE of CRUD ops
router.post('/', (req, res) => {
    const newAction = req.body;
    const {project_id, description, notes} = newAction
    project_id && description && notes ?
    db.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving the project to the database'})
        })
    : res
    .status(400)
    .json({ error: 'Request must provide a project id, description and notes field'})
})

//READ of CRUD ops
router.get('/', (req, res) => {
    db
    .get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500)
        .json({ error: `The post information could not be found: error ${err}`})
    })
})

module.exports = router