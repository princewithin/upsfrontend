import React from "react"
import Login from './login'
import Signup from "./Signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DApp from './components/DApp'
import useAutoLogout from './useAutoLogout';

function AppContent() {
  useAutoLogout(300000); // Ensure this hook is properly handled inside a component under <BrowserRouter>

  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DApp />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


export default App