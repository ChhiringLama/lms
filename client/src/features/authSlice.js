import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userRole:"",
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
      state.userRole=action.payload.user.role;
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