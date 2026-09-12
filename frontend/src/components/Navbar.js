import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

const Navbar = () =>{
    const {utente,logout} = useContext(AuthContext);
    return(
       <AppBar position="static">
  {utente ? (
    <Toolbar>
      <Button component={Link} to={'/'} color="inherit">Home</Button>
      <Button component={Link} to={'/prenotazioni'} color="inherit">Prenotazioni</Button>
      {utente.ruolo === 'dottore' && (
        <Button component={Link} color="inherit" to={'/creaSlot'}>Crea Slot</Button>
      )}
      <Button color="inherit" onClick={logout}>Logout</Button>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>MyDoc</Typography>
    </Toolbar>
  ) : (
    <Toolbar>
      <Button component={Link} color="inherit" to={'/login'}>Login</Button>
      <Button component={Link} color="inherit" to={'/registrazione'}>Registrazione</Button>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>MyDoc</Typography>
    </Toolbar>
  )}
</AppBar>
    );
}
export default Navbar;