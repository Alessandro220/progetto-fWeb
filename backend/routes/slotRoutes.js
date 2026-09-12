const express = require('express');
const {creaSlot,slotDisponibili} = require('../controllers/slotControllers');
const {verificaToken} = require('../middleware/autenMiddleware');

const router = express.Router();
router.post('/',verificaToken,creaSlot);
router.get('/:dottoreId',slotDisponibili);
module.exports = router;