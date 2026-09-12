const mongoose = require('mongoose');

const utenteSchema = mongoose.Schema({
   nome: {
     type: String,
     required: true,
   },
   cognome: {
     type: String,
     required: true,
   },
   email: {
     type: String,
     required: true,
     unique: true
   },
   numero: {
     type: Number,
     required: true,
     unique: true
   },
    password: {
     type: String,
     required: true,
   },
    ruolo: {
     type: String,
     required: true,
     enum: ["paziente", "dottore"]
   }   
});

module.exports = mongoose.model('Utente', utenteSchema);
