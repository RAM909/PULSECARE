import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: "",
    firstname: "",
    lastname: "",
    _id: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log(action.payload); // Logging action payload to verify the data
            const { email, firstname, lastname, _id } = action.payload;
            state.email = email;
            state.firstname = firstname;
            state.lastname = lastname;
            state._id = _id;
        },
        clearUser: (state) => {
            state.email = null;
            state.firstname = null;
            state.lastname = null;
            state._id = null;
        },
    },
});

export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
