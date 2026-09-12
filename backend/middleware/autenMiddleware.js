const jsonToken = require('jsonwebtoken');

const verificaToken = (req,res,next) =>{
 const autHeader = req.headers.authorization;
 if(!autHeader){ //se è vero (!false) allora esegue la riga successiva che esce dal ciclo inviando un messaggio
  return res.status(401).json({messaggio: "Token mancante"});
 }
 const tokenSplit = autHeader.split(' ');
 const token = tokenSplit[1];
 try{
  const decodifi = jsonToken.verify(token, process.env.JWT_SECRET);
  req.utente = decodifi; //creo una proprietà inserendo il payload
  next();
 }catch(error){
    return res.status(401).json({messaggio: "Errore decodifica Token"});

 }
};

module.exports = {verificaToken};