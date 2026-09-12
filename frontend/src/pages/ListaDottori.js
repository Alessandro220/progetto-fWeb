import {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ListaDottori = ()=>{
    const [dottori,setDottori] = useState([]);
    useEffect(() => {
     axios.get(`http://${process.env.REACT_APP_API_URL}/api/dottori`)
     .then(risposta => {
        setDottori(risposta.data);
     });
    }, [])
    return(
     
      <Box>
      
        {dottori.map(dottore => (
       <Link key={dottore._id} to={`/dottori/${dottore._id}`}> 
        <Card>
          <CardContent>
          <Typography>{dottore.utente.nome} {dottore.utente.cognome}</Typography>
          <Typography>{dottore.specializzazione}</Typography>
          </CardContent>
        </Card>
       </Link>
        ))}
      </Box>
      
    );
}
export default ListaDottori;


