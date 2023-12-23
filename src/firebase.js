import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {ref} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVfsykJ4-590g-I8Bga5VOCbmEOyUNvW8",
  authDomain: "project-2-b0f21.firebaseapp.com",
  databaseURL: "https://project-2-b0f21-default-rtdb.firebaseio.com",
  projectId: "project-2-b0f21",
  storageBucket: "project-2-b0f21.appspot.com",
  messagingSenderId: "269562038223",
  appId: "1:269562038223:web:9df166a516ed8c1ee8f4ba"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const refrence = ref()
export const db = getFirestore()

