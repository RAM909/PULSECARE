import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/header'
import Footer from '../components/footer'
import { useNavigate } from 'react-router-dom';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { bookappointment, getdoctorbyid } from '../apis/api';


const BookingPage = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState("");
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        doctorId: '',
        patientId: '',
        doctoremail: '',
        doctorname: '',
        name: '',
        email: '',
        phone: '',
        date: '', // Changed from time to date
        time: '',
        problem: '',
        selectedDay: '',
        doctorphoto: '',
        patientphoto: '',
    });
    const [availableDays, setAvailableDays] = useState(["Monday", "Tuesday"]);

    useEffect(() => {
        // Fetch doctor details based on ID
        const fetchDoctor = async () => {
            const response = await getdoctorbyid(id);
            console.log(response);
            setDoctor(response.data.doctordata);
            setAvailableDays(data.availableDays);
        };

        fetchDoctor();
    }, [id]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);

    useEffect(() => {
        if (doctor && user) {
            console.log("here")
            setFormData({
                ...formData,
                doctorId: doctor._id,
                doctoremail: doctor.email,
                doctorname: doctor.firstname + " " + doctor.lastname,
                patientId: user._id,
                email: user.email,
                doctorphoto: doctor.photo,
                patientphoto: user.photo,
            });
        }
    }, [doctor, user]);

    console.log(doctor);
    console.log(user);
    console.log(formData)



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await bookappointment(formData);
        console.log(response);
        if (response.status === 200) {
            alert("Appointment request successfully send");

        }
        else if (response.status === 500) {
            alert("Internal server error");
        }

        console.log('Booking submitted', formData);
        navigate('/your-appointments');
    };

    const getSelectableDates = () => {
        if (!availableDays.length) return [];

        const today = new Date();
        const daysOfWeek = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7,
        };

        let dates = [];
        for (let i = 0; i < 7; i++) {
            let day = addDays(startOfWeek(today, { weekStartsOn: 1 }), i);
            let dayName = format(day, 'eeee');
            if (availableDays.includes(dayName)) {
                dates.push(day);
            }
        }
        return dates;
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Book Appointment with Dr. {doctor.firstname} {doctor.lastname}
                    </h1>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        {/* <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div> */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={format(new Date(), 'yyyy-MM-dd')}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                                list="available-dates"
                            />
                            <datalist id="available-dates">
                                {getSelectableDates().map(date => (
                                    <option key={date.toISOString()} value={format(date, 'yyyy-MM-dd')}>
                                        {format(date, 'yyyy-MM-dd')}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Problem Description</label>
                            <textarea
                                name="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit Booking
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BookingPage;
