import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice= createSlice({
  name: "authSlice",
  initialState,

  reducers: {
    //Actions:
    //userLoggedIn({name:"Chhiring", isAuthenticated:true})
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});


export const {userLoggedIn, userLoggedOut} = authSlice.actions;

export default authSlice.reducer