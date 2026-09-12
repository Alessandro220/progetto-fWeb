const mongoose = require('mongoose');

const prenotazioneSchema = mongoose.Schema({
    paziente:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Utente', 
     required: true
    },
   slot:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
   } 
});

module.exports = mongoose.model('Prenotazione',prenotazioneSchema);