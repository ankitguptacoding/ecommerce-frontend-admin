import { createSlice } from '@reduxjs/toolkit';

const User = createSlice({
    name: "Users",
    initialState: {},
    reducers: {
        userInfo: (state , action)=>{
            console.log(">>>", action.payload);
            state[0] = action.payload;
            console.log("state",state);
        },
    },
})

export const {userInfo} = User.actions;
export default User.reducer;