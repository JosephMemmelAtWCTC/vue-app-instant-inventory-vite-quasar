
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

const FIREBASE_REFERENCE_KEYS = {
  ENVIRONMENTS: {
    DEVELOPMENT: "development",
  },
  STORAGES: {
    INVENTORY_PICTURES: 'inventoryItems',
    ACCOUNT_PICTURES: 'accountImages',
  },
  COLLECTIONS: {
    ACCOUNTS: "accounts",
    NOTIFICATIONS: "notifications",
    RECORDS: "record",
    SEARCHES: {
      BASE: "inventorysearch",
      SUBSTORES: {
        TITLES: "titles",
        PRODUCT_IDS: "productIds",
      }
    },
  },
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

// Storages

const storageInventoryPictures = storage.child(FIREBASE_REFERENCE_KEYS.STORAGES.INVENTORY_PICTURES);
const storageAccountPictures = storage.child(FIREBASE_REFERENCE_KEYS.STORAGES.ACCOUNT_PICTURES);


// Collections (for importing just the needed ones instead of using db)
const accounts = db.collection(FIREBASE_REFERENCE_KEYS.COLLECTIONS.ACCOUNTS);
const notifications = db.collection(FIREBASE_REFERENCE_KEYS.COLLECTIONS.NOTIFICATIONS);
const records = db.collection(FIREBASE_REFERENCE_KEYS.COLLECTIONS.RECORDS);


const searches = db.collection(FIREBASE_REFERENCE_KEYS.COLLECTIONS.SEARCHES.BASE);
// Searches
const searches_titles = searches.doc(FIREBASE_REFERENCE_KEYS.ENVIRONMENTS.DEVELOPMENT).collection(FIREBASE_REFERENCE_KEYS.COLLECTIONS.SEARCHES.SUBSTORES.TITLES);

const searches_productIds = searches.doc(FIREBASE_REFERENCE_KEYS.ENVIRONMENTS.DEVELOPMENT).collection(FIREBASE_REFERENCE_KEYS.COLLECTIONS.SEARCHES.SUBSTORES.PRODUCT_IDS);


const DEVELOPMENT_TESTING_INVENTORY_DOC_KEY = "4GpErCnogbGLrHeZu26K";
const SUBMISSION_INVENTORY_DOC_KEY = "4GpErCnogbGLrHeZu26K";

const INVENTORY_DOC_KEY = SUBMISSION_INVENTORY_DOC_KEY
const inventory = db.collection('inventory').doc(INVENTORY_DOC_KEY);
console.log('inventory',inventory);


// firebase
export {
  db, auth, storage, accounts, inventory, notifications, records,
  INVENTORY_DOC_KEY,
  searches_titles,
  searches_productIds,
  searches,
  storageInventoryPictures
}
