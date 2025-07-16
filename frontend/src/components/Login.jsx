import { useState } from "react";
import { Button, TextField, Paper, Typography, Box } from "@mui/material";
import { loginUser } from "../api/loginUser";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

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
    setError("");
    setEmailError("");


    if (!validateEmail(username)) {
      return;
    }

    try {
      await loginUser(username, password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas logowania.');
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
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Zaloguj się
          </Button>
        </form>
        <Button onClick={handleRegister} variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
          Zarejestruj się
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;