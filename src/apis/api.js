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
        const  data  = await axios.post(`${host}/api/user/verify`, form);
        return data;
    } catch (error) {
        return error.response;
    }
}

export const login = async (user) => {
    try {
        const  data  = await axios.post(`${host}/api/user/login`, user);
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
