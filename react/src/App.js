import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Ensure this path is correct
import Home from './pages/Home';   // Ensure this path is correct
import Signup from './pages/Signup';
import { AuthProvider } from './AuthContext'; // Ensure this path is correct
import AuthContext from './AuthContext'; 
import { useContext } from 'react';

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  return authToken ? children : <Navigate to="/login" />;
};

// IframeComponent to display the external URL
const IframeComponent = () => {
  return (
    <iframe
      src="https://tracker-cl7o.vercel.app/"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="External App"
    />
  );
};

function App() {
  return (
    <AuthProvider>
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
          {/* Route to display the external URL */}
          <Route path="/external" element={<IframeComponent />} />
          {/* Redirect any other path to /login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
