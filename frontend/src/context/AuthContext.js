import {createContext ,useState,useEffect} from 'react';
import axios from 'axios';
export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
 const [utente,setUtente] = useState(null); //nessun log inizialmente 
 const [token,setToken] = useState(null);
 //login
 const login = (infoUten,infoToken) =>{
    setUtente(infoUten);
    setToken(infoToken);
 };
 //logout
 const logout = () =>{
    setUtente(null);
    setToken(null);
 };
  /**Gestione refresh token tramite una funzione gestita da axios 
  * riusciamo a intercettare le richieste fallite per via di acces 
  * token scaduti e generare, tramite il refresh token se non scaduto
  * anche esso, un nuovo token.
  * 
  */

 const refreshAccessToken = async () => {
   //Aggiunta di withCredentials poichè backend e frontend sono interfacciati su porte differenti
   //Il browser normalmente non include coocki se non vado a specificare
   const risposta = await axios.post(`http://${process.env.REACT_APP_API_URL}/api/aute/refresh`,{},{withCredentials: true});
   setToken(risposta.data.token);
   return risposta.data.token;
 }

    useEffect(()=>{
      axios.interceptors.response.use(
       (risposta)=>risposta,
       async (errore)=>{if(errore.response.status === 401){
                   try{
                      await refreshAccessToken();
                      return axios(errore.config); //rieseguo la richiesta fallita
                   }catch(error){
                     logout();
                   }
                  }
          return Promise.reject(errore); //se c'è un altro tipo di errore          
       }
      );
   },[])

 return(
    <AuthContext.Provider value={{utente,token,login,logout}}>
     {children}
    </AuthContext.Provider> 
 );

};