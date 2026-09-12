import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

const Protezione = ({children}) =>{
  const {utente} = useContext(AuthContext);  
 return(
    utente ? children : <Navigate to="/login" /> 
 );
}

export default Protezione;