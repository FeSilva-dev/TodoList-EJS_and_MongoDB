const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('pages/index')
})

router.get('/checklists/deleted', async (req, res) => {
    res.render('checklists/deleted')
})

module.exports = router