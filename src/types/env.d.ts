declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        FRONT_URL: string;
        BACK_URL: string;
        BACK_PORT: number;
        DB_NAME: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_URL: string;
        EMAILJS_PUBLIC_API_KEY: string;
        EMAILJS_PRIVATE_API_KEY: string;
        EMAILJS_SERVICE_ID: string;
        EMAILJS_TEMPLATE_ID: string;
        JWT_SECRET_KEY: string;
        SECURE_COOKIE_OPTION: boolean;
    }
}