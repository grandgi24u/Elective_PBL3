const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User.controller');
const security = require('../middleware/security');

router.get('/', security.checkJWT, UserController.getAllUsers);
router.post('/',  UserController.createNewUser);
router.get('/:id',  UserController.findUserById);
router.patch('/:id',  UserController.updateAnUser);
router.delete('/:id',  UserController.deleteAnUser);
router.post('/auth', UserController.auth);

module.exports = router;