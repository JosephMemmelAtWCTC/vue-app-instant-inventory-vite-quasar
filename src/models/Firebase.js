
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

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();


// Collections (for importing just the needed ones instead of using db)
const accounts = db.collection('accounts');
const notifications = db.collection('notifications');

const DEVELOPMENT_TESTING_INVENTORY_DOC_KEY = "4GpErCnogbGLrHeZu26K";
const inventory = db.collection('inventory').doc(DEVELOPMENT_TESTING_INVENTORY_DOC_KEY); //TODO: Rename to inventoryRoot?


// firebase
export {db, auth, storage,
  accounts, inventory, notifications,
  DEVELOPMENT_TESTING_INVENTORY_DOC_KEY
}
