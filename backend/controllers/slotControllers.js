const Slot = require('../models/Slot');
const Dottore = require('../models/Dottore');

const creaSlot = async(req,res) => {
 try{
 if (req.utente.ruolo !== 'dottore'){
   return res.status(403).json({messaggio: "Solo i dottori possono creare slot"});
 }else{
    const dottoreRicerca = await Dottore.findOne({utente: req.utente.id});
    if (!dottoreRicerca) {
     return res.status(404).json({ messaggio: "Profilo dottore non trovato" });
    }else{
        await Slot.create({
         dottore: dottoreRicerca._id,
         dataOra: req.body.dataOra,
         //disponibile viene omesso in quanto di default è true
        });
     return res.status(201).json({ messaggio: "Creazione slot avvenuta con successo!!" });

    }
 }
 }catch(error){
   res.status(500).json({ messaggio: "Errore nella creazione dello slot" });
  }
};

const slotDisponibili = async (req,res) =>{
  try{
   const idDottore = req.params.dottoreId; //recupero l'id dall'URL
   const slot = await Slot.find({dottore: idDottore, disponibile : true});
   res.json(slot);

  }catch(error){
      res.status(500).json({ messaggio: "Errore nella visualizzazione slot" });
  }
}

module.exports = {creaSlot,slotDisponibili};