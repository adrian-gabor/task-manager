import { useState } from "react";
import { Button, TextField, Paper, Typography, Box, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Wprowadź prawidłowy adres e-mail.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    setEmailError("");

    if (!validateEmail(username)) {
      return;
    }

    try {
      await dispatch(loginUser({ email: username, password })).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    validateEmail(e.target.value);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" >
      <Paper elevation={3} sx={{ padding: 4, minWidth: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Logowanie
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
            required
            error={!!emailError}
            helperText={emailError}
            disabled={loading}
          />
          <TextField
            label="Hasło"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Zaloguj się'}
          </Button>
        </form>
        <Button 
          onClick={handleRegister} 
          variant="outlined" 
          color="primary" 
          fullWidth 
          sx={{ mt: 1 }}
          disabled={loading}
        >
          Zarejestruj się
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;