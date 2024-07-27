import React, { useState } from 'react';
import logophoto from "../assets/logo.jpg";
import { register } from '../apis/api';
import { ToastContainer, toast } from "react-toastify";
// import useNavigate from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login, googleLogin } from '../apis/api';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userslice';








const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();


    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.verifyPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }
        const registerUser = async () => {
            localStorage.setItem("user", JSON.stringify(form));
            const data = await register(form);
            console.log(data);
            if (data.status === 200) {
                console.log(data.data.message);
                navigate("/verifyotp");
            } else if (data.status === 400) {
                console.log(data.data.message);
                toast.error(data.data.message);
            }
        }
        registerUser();
    };

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img src={logophoto} alt="logo" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full h-100">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Create an account</h1>

                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="Enter First Name"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                value={form.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Enter Last Name"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                value={form.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                minLength="6"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Verify Password</label>
                            <input
                                type="password"
                                name="verifyPassword"
                                placeholder="Verify Password"
                                minLength="6"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                value={form.verifyPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <button
                            type="submit"
                            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                        >
                            Create Account
                        </button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            try {
                                const decodedToken = jwtDecode(credentialResponse?.credential);
                                const response = await googleLogin(credentialResponse?.credential);
                                console.log(decodedToken);
                                console.log(credentialResponse);
                                console.log(response);
                                if (response.status === 200) {
                                    toast.success(response.data.message);
                                    localStorage.setItem('token', response.data.token);
                                    localStorage.setItem('user', JSON.stringify(response.data.user));
                                    dispatch(addUser(response.data?.user));
                                    navigate('/');
                                    console.log("Login Successful");
                                    console.log(response.data);
                                } else if (response.status === 400) {
                                    toast.error(response.data.message);
                                } else if (response.status === 500) {
                                    toast.error(response.data.message);
                                }
                            } catch (error) {
                                toast.error('An unexpected error occurred. Please try again.');
                                console.error('Google login error:', error);
                            }
                        }}
                        onError={() => {
                            console.log('Login Failed');
                            toast.error('Google login failed. Please try again.');
                        }}
                    />

                    <p className="mt-8">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;
