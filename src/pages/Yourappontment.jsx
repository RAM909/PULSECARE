import React, { useEffect, useState } from 'react';
import Navbar from '../components/header';
import Footer from '../components/footer';
import { getappointpatient, cancelAppontmentp } from '../apis/api';
import { useNavigate } from 'react-router-dom';

const UserAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const data = await getappointpatient(user._id); // API call to fetch user's appointments
                setAppointments(data.data); // Adjust this based on your API response structure
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);


    console.log(appointments);
    const handleCancel = async () => {
        try {
            const data = await cancelAppontmentp(selectedAppointmentId, cancelReason);
            console.log(data) // API call to cancel the appointment with reason
            setIsCancelModalOpen(false);
            setCancelReason("");
            alert("Appointment Cancelled");
            // window.location.reload(); // Reload the page to reflect the updated appointments
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
            alert("Failed to cancel appointment. Please try again.");
        }
    };

    const openCancelModal = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setIsCancelModalOpen(true);
    };

    const closeCancelModal = () => {
        setIsCancelModalOpen(false);
        setCancelReason("");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
                {user ? (
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold mb-4">Your Appointments</h1>
                        {appointments.length === 0 ? (
                            <div>No appointments found.</div>
                        ) : (
                            <div className="space-y-6">
                                {appointments.map((appointment) => (
                                    <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
                                        <div className="flex-shrink-0 mb-4 md:mb-0">
                                            <img src={appointment.doctorphoto} alt={appointment.doctorname} className="w-24 h-24 rounded-full mr-6" />
                                        </div>
                                        <div className="flex-grow text-center md:text-left">
                                            <h2 className="text-xl font-bold mb-2">Dr. {appointment.doctorname}</h2>
                                            <p className="text-gray-700 mb-2"><strong>Date: </strong>{new Date(appointment.date).toLocaleDateString()}</p>
                                            <p className="text-gray-700 mb-2"><strong>Time: </strong>{appointment.time}</p>
                                            <p className="text-gray-700 mb-2"><strong>Problem: </strong>{appointment.description}</p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Status: </strong>
                                                {appointment.status === 'pending' && 'Waiting for confirmation'}
                                                {appointment.status === 'accepted' && 'Doctor has approved. Please make payment to book your appointment.'}
                                                {appointment.status === 'completed' && 'Appointment completed.'}
                                                {appointment.status === 'cancelled' && 'Cancelled'}
                                            </p>
                                            {appointment.status === 'cancelled' ? (
                                                <p className="text-gray-700 mb-2"><strong>Reason: </strong>{appointment.cancelledBy === 'patient' && 'You cancelled this appointment'}{appointment.cancelledBy == 'doctor' && 'Sorry, the doctor has cancelled this request.'} </p>) : (null)}
                                        </div>
                                        <div className="ml-auto mt-4 md:mt-0 flex flex-col items-center space-y-2">
                                            {appointment.status !== 'cancelled' ? (
                                                (appointment.status === 'accepted' ? (
                                                    appointment.paymentStatus === 'paid' ? (
                                                        <button className="bg-green-500 text-white px-4 py-2 rounded">Payment Done</button>
                                                    ) : (
                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Make Payment</button>
                                                    )
                                                ) : (
                                                    <button className="bg-gray-500 text-white px-4 py-2 rounded" disabled>Make Payment</button>
                                                ))
                                            ) : (null)}
                                            {appointment.status === 'pending' && (
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                                    onClick={() => openCancelModal(appointment._id)}
                                                >
                                                    Cancel Appointment
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (<div>
                    <h1>Please Login to check</h1>
                    <button
                        onClick={() => { navigate("/login"); }}
                        className="px-4 py-2 mt-2 text-white bg-blue-600 transition-colors duration-300 transform rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>

                </div>)
                }
            </main>
            <Footer />

            {isCancelModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                            placeholder="Enter reason for cancellation"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                onClick={closeCancelModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleCancel}
                            >
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAppointments;
