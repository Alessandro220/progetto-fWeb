const mongoose = require('mongoose');

const dottoreSchema = mongoose.Schema({
    utente:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Utente',
     required: true
    },
   specializzazione:{
    type: String,
    required: true
   } 
});

module.exports = mongoose.model('Dottore',dottoreSchema);