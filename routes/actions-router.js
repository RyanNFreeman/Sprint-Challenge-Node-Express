const express = require('express')
const router = express.Router()

const db = require('../data/helpers/actionModel')

//CREATE of CRUD ops
router.post('/', (req, res) => {
    const newAction = req.body;
    const {project_id, description, notes, completed} = newAction
    project_id && description && notes && completed ?
    db.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving the project to the database'})
        })
    : res
    .status(400)
    .json({ error: 'Request must provide a project id, description, notes field, as well as if it\'s been completed' })
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

router.get("/:id", (req, res) => {
    const {id} = req.params;
    db
        .get(id)
        .then(action => {
            if(action){
                res.json(action);
            }
            else {
                res.status(404).json({message: "action does not exist"})
            }
        })
        .catch (err => {
            res.status(500).json({message: "action could not be retrieved"})
        })
})

//UPDATE of CRUD ops
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed} = req.body;
    try{if (project_id || description || notes || completed) {
        db
        .update(id, {project_id, description, notes})
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({error: 'action cannot be found'})
        })
    }}catch(error){
        res.status(400).json({err: 'you must include a project id, description or notes to be updated'})
    }
})

//DELETE of CRUD ops
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    db
        .remove(id)
        .then(action => {
            if(action){
                res.json({message: "success"});
            }
            else {
                res.status(404).json({message: "action id does not exist"})
            }
        })
        .catch (err => {
            res.status(500).json({message: "action could not be located"})
        })
})

module.exports = router