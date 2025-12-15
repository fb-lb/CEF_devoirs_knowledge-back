declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        FRONT_URL: string;
        BACK_URL: string;
        DATABASE_NAME: string;
        DATABASE_USERNAME: string;
        DATABASE_PASSWORD: string;
        DATABASE_HOST: string;
        DATABASE_URL: string;
        EMAILJS_PUBLIC_API_KEY: string;
        EMAILJS_PRIVATE_API_KEY: string;
        EMAILJS_SERVICE_ID: string;
        EMAILJS_TEMPLATE_ID: string;
        JWT_SECRET: string;
        PORT: number;
        SECURE_COOKIE_OPTION: boolean;
        STRIPE_PUBLIC_KEY: string;
        STRIPE_SECRET_KEY: string;
    }
}