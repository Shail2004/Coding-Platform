import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './Components/Header'
import Login from './Components/Login';
import Signup from './Components/Signup';

import { useState } from 'react';
import CreateProblem from './Components/CreateProblem';

import Playground from './Components/Playground';
import ProblemTable from './Components/ProblemTable';
import CodingArena from './Components/CodingArena';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    // You could show a loading spinner here
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  const [problems, setProblems] = useState([]);
  
  const addProblem = (problem) => {
    setProblems([...problems, problem]);
  };

  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* Public Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            
            {/* Protected Routes */}
            <Route 
              path='/problems' 
              element={
                <ProtectedRoute>
                  <ProblemTable />
                </ProtectedRoute>
              }
            />
            <Route 
              path='/playground' 
              element={
                <ProtectedRoute>
                  <Playground />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/create-problem" 
              element={
                <ProtectedRoute>
                  <CreateProblem addProblem={addProblem} />
                </ProtectedRoute>
              } 
            />   
            <Route 
              path="/problem/CodingArena" 
              element={
                <ProtectedRoute>
                  <CodingArena />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;