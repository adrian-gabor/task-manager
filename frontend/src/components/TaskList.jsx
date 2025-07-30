import { 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    IconButton,
    Chip,
    LinearProgress,
    Alert,
    Stack
} from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchTask } from '../api/fetchTask';
import AddTaskForm from './AddTaskForm';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { deleteTask } from '../api/deleteTask';
import { toggleTask } from '../api/toggleTask';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const task = await fetchTask();
                setTasks(task);
            } catch (err) {
                setError('Nie udało się pobrać zadań');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks(prev => [...prev, newTask]);
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
        } catch (err) {
            console.error('Nie udało się usunąć zadania');
        }
    };

    const handleToggleDone = async (taskId) => {
        try {
            const updatedTask = await toggleTask(taskId);
            setTasks(prev => prev.map(task => 
                task.id === taskId ? updatedTask : task
            ));
        } catch (err) {
            console.error('Nie udało się zaktualizować zadania');
        }
    };

    const completedTasks = tasks.filter(task => task.done).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Stack spacing={3}>
                <AddTaskForm onTaskAdded={handleTaskAdded} />
                
                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}

                {totalTasks > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Postęp: {completedTasks}/{totalTasks} zadań
                            </Typography>
                            <Chip 
                                label={`${Math.round(progress)}%`} 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                            />
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={progress} 
                            sx={{ height: 8, borderRadius: 4 }}
                        />
                    </Box>
                )}

                {tasks.length === 0 ? (
                    <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="body1" color="text.secondary">
                                Brak zadań. Dodaj pierwsze zadanie!
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <Stack spacing={2}>
                        {tasks.map((task) => (
                            <Card 
                                key={task.id} 
                                variant="outlined" 
                                sx={{ 
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        boxShadow: 2,
                                        transform: 'translateY(-1px)'
                                    },
                                    opacity: task.done ? 0.7 : 1
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        <IconButton
                                            onClick={() => handleToggleDone(task.id)}
                                            color={task.done ? "success" : "default"}
                                            size="small"
                                            sx={{ mt: 0.5 }}
                                        >
                                            {task.done ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                                        </IconButton>
                                        
                                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    textDecoration: task.done ? 'line-through' : 'none',
                                                    color: task.done ? 'text.secondary' : 'text.primary',
                                                    wordBreak: 'break-word'
                                                }}
                                            >
                                                {task.text}
                                            </Typography>
                                            <Typography 
                                                variant="caption" 
                                                color="text.secondary"
                                                sx={{ display: 'block', mt: 0.5 }}
                                            >
                                                {task.done ? 'Zakończone' : 'W trakcie'}
                                            </Typography>
                                        </Box>
                                        
                                        <IconButton 
                                            onClick={() => handleDelete(task.id)} 
                                            aria-label="Usuń zadanie"
                                            color="error"
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Box>
    );
};

export default TaskList;