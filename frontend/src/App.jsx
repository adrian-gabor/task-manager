import AppHeader from "./components/AppHeader";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { loggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
      <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;