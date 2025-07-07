import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { fetchTask } from '../api/fetchTask';
import AddTaskForm from './AddTaskForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask } from '../api/deleteTask';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const task = await fetchTask();
            setTasks(task);
        };
        fetchData();
    }, []);


    const handleTaskAdded = (newTask) => {
        setTasks(prev => [...prev, newTask]);
    };

    const handleDelete = async (taskId) => {
        await deleteTask(taskId);
        setTasks(prev => prev.filter(task => task.id !== taskId))
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: '#f5f5f5' }}>
            <Card variant="outlined">
                <CardContent>
                    <AddTaskForm onTaskAdded={handleTaskAdded} />
                </CardContent>
            </Card>
            {tasks.map((task) => (
                <Card key={task.id} variant="outlined">
                    <CardContent>
                        <Typography variant="h6">{task.text}</Typography>
                        <Typography color="text.secondary">
                            {task.done ? 'Zrobione' : 'Do zrobienia'}
                        </Typography>
                        <IconButton onClick={() => handleDelete(task.id)} aria-label="Usuń">
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default TaskList;