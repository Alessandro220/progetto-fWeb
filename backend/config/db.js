const mongoose = require('mongoose');

const connessioneDB = async () => {
    try{
         await mongoose.connect(process.env.MONGO_URI);
   console.log("Monoogse connesso");
    } catch(error){
        console.log("Errore connessione");
    }
};

module.exports = connessioneDB;
