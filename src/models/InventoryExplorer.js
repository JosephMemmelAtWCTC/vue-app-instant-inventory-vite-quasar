import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import { inventory, auth, storage } from 'src/models/Firebase.js'
import Category from "src/models/Category";
import Product from "src/models/Product";


function InventoryExplorer() {
  const m = {
    getAllNumOfCategories: getAllNumOfCategories,
    recursiveCounter: recursiveCounter,
  }
    function getAllNumOfCategories(){
      return this.recursiveCounter(inventory);
      // let categoriesCount = 0;//Not including the root library
    }

    function recursiveCounter(collectionRef) {
      const inventoryCounter = {
        categoriesCount: 0,
        productsCount: 0,
      }

      // collectionRef
      //   .get()
      //   .then(snapshot => {
      //     snapshot.forEach(doc => {
      //       const dataPush = doc.data();
      //       dataPush.docId = doc.id;
      //       data.push(dataPush);
      //       console.log("snapshot data", dataPush);
      //     });
      //   })
      collectionRef
        .get()
        .then(doc => {
          const dataPush = doc.data();
          dataPush.docId = doc.id;
          console.log("doc snapshot", dataPush);
          return doc;

        })
        .then(doc => {
          doc.ref.collection('categories')
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  console.log("docdata:", doc.data());
                });
              })
        })
        // .then(doc =>{
        //   doc.ref.collection('categories')
        //     .get()
        //     .then(snapshot => {
        //       snapshot.forEach(doc => {
        //         console.log("docdata:", doc.data());
        //       });
        //     })
        // })
        .catch(error => {
          console.error("error", error);
        });



      return inventoryCounter;
    }

  return m;
}

export default InventoryExplorer;

