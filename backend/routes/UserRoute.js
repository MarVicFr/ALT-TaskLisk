const {Router} = require('express')
// const { getTasks, saveTask, deleteTask, updateTask } = require('../controllers/TaskController')
const { getUsers ,saveUser, deleteUser } = require('../controllers/UserController')

const router = Router()

router.get('/users', getUsers)
router.post('/register', saveUser)
// router.post('/updateUser', updateUser)
router.post('/deleteUser', deleteUser)

module.exports = router