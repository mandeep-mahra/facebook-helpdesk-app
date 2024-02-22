// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {setDoc, getFirestore, doc, getDoc} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCh8h7VmnGUMHlmutXql3pSvGsvjPpa7qs",
  authDomain: "fb-helpdesk-b6222.firebaseapp.com",
  projectId: "fb-helpdesk-b6222",
  storageBucket: "fb-helpdesk-b6222.appspot.com",
  messagingSenderId: "106181849870",
  appId: "1:106181849870:web:aecf6d1280bca5005f9d5f",
  measurementId: "G-EYVFM1BE13"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


async function postUser(email, password){
    const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    return userCredentials;
}
async function getData(){
    const db = getFirestore(app);
    const docRef = doc(db, "subscriptionData", "lDAJsezo5PQduLEW1yS1");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
}
async function uploadPayload(data) {
    const db = getFirestore(app);
    await setDoc(doc(db, "subscriptionData", "lDAJsezo5PQduLEW1yS1"), {
        [Date.now()] : data
    }, { merge: true });
}

export {postUser, getData, uploadPayload};