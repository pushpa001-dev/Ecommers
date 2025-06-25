
import { createSlice ,PayloadAction } from "@reduxjs/toolkit";

interface Cartstate{
  value:number
}

const initialState: Cartstate = {
  value: 0,
};
 
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setData } = cartSlice.actions;
export default cartSlice.reducer;