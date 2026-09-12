import { useState,useContext,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const MiePrenotazioni = () =>{
    const [statPreno,setStatoPreno] = useState([]);
    const {token} = useContext(AuthContext);
    useEffect(()=>{
      axios.get(`http://${process.env.REACT_APP_API_URL}/api/prenotazioni`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
       )
      .then(risposta => {
        setStatoPreno(risposta.data);
     });
    },[]);
    const cancellaPrenotazione = async (prenotazioneId) => {
     await axios.delete(`http://${process.env.REACT_APP_API_URL}/api/prenotazioni/${prenotazioneId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
     })
     setStatoPreno(statPreno.filter(p => p._id !== prenotazioneId))

    }
    return(
        <Box>
         {statPreno.map(prenotazione =>(
          <Card sx={{marginBottom: 2}} key={prenotazione._id}> 
           <CardContent>
             <Typography>{prenotazione.slot.dataOra}</Typography>
             <Button onClick={() => cancellaPrenotazione(prenotazione._id)}>Cancella Prenotazione</Button>
           </CardContent>
          </Card>
         ))}
        </Box>
    );
}

export default MiePrenotazioni;