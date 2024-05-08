import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import {inventory, auth, storage, db, DEVELOPMENT_TESTING_INVENTORY_DOC_KEY} from 'src/models/Firebase.js'
import Category from "src/models/Category";
import Product from "src/models/Product";
import InventoryCollectionProper from "src/models/InventoryCollectionProper";


function InventoryExplorer() {

  const m = {
    getAllNumOfCategories: getAllNumOfCategories,
    recursiveCounter: recursiveCounter,
    navigateTo: navigateTo,
    currentlyIn: {
      currentDoc: inventory,
      libraryCollection: new InventoryCollectionProper(),
    },
  }

  navigateTo("root");

  function getAllNumOfCategories(){
      return this.recursiveCounter(inventory);
      // let categoriesCount = 0;//Not including the root library
    }

    function navigateTo(docId){
      console.log("navigateTo docId", docId);
        // navigateTo


      // if(docId === "root"){
      //   // m.currentlyIn.currerentDocId = docId;
      //   m.currentlyIn.currentDoc = inventory;
      // }
      m.currentlyIn.currentDoc.get().then(snapshot =>{
        if(docId !== "root"){
          m.currentlyIn.currentDoc = m.currentlyIn.currentDoc.collection("categories").doc(docId);
        }
        m.currentlyIn.currentDoc.get()
        .then(doc => {
          // const dataPush = doc.data();
          // dataPush.docId = doc.id;
          console.log("doc snapshoesfiopsoijsljkht", doc.data());
          if(doc.data() === undefined){
            console.log("Undefined second copy, not continuing")
            // Promise.reject(new Error("Undefined second copy, not continuing"));
            // Promise.reject("Undefined second copy, not continuing");
          }else{
            const data = [];
            doc.ref.collection('categories')
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  console.log("m docdata:", doc.data());
                  const dataPush = doc.data();
                  dataPush.docId = doc.id;
                  data.push(dataPush);
                });
                return data;
              })
              .then(data => {
                if(data){
                  // m.currentlyIn.libraryCollection = new InventoryCollectionProper()
                }
                data.forEach((inventoryData, i) => {
                  console.log("inventoryItemData, i", inventoryData);
                  let objectConstructor = null;
                  if(inventoryData.inventoryType === "category"){
                    objectConstructor = Category;
                  }else{
                    objectConstructor = Product;
                  }
                  const found = new objectConstructor(inventoryData);
                  // const foundCategory = new Category(data.title, data.description, data.imageURL, data.items);
                  m.currentlyIn.libraryCollection.add(found);
                  console.log("foundItem (InventoryExplorer)", found)
                });
              })
            return doc;
          }
        })
        .catch(error => {

        });


        // .then(doc => {
        //
        // })
      })

    }
    async function recursiveCounter(collectionRef) {
      const inventoryCounter = {
        categoriesCount: 0,
        productsCount: 0,
      }

      const awaitedSnapshot = await collectionRef
        .get()
        .then(doc => {
          const dataPush = doc.data();
          dataPush.docId = doc.id;
          console.log("doc snapshot", dataPush);
          return doc;
        })
        .then(doc => {
          return doc.ref.collection('categories')
            .get()
            // .then(snapshot => {
            //   snapshot.forEach(doc => {
            //     console.log("docdata:", doc.data());
            //     inventoryCounter.categoriesCount++;
            //   });
            // })
        })

        // .then(doc => {
        //   doc.ref.collection('categories')
        //     .get()
        //     .then(snapshot => {
        //       snapshot.forEach(doc => {
        //         console.log("docdata:", doc.data());
        //         inventoryCounter.categoriesCount++;
        //       });
        //     })
        // })

        .catch(error => {
          console.error("error", error);
        });


      for (const doc of awaitedSnapshot.docs) {
          console.log("docdata:", doc.data());
          inventoryCounter.categoriesCount++;
      }


      // m.catNumTest = inventoryCounter;
      return inventoryCounter;
    }

  return m;
}

export default InventoryExplorer;

