import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    cart: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.cart = [];
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.cart = [];
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        }
    }
})

export const { setLogin, setLogout, addToCart } = authSlice.actions;
export default authSlice.reducer;