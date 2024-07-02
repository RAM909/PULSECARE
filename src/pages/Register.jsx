import React, { useState } from 'react';
import logophoto from "../assets/logo.jpg";
import { register } from '../apis/api';
import { ToastContainer, toast } from "react-toastify";
// import useNavigate from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

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
                    <button
                        onClick={() => {

                        }}
                        type="button"
                        className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                    >
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                className="w-6 h-6"
                                viewBox="0 0 48 48"
                            >
                                <defs>
                                    <path
                                        id="a"
                                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                                    />
                                </defs>
                                <clipPath id="b">
                                    <use xlinkHref="#a" overflow="visible" />
                                </clipPath>
                                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                                <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                                <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                                <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                            </svg>
                            <span className="ml-4">Sign in with Google</span>
                        </div>
                    </button>

                    <p className="mt-8">
                        Already have an account?{' '}
                        <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;
