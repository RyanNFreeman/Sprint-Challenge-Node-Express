const express = require('express')
const router = express.Router()

const db = require('../data/helpers/projectModel')

//CREATE of CRUD ops
router.post('/', (req, res) => {
    const newProject = req.body;
    const {name, description} = newProject
    name && description ?
    db.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving the project to the database'})
        })
    : res
    .status(400)
    .json({ error: 'Please provide a name and a description for project'})
})

//READ of CRUD ops
router.get('/', (req, res) => {
    db
    .get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500)
        .json({ error: `The post information could not be found: error ${err}`})
    })
})

//UPDATE of CRUD ops

router.put('/:id', (req, res) => {
    const id = req.params.id
    db
    .findById(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(404)
        .json({ error: `The project with the specified ID does not exist: error ${err}`})
    })
})

module.exports = router