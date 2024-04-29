
// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBR2fUlFzaxTUtzdvj2W-0te46mb1MsD5o",
    authDomain: "fir-demo-621bc.firebaseapp.com",
    projectId: "fir-demo-621bc",
    storageBucket: "fir-demo-621bc.appspot.com",
    messagingSenderId: "58716332072",
    appId: "1:58716332072:web:c97bbf7f6eecde272cd51d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

