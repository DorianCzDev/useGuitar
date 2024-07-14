"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import setLocalStorageItem from "@/app/_helpers/setLocalStorageItem";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => setLocalStorageItem("cart", store.getState().cart.cart));

export default store;
