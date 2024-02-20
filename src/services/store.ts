import {configureStore} from "@reduxjs/toolkit";
import {reducer as authReducer} from "./authSlice.ts";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
