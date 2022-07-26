// https://javascript.plainenglish.io/using-env-variables-and-autocomplete-with-node-js-and-typescript-46b5b4a769d8
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIRST_ADMIN_EMAIL: string;
      FIRST_ADMIN_PLAIN_PASSWORD: string;

      MONGO_CONNECTION_STRING: string;

      JWT_SECRET_REFRESH_KEY_ADMIN: string;
      JWT_SECRET_REFRESH_KEY_COURIER: string;
      JWT_SECRET_KEY_ADMIN: string;
      JWT_SECRET_KEY_COURIER: string;
    }
  }
}
export {};
