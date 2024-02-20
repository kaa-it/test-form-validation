import {TFieldType, TLoginData} from "../utils/types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { login} from "./actions.ts";

type TAuthState = {
    form: TLoginData;
    error: string | null;
    sending: boolean;
}

const initialState: TAuthState = {
    form: {
        email: "",
        password: ""
    },
    error: null,
    sending: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setFormValue: (state, action: PayloadAction<TFieldType<TLoginData>>) => {
            state.form[action.payload.field] = action.payload.value;
        }
    },
    selectors: {
      sendingSelector: (state) => state.sending,
      sendErrorSelector: (state) => state.error,
      authSelector: (state) => state.form,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.error = null;
                state.sending = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.sending = false;
                state.error = action.error.message ?? null;
            })
            .addCase(login.fulfilled, (state) => {
                state.sending = false;
            })
    }
});

export const reducer  = authSlice.reducer;
export const { setFormValue } = authSlice.actions;

export const { sendingSelector, sendErrorSelector, authSelector } = authSlice.selectors;