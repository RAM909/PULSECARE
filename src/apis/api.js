import axios from 'axios';
const host = 'http://localhost:5000';



export const register = async (user) => {
    try {
        const data = await axios.post(`${host}/api/user/register`, user);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const verifyOTP = async (form) => {
    try {
        const data = await axios.post(`${host}/api/user/verify`, form);
        return data;
    } catch (error) {
        return error.response;
    }
}

export const login = async (user) => {
    try {
        const data = await axios.post(`${host}/api/user/login`, user);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const googleLogin = async (tokenId) => {
    try {
        const data = await axios.post(`${host}/api/user/googlelogin`, { tokenId });
        return data;
    } catch (error) {
        return error.response.data;
    }

}
export const doctorapplication = async (info) => {
    try {
        const headers = {
            'auth-token': localStorage.getItem('token'),
        };
        const data = await axios.post(`${host}/api/doctor/apply-doctor`, { info }, { headers });
        return data;
    } catch (error) {
        return error.response.data;
    }

}

export const getdoctorreqbyid = async (id) => {
    try {
        const headers = {
            'auth-token': localStorage.getItem('token'),
        };

        // Make sure the URL and headers are correctly configured
        const response = await axios.get(`${host}/api/doctor/get-doctor-req`, {
            params: { id }, // Use 'params' to send query parameters
            headers: headers, // Include headers in the configuration object
        });

        return response; // Return the data from the response
    } catch (error) {
        console.error('Error fetching doctor request:', error); // Log the error
        return error.response ? error.response.data : { error: 'An unknown error occurred' }; // Return error details
    }
};