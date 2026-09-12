import { useEffect, useState } from "react";

const Component = ()=>{
  const [stringa,setStringa]= useState('');
  const [elementi,setElementi]=useState([]);
  useEffect(()=>{
    axios.get(`url/${stringa}`).then(risposta=>{
        setElementi(risposta.data)
    })
  },[stringa])
  return(
    <div>
         <input type="text" value = {stringa} onChange={(evento=>{setStringa(evento.target.value)})}></input>
   {elementi.map(elemento =>(
      <div key={elemento._id}>
       <p>{elemento.nome}</p>
      </div>
   ))} 
    </div>
  );
}

const Controller = async(req,res)=>{
 try{
    const prodotti = await Modello.find({prezzo: 50})
    res.status(200).json(prodotti)
 }catch(errore){
    res.status.json({messaggio: 'Errore durante la ricerca'});
 }   
 
}


const router = express.Router();

router.get('/search', (req,res)=>{
    const q = req.query.q;
    res.json({risultato_per: q}); 
})

router.get(`/url/:id`, async(req,res)=>{
    const id = req.params.id;
    const utente = await Utente.findById(id);
    if(!utente){
        res.status(404).json({messaggio: "Errore, utente non trovato"});
    }else{
       res.status(500).json({messaggio: "Errore del server"});
  } 
    }
)

router.get('/', (req,res)=>{
  const arr = [{nome:'nome', attivo:true},{nome:'aldo', attivo:false}];
  const nuoArr = arr.filter(elemento => elemento.attivo === true);
  res.json(nuoArr)
})

const Componente = ({users})=>{
 return(
  <div>
    {users.length ? <p>Non è vuoto</p> : <p>è vuoto</p>}
  </div>
 );
}

function aggiArray (arr, nuoPrezzo, idCer){
  const arrAggio = arr.map(prodotto => {
    if(prodotto.id === idCer){
      return{...prodotto,prezzo:nuoPrezzo}
    }else{
      return prodotto;
    }
  });

}

const Componente = ()=>{
  const [data,setData]=useState('');
  useEffect(()=>{
     fetch('/api/data').then(risposta => risposta.json()).then(risposta => (setData(risposta)))
  },[])

  return(
    <div>

    </div>
  );
}