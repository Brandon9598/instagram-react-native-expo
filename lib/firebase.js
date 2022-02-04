import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA0X09TjBszFCRCPZWqQ-Xhlyw7TLAn-Sw",
	authDomain: "instagram-e566e.firebaseapp.com",
	projectId: "instagram-e566e",
	storageBucket: "instagram-e566e.appspot.com",
	messagingSenderId: "821843157741",
	appId: "1:821843157741:web:f8ecfa13f0ec9790eb62e4",
	measurementId: "G-TK65ZDNCQH",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const firebaseApp = firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
