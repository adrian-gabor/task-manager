import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
 
const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Moja Lista Zadań
        </Typography>
        {user && (
          <Typography variant="body2" sx={{ mr: 2 }}>
            Witaj, {user.firstname}!
          </Typography>
        )}
        <Button color="inherit" onClick={handleLogout}>Wyloguj</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
