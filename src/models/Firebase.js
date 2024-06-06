
// Initialize Firebase

import {collection} from "firebase/firestore";

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
const records = db.collection('records')



const searches = db.collection('inventorysearch');
// Searches
const searches_titles = searches.doc('development').collection('titles');

const searches_productIds = searches.doc('development').collection('productIds');


// const DEVELOPMENT_TESTING_INVENTORY_DOC_KEY = "";
const SUBMISSION_INVENTORY_DOC_KEY = "4GpErCnogbGLrHeZu26K";
const inventory = db.collection('inventory').doc(SUBMISSION_INVENTORY_DOC_KEY);


// firebase
export {db, auth, storage,
  accounts, inventory, notifications, records,
  SUBMISSION_INVENTORY_DOC_KEY,
  searches_titles,
  searches_productIds,
  searches
}
