import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const AppHeader = () => {
  

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Moja Lista Zadań
        </Typography>
        <Button  color="inherit">Dodaj Zadanie</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
