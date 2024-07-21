import React, { useEffect, useState } from "react";
import Navbar from "../components/header";
import Footer from "../components/footer";
import DoctorModal from './DoctorModal';
import { useNavigate } from 'react-router-dom';
import { getalldoctor } from '../apis/api';

const Bookappoint = () => {
    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);

    const handleKnowMoreClick = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDoctor(null);
        setIsModalOpen(false);
    };

    const handleBookAppointment = (doctorId) => {
        navigate(`/book-appointment/${doctorId}`);
    };

    useEffect(() => {
        // Define the async function inside useEffect
        const fetchDoctors = async () => {
            try {
                const data = await getalldoctor();
                console.log(data);
                setDoctors(data.data); // Ensure data.data is the correct path to the doctors array
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };

        fetchDoctors();
    }, []); // Empty dependency array means this will run once on component mount

    console.log(doctors)

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <img src={doctor.imageUrl} alt={doctor.firstname} className="w-24 h-24 rounded-full mb-4" />
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">Dr.{doctor.firstname} {doctor.lastname}</h2>
                                <p className="text-gray-700 mb-2"><strong>Specialization: </strong>{doctor.specialization}</p>
                                <p className="text-gray-600"><strong>Availability: </strong>{doctor.availability}</p>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => handleBookAppointment(doctor._id)}
                                    >
                                        Book Appointment
                                    </button>
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleKnowMoreClick(doctor)}
                                    >
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {isModalOpen && selectedDoctor && (
                    <DoctorModal doctor={selectedDoctor} onClose={closeModal} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Bookappoint;
