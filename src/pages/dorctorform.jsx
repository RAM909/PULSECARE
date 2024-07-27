import React, { useState, useEffect } from 'react';
import Navbar from '../components/header';
import Footer from '../components/footer';
import { useSelector } from 'react-redux';
import { doctorapplication, getdoctorreqbyid } from '../apis/api';
import { useNavigate } from 'react-router-dom';

const DoctorApplicationForm = () => {
    const [user, setUser] = useState(null);
    const [userrole, setUserrole] = useState("patient");
    const [doctorRequest, setDoctorRequest] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userID: '',
        name: '',
        specialization: '',
        hospital: '',
        availableDays: [],
        certificate: null,
    });

    const user1 = useSelector((state) => state.user);
    console.log(user1);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        const fetchDoctorRequest = async () => {
            try {
                const data = await getdoctorreqbyid(user._id);
                if (data.status === 200) {
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

        if (user) {
            setUser(user)
            setUserrole(user.role)
            setFormData((prevFormData) => ({
                ...prevFormData,
                userID: user._id,
            }));
            fetchDoctorRequest();
        }
    }, []);

    console.log(user);
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


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
            certificate: e.target.files?.[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('userID', formData.userID);
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('specialization', formData.specialization);
        formDataToSubmit.append('hospital', formData.hospital);
        formData.availableDays.forEach(day => {
            formDataToSubmit.append('availableDays', day);
        });
        if (formData.certificate) {
            formDataToSubmit.append('certificate', formData.certificate);
        }

        // Debugging FormData content
        for (const pair of formDataToSubmit.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            const response = await doctorapplication(formDataToSubmit);
            console.log(response);
            if(response.status === 200){
                alert("Application submitted successfully");
            }
            else if(response.status === 500){
                alert("Internal server error");
            }

            // Handle success, maybe redirect or show a success message
        } catch (error) {
            console.error('Failed to submit doctor application:', error);
            // Handle error, maybe show an error message
        }
    };

    return (
        <>

        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow pt-20'>
                {user ? (
                    doctorRequest ? (
                        <div>Request already exists, Please wait for Confirmation.</div>
                    ) : (
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
                        </div>
                    )
                ) : (
                    <div>
                        <h1>Please Login to Apply for Doctor</h1>
                        <button
                            onClick={() => { navigate("/login"); }}
                            className="px-4 py-2 mt-2 text-white bg-blue-600 transition-colors duration-300 transform rounded-md hover:bg-blue-700"
                        >
                            Login
                        </button>

                    </div>
                )}
            </main>
            <Footer />
        </div>
        </>
    );
};

export default DoctorApplicationForm;
