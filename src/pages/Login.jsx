import React, { useState } from 'react';
import logophoto from "../assets/logo.jpg";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { login, googleLogin } from '../apis/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { addUser } from '../features/userslice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(addUser(response.data.user));
        console.log(response.data.message)
        toast.success(response.data.message);
        navigate('/');
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else if (response.status === 500) {
        toast.error(response.data.message);
      }
      console.log(response);
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <ToastContainer className="toastContainer" />
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src={logophoto} alt="logo" className="w-full h-full object-cover" />
        </div>

        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="email"
                  onChange={handleChange} // Corrected to onChange
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
                  onChange={handleChange} // Corrected to onChange
                  required
                />
              </div>

              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
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
              Need an account?{' '}
              <a href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
