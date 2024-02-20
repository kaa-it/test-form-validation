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
    });

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
                required
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
                required
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