import { useState } from "react";
import { Button, TextField, Paper, Typography, Box } from "@mui/material";
import { loginUser } from "../api/loginUser"; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(username, password);
      onLogin();
    } catch (err) {
      setError(err || 'Wystąpił błąd podczas logowania.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, minWidth: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Logowanie
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Hasło"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </Paper>
    </Box>
  );
};

export default Login;
