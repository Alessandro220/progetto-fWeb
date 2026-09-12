const utente = require ('../models/Utente');
const dottore = require('../models/Dottore');
const bcry = require('bcrypt'); //hash password
const jsonToken = require('jsonwebtoken');

const registrazione = async(req,resp) => {
    try{
     const richiesta = req.body;
     if(await utente.findOne({email:richiesta.email})){
      resp.status(400).json({messaggio :  "Utente già registrato"});  
     }else{
        const passHash = await bcry.hash(richiesta.password,10); 
        const nuovoUtente = await utente.create({
              nome: richiesta.nome,
              cognome: richiesta.cognome,
              email: richiesta.email,
              numero: richiesta.numero,
              password: passHash,
              ruolo: richiesta.ruolo});
       if(richiesta.ruolo === 'dottore'){
        const nuovoDottore = await dottore.create({
           utente: nuovoUtente,
           specializzazione: richiesta.specializzazione
        });
       }
       resp.status(201).json({ messaggio: "Registrazione avvenuta con successo!!" });
     }
     
    }catch(errore){
      console.log(errore);
      resp.status(500).json({messaggio: "Errore nella registrazione"});
    }
}

const login = async (req,res)=>{
   const richiesta1 = req.body;
   const email = richiesta1.email;
   const password = richiesta1.password;
   try{
    const ute = await utente.findOne({email});
    if((ute)){
     if(await bcry.compare(password,ute.password)){
      
      const token = jsonToken.sign(
      { id: ute._id, ruolo: ute.ruolo },  //payload del token
        process.env.JWT_SECRET,   //chiave segreta
      { expiresIn: '15m' } //scadenza token
      );

      const refreshToken = jsonToken.sign(
        {id: ute._id, ruolo: ute.ruolo}, 
        process.env.JWT_SECRET, {expiresIn: '7d'}
      );
      res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 7*24*60*60*1000,
        secure:process.env.NODE_ENV === 'production', // ------> test
        sameSite: 'strict'
      });
      res.json({token: token, 
        infoUtente :{ 
         nome: ute.nome,
         cognome: ute.cognome, 
         email: ute.email, 
         ruolo: ute.ruolo
        }
      });
    }else{
          res.status(401).json({messaggio: "Errore, password errata"});

    }
    }else{
          res.status(401).json({messaggio: "Errore, email errata"});

    }
   }catch(error){
          res.status(500).json({messaggio: "Errore in fase di loggin"});

   }

}
const refresh = async(req,res)=>{
  try{
   const cookieToken = req.cookies.refreshToken;
   if(!cookieToken){
   return res.status(401).json({messaggio:"Errore, nessuna autorizzazione"});
   }
   const decodifica = jsonToken.verify(cookieToken, process.env.JWT_SECRET);
   const tokenNuovo = jsonToken.sign(
      { id: decodifica.id, ruolo: decodifica.ruolo },  //payload del token
        process.env.JWT_SECRET,   //chiave segreta
      { expiresIn: '7d' } //scadenza token
      );
      res.json({token: tokenNuovo});
  }catch(error){
   res.status(401).json({ messaggio: "Refresh token non valido o scaduto" });
  }
}
module.exports = {registrazione,login,refresh};