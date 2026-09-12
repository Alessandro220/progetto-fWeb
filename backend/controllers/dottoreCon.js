const dottore = require('../models/Dottore.js');

const getDottori = async(req,res) => {
   try{
    const collezDottor = await dottore.find().populate('utente');
    res.json(collezDottor);
   }catch(error){
    res.status(500).json({messaggio: "Errore nel recupero"});
   };
};

module.exports = {getDottori};

