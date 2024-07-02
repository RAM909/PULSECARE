import React, { useState, useEffect } from 'react';
import { verifyOTP, register } from '../apis/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const OTPVerification = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [form, setForm] = useState({});
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [showResend, setShowResend] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setShowResend(true);
        }
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const verifyOtp = async () => {
        const basicdetail = localStorage.getItem('user');
        const { email, firstname, lastname, password } = JSON.parse(basicdetail);
        const otpValue = otp.join('');
        const form = { email, firstname, lastname, password, enteredOTP: otpValue };
        const data = await verifyOTP(form);
        console.log(data);
        if (data.status === 200) {
            toast.success(data.data.message);
            navigate('/login');
        } else if (data.status === 400) {
            toast.error(data.data.message);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index !== 0) {
            e.target.previousSibling.focus();
        }
    };

    const resendOtp = async () => {
        const basicdetail = localStorage.getItem('user');
        const { email, firstname, lastname, password } = JSON.parse(basicdetail);
        const form = { email, firstname, lastname, password };
        const data = await register(form);
        toast.success('OTP has been resent!');
        setTimer(300); // Reset the timer
        setShowResend(false);
    };

    return (
        <>
            <ToastContainer className="toastContainer" />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="p-5 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-center mb-5">OTP Verification</h2>
                    <div className="text-center mb-5">
                        {showResend ? (
                            <button
                                className="text-blue-500 underline"
                                onClick={resendOtp}
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <span>Time remaining: {formatTime(timer)}</span>
                        )}
                    </div>
                    <div className="flex space-x-2 justify-center">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <button
                        className="mt-5 w-full bg-blue-500 text-white py-2 rounded-md"
                        onClick={verifyOtp}
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        </>
    );
};

export default OTPVerification;
