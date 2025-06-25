import cartReducer from "./cartSlice";
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterslice";



export const rootReducer = combineReducers({
    cartdata: cartReducer,
    counterSlice: counterReducer,
});