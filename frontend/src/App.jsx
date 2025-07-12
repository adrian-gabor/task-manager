import AppHeader from "./components/AppHeader";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          loggedIn ? (
            <>
              <AppHeader />
              <TaskList />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;