import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import { inventory, auth, storage } from 'src/models/Firebase.js'
import Category from "src/models/Category";
import Product from "src/models/Product";


function InventoryExplorer() {
  const m = {
    getAllNumOfCategories: getAllNumOfCategories,
  }
    function getAllNumOfCategories(){
      return "this.recursiveCounter(inventory)";
      // let categoriesCount = 0;//Not including the root library
    }

    function recursiveCounter(collectionRef) {
      const inventoryCounter = {
        categoriesCount: 0,
        productsCount: 0,
      }

      collectionRef.get().then(snapshot => {

        categoriesQuerySnapshot.forEach(doc => {
          const dataPush = doc.data();
          dataPush.docId = doc.id;
          data.push(dataPush);
          console.log("InventoryExplorer", data);
        });

      });
    }

  return m;
}

export default InventoryExplorer;

