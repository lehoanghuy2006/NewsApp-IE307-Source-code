// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1YyjJTm8ybBgcUp84AkLa4Kt4W7HduB4",
    authDomain: "apilogin-79379.firebaseapp.com",
    projectId: "apilogin-79379",
    storageBucket: "apilogin-79379.appspot.com",
    messagingSenderId: "970725106474",
    appId: "1:970725106474:web:bc3181684d789d1b3ff453",
    measurementId: "G-L1JF4ZFV4H"
  };

// Cập nhật trạng thái online khi người dùng đăng nhập
export const loginUser = async (userUID) => {
    await db.collection('users').doc(userUID).update({
        online: true,
    });
};

// Cập nhật trạng thái offline khi người dùng đăng xuất
export const logoutUser = async (userUID) => {
    await db.collection('users').doc(userUID).update({
        online: false,
    });
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

