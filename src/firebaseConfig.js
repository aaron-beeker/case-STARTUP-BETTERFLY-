import { initializeApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import { connectorConfig } from "./generated/data";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const dataConnect = getDataConnect(app, connectorConfig);

// Conectar al emulador local de Data Connect durante desarrollo
// Comentado para usar la base de datos real Cloud SQL en producción (us-east4):
// if (import.meta.env.DEV) {
//     connectDataConnectEmulator(dataConnect, "localhost", 9399);
// }