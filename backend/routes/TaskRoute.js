const {Router} = require('express')
const { getTasks, saveTask, deleteTask, updateTask } = require('../controllers/TaskController')

const router = Router()

router.get('/', getTasks)
router.post('/save', saveTask)
router.post('/update', updateTask)
router.post('/delete', deleteTask)

module.exports = router