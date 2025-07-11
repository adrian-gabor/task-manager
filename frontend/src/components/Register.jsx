import { Button, TextField, Paper, Typography, Box, Alert } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../api/registerUser";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setRegistrationSuccess(false);

        if (!username.trim() || !password.trim() || !firstname.trim() || !lastname.trim()) {
            setError("Wszystkie pola są wymagane.");
            return;
        }

        try {
          await registerUser(username, password , firstname, lastname);
          setRegistrationSuccess(true);
          setTimeout(() => {
            navigate('/login');
          }, 2000);

        } catch (err) {
          setError(err || 'Wystąpił błąd podczas rejestracji.');
        }
      };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" >
            <Paper elevation={3} sx={{ padding: 4, minWidth: 640 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Rejestracja
                </Typography>
                {registrationSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Rejestracja zakończona sukcesem! Zostaniesz przekierowany do strony logowania.
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Imie"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={firstname}
                        required
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <TextField
                        label="Nazwisko"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={lastname}
                        required
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <TextField
                        label="Login"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="outlined-required"
                        label="Hasło"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Zarejestruj
                    </Button>
                </form>
                 <Button onClick={handleLoginRedirect} variant="outlined" color="primary" fullWidth sx={{ mt: 1 }}>
                    Przejdź do logowania
                </Button>
            </Paper>
        </Box>
    );
};

export default Register;
