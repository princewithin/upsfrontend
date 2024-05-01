import React from "react"
import Login from './login'
import Signup from "./Signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DApp from './components/DApp'
import useAutoLogout from './useAutoLogout';
import ShippingForm from "./components/ShippingForm"

function AppContent() {
  useAutoLogout(300000); // Ensure this hook is properly handled inside a component under <BrowserRouter>

  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DApp />} />
      <Route path='/shippingForm' element={<ShippingForm />}/>
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