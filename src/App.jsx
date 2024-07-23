import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'
import OTPVerification from './pages/Otpverify.jsx';
import Homepage from './pages/Homepage.jsx';
import Bookappoint from './pages/Bookappoint.jsx';
import DoctorApplicationForm from './pages/dorctorform.jsx';
import BookingPage from './pages/BookingPage.jsx';
import UserAppointments from './pages/Yourappontment.jsx';
import DoctorAppointments from './pages/Appointmentreq.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyotp" element={<OTPVerification />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/bookappointment" element={<Bookappoint />} />
        <Route path="/doctor-application" element={<DoctorApplicationForm />} />
        <Route path="/book-appointment/:id" element={<BookingPage />} />
        <Route path="/your-appointments" element={<UserAppointments />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
      </Routes>

    </Router>
  );
}

export default App;
