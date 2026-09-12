const express = require('express');
const {creaPrenotazione,cancellaPrenotazione,getPrenotazione} = require('../controllers/prenotazioneControllers');
const {verificaToken} = require('../middleware/autenMiddleware');

const router = express.Router();

router.post('/',verificaToken,creaPrenotazione);
router.get('/',verificaToken,getPrenotazione);
router.delete('/:id',verificaToken,cancellaPrenotazione);

module.exports = router;