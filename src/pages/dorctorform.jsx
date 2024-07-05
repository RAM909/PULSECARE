import React, { useState } from 'react';
import Navbar from '../components/header';
import Footer from '../components/footer';
import { useSelector } from 'react-redux';
import { doctorapplication } from '../apis/api';

const DoctorApplicationForm = () => {
    // const user = useSelector(state => state.user);
    // console.log(user)
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    const [formData, setFormData] = useState({
        userID: user._id,
        name: '',
        specialization: '',
        hospital: '',
        availableDay: '',
        certificate: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            certificate: e.target.files[0],
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await doctorapplication(formData);
        console.log(response);
        console.log(formData);
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow pt-20'>
                <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Doctor Application Form</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                                Specialization
                            </label>
                            <input
                                type="text"
                                name="specialization"
                                id="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">
                                Hospital
                            </label>
                            <input
                                type="text"
                                name="hospital"
                                id="hospital"
                                value={formData.hospital}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="availableDay" className="block text-sm font-medium text-gray-700">
                                Available Day
                            </label>
                            <select
                                name="availableDay"
                                id="availableDay"
                                value={formData.availableDay}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select a day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
                                Upload Certificate
                            </label>
                            <input
                                type="file"
                                name="certificate"
                                id="certificate"
                                onChange={handleFileChange}
                                required
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DoctorApplicationForm;
