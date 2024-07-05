import React from "react";
import Navbar from "../components/header";
import Footer from "../components/footer";

const Bookappoint = () => {
    const doctors = [
        { id: 1, name: 'Dr. Smith', specialization: 'Cardiology', availability: 'Mon-Fri', imageUrl: 'https://via.placeholder.com/150', rating: 4.5 },
        { id: 2, name: 'Dr. Johnson', specialization: 'Dermatology', availability: 'Tue-Thu', imageUrl: 'https://via.placeholder.com/150', rating: 4 },
        { id: 3, name: 'Dr. Lee', specialization: 'Neurology', availability: 'Mon-Wed', imageUrl: 'https://via.placeholder.com/150', rating: 4.7 },
        { id: 4, name: 'Dr. Patel', specialization: 'Pediatrics', availability: 'Tue-Fri', imageUrl: 'https://via.placeholder.com/150', rating: 4.3 },
        { id: 5, name: 'Dr. Kim', specialization: 'Orthopedics', availability: 'Mon-Fri', imageUrl: 'https://via.placeholder.com/150', rating: 4.6 },
        { id: 6, name: 'Dr. Gonzalez', specialization: 'Gastroenterology', availability: 'Wed-Fri', imageUrl: 'https://via.placeholder.com/150', rating: 4.8 },
        { id: 7, name: 'Dr. Davis', specialization: 'Ophthalmology', availability: 'Mon, Thu', imageUrl: 'https://via.placeholder.com/150', rating: 4.2 },
        { id: 8, name: 'Dr. Martinez', specialization: 'Psychiatry', availability: 'Mon-Fri', imageUrl: 'https://via.placeholder.com/150', rating: 4.4 },
        { id: 9, name: 'Dr. Brown', specialization: 'Endocrinology', availability: 'Tue-Thu', imageUrl: 'https://via.placeholder.com/150', rating: 4.5 },
        { id: 10, name: 'Dr. Wilson', specialization: 'Rheumatology', availability: 'Mon-Wed', imageUrl: 'https://via.placeholder.com/150', rating: 4.1 },
        { id: 11, name: 'Dr. Anderson', specialization: 'Dermatology', availability: 'Wed-Fri', imageUrl: 'https://via.placeholder.com/150', rating: 4.3 },
        { id: 12, name: 'Dr. Thomas', specialization: 'Hematology', availability: 'Mon-Thu', imageUrl: 'https://via.placeholder.com/150', rating: 4.7 }
    ];

    // const renderRatingStars = (rating) => {
    //     const fullStars = Math.floor(rating);
    //     const halfStar = rating % 1 !== 0;
    //     const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    //     return (
    //         <div className="flex">
    //             {[...Array(fullStars)].map((_, i) => (
    //                 <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.89 5.822a1 1 0 00.95.69h6.148c.969 0 1.371 1.24.588 1.81l-4.973 3.588a1 1 0 00-.364 1.118l1.89 5.822c.3.921-.755 1.688-1.54 1.118l-4.973-3.588a1 1 0 00-1.176 0l-4.973 3.588c-.784.57-1.838-.197-1.54-1.118l1.89-5.822a1 1 0 00-.364-1.118L2.77 11.25c-.783-.57-.38-1.81.588-1.81h6.148a1 1 0 00.95-.69l1.89-5.822z"/>
    //                 </svg>
    //             ))}
    //             {halfStar && (
    //                 <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.89 5.822a1 1 0 00.95.69h6.148c.969 0 1.371 1.24.588 1.81l-4.973 3.588a1 1 0 00-.364 1.118l1.89 5.822c.3.921-.755 1.688-1.54 1.118l-4.973-3.588a1 1 0 00-1.176 0l-4.973 3.588c-.784.57-1.838-.197-1.54-1.118l1.89-5.822a1 1 0 00-.364-1.118L2.77 11.25c-.783-.57-.38-1.81.588-1.81h6.148a1 1 0 00.95-.69l1.89-5.822z"/>
    //                 </svg>
    //             )}
    //             {[...Array(emptyStars)].map((_, i) => (
    //                 <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.89 5.822a1 1 0 00.95.69h6.148c.969 0 1.371 1.24.588 1.81l-4.973 3.588a1 1 0 00-.364 1.118l1.89 5.822c.3.921-.755 1.688-1.54 1.118l-4.973-3.588a1 1 0 00-1.176 0l-4.973 3.588c-.784.57-1.838-.197-1.54-1.118l1.89-5.822a1 1 0 00-.364-1.118L2.77 11.25c-.783-.57-.38-1.81.588-1.81h6.148a1 1 0 00.95-.69l1.89-5.822z"/>
    //                 </svg>
    //             ))}
    //         </div>
    //     );
    // };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20"> {/* Adjust pt-20 based on the height of your navbar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <img src={doctor.imageUrl} alt={doctor.name} className="w-24 h-24 rounded-full mb-4"/>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
                                <p className="text-gray-700 left-0 mb-2"><strong>Name: </strong>{doctor.name}</p>
                                <p className="text-gray-700 mb-2"><strong>Specialization: </strong>{doctor.specialization}</p>
                                <p className="text-gray-600"><strong>Availability: </strong>{doctor.availability}</p>
                                {/* {renderRatingStars(doctor.rating)} */}
                                <div className="mt-4 flex justify-center">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Book Appointment</button>
                                    <a href="#" className="text-blue-500 hover:underline">Know More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Bookappoint;
