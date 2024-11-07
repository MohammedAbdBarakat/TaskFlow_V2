const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const { addRoutine ,getRoutine, getRoutines } = require('../controllers/routineController')

//require auth for all task routes
router.use(requireAuth)

router.post('/',addRoutine)
router.get('/', getRoutines)
router.get('/:id', getRoutine)


module.exports = router

