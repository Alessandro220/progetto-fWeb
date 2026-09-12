import { useState,useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { MenuItem, Select, TextField,Button, Box  } from "@mui/material";


const Registrazione = () => {
 const [form,setForm] = useState({nome:'',cognome:'',email:'',numero:'',password:'',ruolo:'paziente',specializzazione:''});
 const navigate= useNavigate();

 const eseguiRegistrazione = async(evento) =>{
  try{   
   evento.preventDefault();
   const risp = await axios.post(`http://${process.env.REACT_APP_API_URL}/api/aute/registrazione`,{
    nome: form.nome,
    cognome: form.cognome,
    email: form.email,
    numero: form.numero,
    password: form.password,
    specializzazione: form.specializzazione,
    ruolo: form.ruolo
   });
   navigate('/login')
  }catch(error){
    console.log(error);
  }
 }
 return(
  <Box className="formLogin" component="form" onSubmit={eseguiRegistrazione}>
    <TextField label="Nome" required value={form.nome} onChange={(eve) => {setForm({...form, nome: eve.target.value})}}></TextField>
    <TextField label="Cognome" required value={form.cognome} onChange={(eve) => {setForm({...form,cognome: eve.target.value})}}></TextField>
    <TextField label="Email" required value={form.email} onChange={(eve) => {setForm({...form,email: eve.target.value})}}></TextField>
    <TextField label="Numero" required value={form.numero} onChange={(eve) => {setForm({...form,numero: eve.target.value})}}></TextField>
    <TextField label="Password" required value={form.password} onChange={(eve) => {setForm({...form,password: eve.target.value})}}></TextField>
    <Select value={form.ruolo} onChange={(eve) => setForm({...form, ruolo: eve.target.value})}>
        <MenuItem value="paziente"> Utente</MenuItem>
        <MenuItem value="dottore"> Dottore</MenuItem>
    </Select>
    {form.ruolo === 'dottore' && (
      <TextField label="Specializzazione" value={form.specializzazione} onChange={(eve) => setForm({...form, specializzazione: eve.target.value})} />
     )}
     <Button type="submit" variant="contained">Registrazione</Button>
  </Box>
 );
}

export default Registrazione;