import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 1,
        max: 10,
        min:0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
            if (state.value >= 10) {
                debugger;
            }
        },
        decrement: (state) => {
            state.value -= 1;
        },
     
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;