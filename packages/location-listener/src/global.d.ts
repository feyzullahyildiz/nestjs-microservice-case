// https://javascript.plainenglish.io/using-env-variables-and-autocomplete-with-node-js-and-typescript-46b5b4a769d8
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RABBITMQ_CONNECTION: string;
      LOCATION_MONGODB_CONNECTION: string;
    }
  }
}
export {};
