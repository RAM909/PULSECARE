import React, { useState, useEffect } from 'react';
import Navbar from '../components/header';
import Footer from '../components/footer';
import { updateprofile } from '../apis/api';

const UpdateProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [Id, setId] = useState('');
    const [loading, setLoading] = useState(true);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file);
        setProfilePhotoPreview(URL.createObjectURL(file));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user._id) {
                    setId(user._id);
                    setFirstName(user.firstname || '');
                    setLastName(user.lastname || '');
                    setPhoneNo(user.phoneno || '');
                    // Set profile photo preview if available
                    if (user.photo) {
                        setProfilePhotoPreview(user.photo);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Id) {
            alert("User ID not found");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('Id', Id);
            formData.append('firstname', firstName);
            formData.append('lastname', lastName);
            formData.append('phoneno', phoneNo);
            formData.append('profilePhoto', profilePhoto);

            const response = await updateprofile(formData);
            console.log(response);
            if (response.status === 200) {
                alert("Profile Updated Successfully");
            } else {
                alert("Profile Update Failed");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Profile Update Failed");
        }
    };
    console.log(firstName, lastName, phoneNo,  Id);

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto p-6">
                <main className="flex-grow pt-20">
                    <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                {profilePhotoPreview && (
                                    <img src={profilePhotoPreview} alt="Profile Preview" className="mt-2 w-24 h-24 object-cover rounded-full" />
                                )}
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Update Profile
                            </button>
                        </form>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default UpdateProfile;
