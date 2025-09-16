declare namespace NodeJS {
    interface ProcessEnv {
        ENV: string;
        FRONT_URL: string;
        BACK_PORT: number;
        DB_NAME: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
    }
}