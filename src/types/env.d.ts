declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    PG_USER: string;
    PG_PASSWORD: string;
    PG_DB: string;
    PG_HOST: string;
    PG_PORT: string;
    JWT_SECRET: string;
  }
}
