import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import AppHeader from "./AppHeader";
import TaskList from "./TaskList";
import Login from "./Login";
import Register from "./Register";
import { checkAuthStatus } from '../store/authSlice';

const AppContent = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isInitialized, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (!isInitialized || loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <>
              <AppHeader /> 
              <TaskList />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppContent; 