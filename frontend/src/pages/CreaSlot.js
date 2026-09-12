import { useState,useContext,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useParams } from "react-router-dom";
import { MenuItem, Select, TextField,Button, Box ,Snackbar } from "@mui/material";


const CreaSlot = () =>{
 const [dataOra,setDataOra] = useState('');
 const {token} = useContext(AuthContext);
 const [messaggioAperto, setMessaggioAperto] = useState(false)
 const invio = async(evento)=>{
 try{
  evento.preventDefault();
  await axios.post(`http://${process.env.REACT_APP_API_URL}/api/slot`,{dataOra:dataOra},{
     headers:{
         Authorization: `Bearer ${token}`
     }
  })
  setMessaggioAperto(true);
 }catch(errore){
     console.log(errore);
  }
 }
  return(
    <Box className="formLogin" component="form" onSubmit={invio}>
        <TextField  type="datetime-local" value={dataOra} onChange={evento => setDataOra(evento.target.value)}></TextField>
        <Button  type="submit">Invio</Button>
        <Snackbar open={messaggioAperto} autoHideDuration={4000} onClose={()=> setMessaggioAperto(false)} message="Slot creato!!"></Snackbar>
    </Box>
 );

} 
export default CreaSlot;