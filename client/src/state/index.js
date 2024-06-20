import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  cart: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.cart = [];
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item.id === id && item.size === size)
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setLogin, setLogout, addToCart, removeFromCart, clearCart } = authSlice.actions;
export default authSlice.reducer;
