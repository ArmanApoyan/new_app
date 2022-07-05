declare global {
    interface User {
        username: string;
        email: string;
        password: string
    }
}

declare global {
    interface regData {
        username: string;
        email: string;
        password: string,
        confirm: string,
    }
}

export {}