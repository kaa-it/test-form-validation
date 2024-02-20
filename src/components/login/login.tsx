import styles from "./login.module.css";
import {FormEvent, ForwardedRef, InputHTMLAttributes, useLayoutEffect, useRef} from "react";
import {useFormWithValidation} from "../../hooks/useFormWithValidation.ts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputRef?: ForwardedRef<HTMLInputElement>,
    error?: string,
    value?: string
    className: string
}

const Input = ({inputRef, error = "", value = "", className, ...props}: InputProps) => {
    return (
        <label className={styles.label}>
            <input className={className} ref={inputRef} {...props} value={value}/>
            <span className={styles.error}>
                {error || ""}
            </span>
        </label>
    )
};

type LoginData = {
    email: string,
    password: string
}

export const PWD_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const formValidators = {
    email: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: "Укажите корректный email.",
    },
    password: {
        validator: (value: string) => PWD_REGEX.test(value),
        message: "Укажите пароль посложнее.",
    }
};

export const Login = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isSending = false;
    const sendingError: string | null = "jdskghfdkjgh"; //null;

    useLayoutEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const { values, handleChange, errors, isValid } =
        useFormWithValidation<LoginData>({
            email: "",
            password: ""
    }, formValidators);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <h3 className={styles.title}>Вход</h3>
            <Input
                inputRef={inputRef}
                type='email'
                name='email'
                id='email'
                className={styles.input}
                placeholder='Email'
                value={values.email || ''}
                error={errors.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
            />
            <Input
                type='password'
                name='password'
                id='password'
                className={styles.input}
                placeholder='Пароль'
                value={values.password || ''}
                error={errors.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
            />
            <button
                className={styles.button}
                type='submit'
                disabled={isSending || !isValid}
            >
                {isSending ? "Вход..." : "Войти"}
            </button>
            {sendingError && (
                <span className={styles.send_error}>{`Ошибка: ${sendingError}`}</span>
            )}
        </form>
    );
}