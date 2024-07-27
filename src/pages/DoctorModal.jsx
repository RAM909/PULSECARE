import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorModal = ({ doctor, onClose }) => {
    console.log(doctor);
    const Navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">&times;</button>
                <div className="flex flex-col items-center">
                    <img src={doctor.photo} alt={doctor.firstname} className="w-32 h-32 rounded-full mb-4" />
                    <h2 className="text-3xl font-bold mb-2">{doctor.name}</h2>
                    <p className="text-gray-700 mb-2"><strong>Name: </strong>{doctor.firstname} {doctor.lastname}</p>
                    <p className="text-gray-700 mb-2"><strong>Specialization: </strong>{doctor.specialization}</p>
                    <p className="text-gray-600 mb-4"><strong>Availability: </strong>{doctor.availability}</p>
                    <p className="text-gray-600 mb-4"><strong>Description: </strong>{doctor.description}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {  Navigate(`/book-appointment/${doctor._id}`); }}>
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorModal;
