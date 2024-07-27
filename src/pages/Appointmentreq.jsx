import React, { useEffect, useState } from 'react';
import Navbar from '../components/header';
import Footer from '../components/footer';
import { getappointdoctor, approveappoint, cancelAppointmentd } from '../apis/api'; // Replace with actual API functions

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [cancelReason, setCancelReason] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const data = await getappointdoctor(user._id); // API call to fetch doctor’s appointments
                setAppointments(data.data); // Adjust this based on your API response structure
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);
    console.log(appointments)

    const handleAccept = async (appointmentId) => {
        try {
            const data = await approveappoint(appointmentId);
            if (data.status === 200) {
                console.log(data);
                alert("Appointment Accepted")
            }
            else if (data.status === 500) {
                alert("something went wrong");
            }
        } catch (error) {
            console.error("Failed to update appointment status:", error);
        }
    };

    const handleCancel = async () => {
        try {
            const data = await cancelAppointmentd(selectedAppointment._id, cancelReason); 
            if(data.status === 200){
                console.log(data);
                alert("Appointment Cancelled")
            }
            setIsCancelModalOpen(false);
            setCancelReason("");
            // Optionally, refresh appointments or handle success state
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
        }
    };

    const openCancelModal = (appointment) => {
        setSelectedAppointment(appointment);
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
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">Appointments</h1>
                    {appointments.length === 0 ? (
                        <div>No appointments found.</div>
                    ) : (
                        <div className="space-y-6">
                            {appointments.map((appointment) => (
                                <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
                                    <div className="flex-shrink-0 mb-4 md:mb-0">
                                        <img src={appointment.patientphoto} alt={appointment.patientName} className="w-24 h-24 rounded-full mr-6" />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h2 className="text-xl font-bold mb-2">Patient: {appointment.patientName}</h2>
                                        <p className="text-gray-700 mb-2"><strong>Date: </strong>{new Date(appointment.date).toLocaleDateString()}</p>
                                        <p className="text-gray-700 mb-2"><strong>Time: </strong>{appointment.time}</p>
                                        <p className="text-gray-700 mb-2"><strong>Problem: </strong>{appointment.description}</p>
                                        <p className="text-gray-700 mb-2">
                                            <strong>Status: </strong>
                                            {appointment.status === 'pending' && 'Pending confirmation'}
                                            {appointment.status === 'accepted' && 'Accepted'}
                                            {appointment.status === 'completed' && 'Completed'}
                                            {appointment.status === 'cancelled' && 'Cancelled '}
                                        </p>
                                        {appointment.status === 'accepted' ? (
                                            <p className="text-gray-700 mb-2">
                                                <strong>Payment Status: </strong>
                                                {appointment.payment === 'unpaid' && 'Waiting for payment'}
                                                {appointment.payment === 'paid' && 'Payment Received'}
                                            </p>) : (null)}
                                            {appointment.status === 'cancelled' ? (
                                            <p className="text-gray-700 mb-2">
                                                <strong>Reason: </strong>
                                                {appointment.cancelledBy === 'patient' && 'Appointment cancelled by patient'}
                                                {appointment.cancelledBy === 'doctor' && 'You cancelled this appointment'}
                                            </p>) : (null)}
                                    </div>

                                    <div className="ml-auto mt-4 md:mt-0 flex flex-col items-center space-y-2">
                                        {appointment.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                                    onClick={() => handleAccept(appointment._id)}
                                                >
                                                    Accept
                                                </button>
                                            </div>
                                        )}
                                        {appointment.status === 'pending' || (appointment.status === 'accepted' && appointment.payment === 'unpaid') ? (
                                            <div>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                                    onClick={() => openCancelModal(appointment)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : null}

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />

            {isCancelModalOpen && selectedAppointment && (
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

export default DoctorAppointments;
