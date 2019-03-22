const express = require('express')
const router = express.Router()

const db = require('../data/helpers/projectModel')

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
    res.status(200)
})

module.exports = router