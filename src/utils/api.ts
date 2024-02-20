import {getRandomArbitrary} from "./utils.ts";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const login = (_email: string, _password: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const valid = !!(getRandomArbitrary(0, 100) % 2);
            if (valid) {
                resolve("Успешно");
            } else {
                reject("Неверный логин или пароль")
            }
        }, 2000);
    })
}