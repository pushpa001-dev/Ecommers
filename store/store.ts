
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Cartslice/combine";

export const store = configureStore({
    reducer: {
        data: rootReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;