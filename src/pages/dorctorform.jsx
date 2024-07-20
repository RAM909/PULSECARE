import React, { useState, useEffect } from 'react';
import Navbar from '../components/header';
import Footer from '../components/footer';
import { useSelector } from 'react-redux';
import { doctorapplication, getdoctorreqbyid } from '../apis/api';

const DoctorApplicationForm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [formData, setFormData] = useState({
        userID: user._id,
        name: '',
        specialization: '',
        hospital: '',
        availableDays: [],
        certificate: null,
    });
    const [doctorRequest, setDoctorRequest] = useState(null);
    // const [loading, setLoading] = useState(true);

    //Fetch doctor request data
    useEffect(() => {
        const fetchDoctorRequest = async () => {
            try {
                const data = await getdoctorreqbyid(user._id);
                if(data.status === 200){
                setDoctorRequest(data);
                }
                if (data.message === "Doctor request not found") {
                    setDoctorRequest(null);
                }
                console.log(data);
                // setLoading(false);
            } catch (error) {
                console.error('Failed to fetch doctor request:', error);
                // setLoading(false);
            }
        };

        fetchDoctorRequest();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDayChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            const availableDays = checked
                ? [...prevFormData.availableDays, value]
                : prevFormData.availableDays.filter((day) => day !== value);
            return { ...prevFormData, availableDays };
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            certificate: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await doctorapplication(formData);
        console.log(response);
        console.log(formData);
    };

    // Conditional rendering based on the presence of doctor request
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (doctorRequest) {
    //     <Navbar />;
    //     return <div>Request already exists. Please edit your details.</div>;
    //     <Footer />;
    // }

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            
            <main className='flex-grow pt-20'>
                {doctorRequest ? <div>Request already exists, Please wait for Confirmation.</div>:
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
                            <label className="block text-sm font-medium text-gray-700">
                                Available Days
                            </label>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <div key={day} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="availableDays"
                                        value={day}
                                        checked={formData.availableDays.includes(day)}
                                        onChange={handleDayChange}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor={day} className="ml-2 block text-sm text-gray-900">
                                        {day}
                                    </label>
                                </div>
                            ))}
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
                </div>}
            </main>
            <Footer />
        </div>
    );
};

export default DoctorApplicationForm;
