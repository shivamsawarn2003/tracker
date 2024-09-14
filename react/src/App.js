import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Ensure this path is correct
import Home from './pages/Home';   // Ensure this path is correct
import Signup from './pages/Signup';
import { AuthProvider } from './AuthContext'; // Ensure this path is correct
import { ThemeProvider } from './ThemeContext';
import AuthContext from './AuthContext'; 
import { useContext } from 'react';
import './App.css';

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  return authToken ? children : <Navigate to="/login" />;
};



function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
         
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
