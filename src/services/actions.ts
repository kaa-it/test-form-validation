import {createAsyncThunk} from "@reduxjs/toolkit";
import {TLoginData} from "../utils/types.ts";
import { login as apiLogin } from "../utils/api.ts";

export const login = createAsyncThunk(
    "auth/login",
    async ({email, password}: TLoginData) => {
        return apiLogin(email, password);
    }
);