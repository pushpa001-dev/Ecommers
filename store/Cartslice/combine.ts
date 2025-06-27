import cartReducer from "./cartSlice";
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterslice";
import favoriteReducer from "./favorite";



export const rootReducer = combineReducers({
    cartdata: cartReducer,
    counterSlice: counterReducer,
    favorite: favoriteReducer
});