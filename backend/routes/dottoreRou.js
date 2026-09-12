const express = require('express');
const {getDottori} = require('../controllers/dottoreCon.js');

const router = express.Router();

router.get('/',getDottori);

module.exports = router;
