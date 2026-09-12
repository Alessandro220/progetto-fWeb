import { useState,useContext,useEffect } from "react";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';



const InfoDottore = () =>{
 const {id} = useParams();
 const {token} = useContext(AuthContext);
 const [slotDottore,setSlotDottore] = useState([]);   
 useEffect(()=> {
  axios.get(`http://${process.env.REACT_APP_API_URL}/api/slot/${id}`)
  .then(risp =>{
    setSlotDottore(risp.data);
  });
 },[id]);
 const prenotaSlot = async(slotId)=>{
  try{
  await axios.post(`http://${process.env.REACT_APP_API_URL}/api/prenotazioni`,{slotId: slotId},
    {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
  }catch(error){

  }
 }
 useEffect(()=>{
  const socket = io(`http://${process.env.REACT_APP_API_URL}`);
  socket.emit('entraStanza',id);
  socket.on('slotAggiornato',(slotAggiornato)=>{
    console.log('Evento slotAggiornato ricevuto:', slotAggiornato);
    setSlotDottore(slotAttua =>
      slotAttua.map(slot => slot._id === slotAggiornato._id ? slotAggiornato : slot)
    );
  })
  return () => {
    socket.disconnect();
  };
 },[id])

 return(
    <Box>
      {slotDottore.filter(slot=> slot.disponibile) 
       .map( slot => (
      <Card key={slot._id}>
        <CardContent>
         <Typography>{new Date(slot.dataOra).toLocaleString()}</Typography>
        <Button onClick={ () => prenotaSlot(slot._id)}>Prenota</Button>
       </CardContent>
      </Card>
      ))} 
    </Box>
 );
}
export default InfoDottore;

