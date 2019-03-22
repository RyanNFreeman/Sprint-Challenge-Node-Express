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
            res.status(500).json({message: "action could not be located"})
        })
})

//UPDATE of CRUD ops

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {name, description, completed } = req.body;
    if (name, description, completed){
        projects
        .update(id, {name, description, completed})
        .then(project => {
            if (project) {
                projects.getProjectActions(id)
                .then(project => {
                    res.json(project);
                });
            }
            else {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage : 'project could not be retrieved'});
        });
}});

//DELETE of CRUD ops

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    db
        .remove(id)
        .then(project => {
            if(project){
                res.json({message: "success"});
            }
            else {
                res.status(404).json({message: "project could not be found"})
            }
        })
        .catch (err => {
            res.status(500).json({message: "project could not be located"})
        })
})

module.exports = router