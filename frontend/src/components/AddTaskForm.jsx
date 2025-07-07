import { useState } from "react";
import { addTask } from "../api/addTask";


const AddTaskForm = ({ onTaskAdded }) => {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;


        try {
            const newTask = await addTask(text);
            onTaskAdded(newTask);
            setText('');
        } catch (err) {
            console.error('Nie udało się dodać zadania');
        }


    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Dodaj nowe zadanie"
                style={{ flexGrow: 1 }}
            />
            <button type="submit">Dodaj</button>
        </form>
    );
};
export default AddTaskForm;
