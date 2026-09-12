import './App.css';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import ListaDottori from './pages/ListaDottori';
import Registrazione from './pages/Registrazione';
import InfoDottore from './pages/InfoDottore';
import Navbar from './components/Navbar';
import MiePrenotazioni from './pages/MiePrenotazioni';
import CreaSlot from './pages/CreaSlot';
import Protezione from './components/Protezione';

function App() {
  return (
   <AuthProvider>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<ListaDottori/>}/>
      <Route path='/registrazione' element={<Registrazione/>}/>
      <Route path='/dottori/:id' element={<InfoDottore/>}/>

      <Route path='/prenotazioni' element={
       <Protezione>
         <MiePrenotazioni/>
       </Protezione>
      }/>

     <Route path='/creaSlot' element={
      <Protezione>
        <CreaSlot/>
      </Protezione>
     }/>
      
    </Routes>
   </BrowserRouter>
   </AuthProvider>
  );
}

export default App;
