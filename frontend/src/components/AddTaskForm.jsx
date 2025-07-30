import { useState } from "react";
import { addTask } from "../api/addTask";
import { 
    TextField, 
    Button, 
    Box, 
    Paper,
    Typography,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTaskForm = ({ onTaskAdded }) => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            setError("Wprowadź treść zadania");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const newTask = await addTask(text);
            onTaskAdded(newTask);
            setText('');
        } catch (err) {
            setError('Nie udało się dodać zadania');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Dodaj nowe zadanie
            </Typography>
            
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Wprowadź treść zadania..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={loading}
                    sx={{ flexGrow: 1 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || !text.trim()}
                    startIcon={<AddIcon />}
                    sx={{ 
                        minWidth: '120px',
                        height: '56px'
                    }}
                >
                    {loading ? 'Dodawanie...' : 'Dodaj'}
                </Button>
            </Box>
        </Paper>
    );
};

export default AddTaskForm;
