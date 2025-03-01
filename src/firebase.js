import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuPxW36nk0po6mWfyq3x-l5fKNiRp75Ok",
  authDomain: "netflix-6a41f.firebaseapp.com",
  projectId: "netflix-6a41f",
  storageBucket: "netflix-6a41f.firebasestorage.app",
  messagingSenderId: "222914471730",
  appId: "1:222914471730:web:a2d210047f52149bd9592b",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
