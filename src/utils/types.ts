export type TLoginData = {
    email: string,
    password: string
}

export type TFieldType<T> = {
    field: keyof T;
    value: string;
}