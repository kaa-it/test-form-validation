import React, {ChangeEvent} from "react";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {TFieldType} from "../utils/types.ts";
import {RootState, useSelector} from "../services/store.ts";
import {useDispatch} from "../services/store.ts";

type TUseFormWithValidation<T> = {
    values: T,
    errors: TErrorState<T>,
    isValid: boolean,
    handleChange: (evt: ChangeEvent<HTMLInputElement>) => void,
}

type TFormValidators<T> = {
    [key in keyof T]?: {
        validator: (value: string) => boolean,
        message: string,
    }
};

type TErrorState<T> = { [key in keyof T]: string};

function initError<T>(a: T): TErrorState<T> {
    return Object.keys(a as object).reduce((acc, k) => {
        acc[k as keyof T] = ""; return acc
    }, {} as TErrorState<T>);
}

export function useFormWithValidation<T>(
    selector: (state: RootState) => T,
    setFormValue: ActionCreatorWithPayload<TFieldType<T>>,
    validators: TFormValidators<T>
): TUseFormWithValidation<T> {
    const values = useSelector(selector);
    const [errors, setErrors] = React.useState<TErrorState<T>>(initError<T>(values));
    const [isValid, setIsValid] = React.useState(false);
    const dispatch = useDispatch();

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const input = evt.target;
        const value = input.value;
        const name = input.name as keyof T;
        const isValid = validators[name]?.validator(value) ?? true;
        dispatch(setFormValue({ field: name, value}));
        setErrors({ ...errors, [name]: !isValid ? validators[name]!.message : undefined});
        setIsValid(isValid);
    };

    return { values, handleChange, errors, isValid };
}