const express = require('express');
const {registrazione} = require('../controllers/autenControllers.js');
const {login,refresh} = require('../controllers/autenControllers.js');

const router = express.Router();
router.post('/registrazione',registrazione);
router.post('/login',login);
router.post('/refresh',refresh);

module.exports = router;