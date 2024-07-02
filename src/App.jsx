import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'
import OTPVerification from './pages/Otpverify.jsx';
import Homepage from './pages/Homepage.jsx';
import Bookappoint from './pages/Bookappoint.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyotp" element={<OTPVerification />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/bookappointment" element={<Bookappoint/>}/>
          </Routes>
      
    </Router>
  );
}

export default App;
