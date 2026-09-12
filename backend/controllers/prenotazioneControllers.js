const Prenotazione = require('../models/Prenotazione');
const Slot = require('../models/Slot');
const Dottore = require('../models/Dottore');

const creaPrenotazione = async(req,res)=>{
    try{
     if(req.utente.ruolo !== 'paziente'){
        return res.status(403).json({messaggio: "Solo i pazienti posso prenotarsi"});
     }else{
        const slotId = req.body.slotId;
        const slotRice = await Slot.findById(slotId);
        if(!slotRice){
          return res.status(404).json({messaggio: "Slot non disponibile"});
        }else if( !slotRice.disponibile ){
          return res.status(400).json({ messaggio: "Slot non più disponibile" });
        }
        await Prenotazione.create({
            paziente: req.utente.id,
            slot: slotId
        });
        slotRice.disponibile = false;
        await slotRice.save();
        //prendo l'istanza disponibile grazie al middleware e specifico in quale parte voglio mandare il messaggio tramite l'id del dottore convertito in stringa emettendo un evento
        req.io.to(slotRice.dottore.toString()).emit('slotAggiornato',slotRice);
        res.status(201).json({ messaggio: "Prenotazione avvenuta con successo!!" });
     }
    }catch(error){
      res.status(500).json({ messaggio: "Errore nella creazione della prenotazione!" });
    }
}

const cancellaPrenotazione = async(req,res)=>{
  try{
   const idCancella = req.params.id;
   const ricePrenota = await Prenotazione.findById(idCancella);
   if(!ricePrenota){
    return res.status(404).json({messaggio : "Errore, non esiste questa prenotazione"});
   }//ricePrenota.paziente di base è un Objectid
   if(ricePrenota.paziente.toString() !== req.utente.id){
       return res.status(403).json({ messaggio: "Non puoi cancellare questa prenotazione" });
   }
   await Prenotazione.findByIdAndDelete(idCancella);
   const slotLibera = await Slot.findById(ricePrenota.slot);
   slotLibera.disponibile = true;
   await slotLibera.save();
   req.io.to(slotLibera.dottore.toString()).emit('slotAggiornato',slotLibera);
   res.json({ messaggio: "Prenotazione cancellata con successo" });
  }catch(error){
   res.status(500).json({ messaggio: "Errore nella cancellazione della prenotazione" });
  }
}

const getPrenotazione = async (req,res) => {
 try{
  if(req.utente.ruolo === 'dottore'){
    const dottore = await Dottore.findOne({utente:req.utente.id });
    const slot = await Slot.find({dottore:dottore._id });
    const idSlot = slot.map(slot => slot._id);
    const prenotazioni = await Prenotazione.find({slot : {$in: idSlot}}).populate('slot'); //$in indica che uno dei campi dell'array deve corrispondere  
    res.json(prenotazioni);

  }else{
   const prenotazioni = await Prenotazione.find({paziente: req.utente.id}).populate('slot');
    res.json(prenotazioni);
  }
 }catch(errore){
    res.status(500).json({ messaggio: "Errore nessuna prenotazione" });

 }  
}
module.exports = { creaPrenotazione, cancellaPrenotazione, getPrenotazione};