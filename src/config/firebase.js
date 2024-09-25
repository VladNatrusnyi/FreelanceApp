import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCgUM-QRLtP_NH6ryolUnT4RubnkqGOPys",
    authDomain: "freelanseapp.firebaseapp.com",
    projectId: "freelanseapp",
    storageBucket: "freelanseapp.appspot.com",
    messagingSenderId: "633057592490",
    appId: "1:633057592490:web:f913263741339a19317cd3",
    databaseURL: 'https://freelanseapp-default-rtdb.firebaseio.com'
};


export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
