const express = require('express');
const router = express.Router();
// @ts-ignore
const { check, validationResult } = require('express-validator/check');

const UserController = require('../controllers/User.controller');
const security = require('../middleware/security');

const verificationOfPassword = () => {
    return [
        check('password').isLength({min : 8}).withMessage('Mot de passe trop petit')
    ];
}

const isValid = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    res.status(422).json({ errors: result.array() });
}

router.get('/', UserController.getAllUsers);
router.post('/', verificationOfPassword(), isValid, UserController.createNewUser);
router.get('/:id',  UserController.findUserById);
router.patch('/:id', verificationOfPassword(), isValid, UserController.updateAnUser);
router.delete('/',  UserController.deleteAll);
router.delete('/:id',  UserController.deleteAnUser);
router.post('/auth', UserController.auth);

module.exports = router;