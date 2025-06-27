import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
    value: number;
}

const initialState: FavoriteState = {
    value: 0,
};

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
       setfavorite: (state, action: PayloadAction<number>) => {
           state.value= action.payload;
       }
    },
});

export const { setfavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
