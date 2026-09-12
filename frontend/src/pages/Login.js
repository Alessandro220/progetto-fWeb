import {useState,useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'; //libreria separata 
import {useNavigate} from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPass] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate(); 
    const eseguiLogin= async (evento)=>{
        try{
         evento.preventDefault(); //elimino comportamento default del browser
         const risp = await axios.post(`${process.env.REACT_APP_API_URL}/api/aute/login`,{
           email: email,
           password: password
         });
         login(risp.data.infoUtente, risp.data.token);
         navigate('/');
        }catch(error){
          console.log('Errore login:', error);
        }
    }
    return(
     <Box className="formLogin" component="form" onSubmit={eseguiLogin}>
      <TextField label="Email" type="email" required value={email} onChange={(eve) => setEmail(eve.target.value)}></TextField>
      <TextField label="Password" type="password" required value={password} onChange={(eve) => setPass(eve.target.value)}></TextField>
      <Button type="submit" variant="contained">Login</Button> 
     </Box>
    );
} 

export default Login;