import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import {
  inventory,
  auth,
  storage,
  db,
  DEVELOPMENT_TESTING_INVENTORY_DOC_KEY,
  notifications, accounts
} from 'src/models/Firebase.js'
import Category from "src/models/Category";
import Product from "src/models/Product";
import InventoryCollectionProper from "src/models/InventoryCollectionProper";


function InventoryExplorer() {

  const m = {
    // getAllNumOfCategories: async function () {
    //   return await getAllNumOfCategories;
    // },
    getAllNumOfCategories: getAllNumOfCategories,
    recursiveCounter: recursiveCounter,
    navigateTo: navigateTo,
    currentlyIn: {
      currentDocId: null,
      currentDoc: inventory,
      libraryCollection: new InventoryCollectionProper(),
      addNew: addNew,
      remove: remove,
    },
  }


    function getAllNumOfCategories(){
      return this.recursiveCounter(inventory);
      // let categoriesCount = 0;//Not including the root library
    }

    function navigateTo(docId){
      console.log("navigateTo docId", docId);
        // navigateTo


      if(docId === "root"){
        m.currentlyIn.currentDoc = inventory;
      }
      if(docId === m.currentlyIn.currentDocId){
        console.log("FAILING: Tried to duplicate category/id path");
        // return "FAILING: Tried to duplicate category/id path";
        return Promise.reject("FAILING: Tried to duplicate category/id path");
      }else{
        return m.currentlyIn.currentDoc.get().then(snapshot =>{
          if(docId === "root"){
            docId = DEVELOPMENT_TESTING_INVENTORY_DOC_KEY;
          }else{
            m.currentlyIn.currentDoc = m.currentlyIn.currentDoc.collection("categories").doc(docId);
            console.log("QQQQQQQQQQ", m.currentlyIn.currentDoc.path);
          }
          m.currentlyIn.currentDocId = docId;
          return m.currentlyIn.currentDoc.get()
            .then(doc => {
              // const dataPush = doc.data();
              // dataPush.docId = doc.id;
              console.log("doc snapshoesfiopsoijsljkht", doc.data());
              if(doc.data() === undefined){
                console.log("Undefined second copy, not continuing")
                return Promise.reject("Undefined second copy, not continuing");

                // Promise.reject(new Error("Undefined second copy, not continuing"));
                // Promise.reject("Undefined second copy, not continuing");
              }else{
                const data = [];
                return doc.ref.collection("categories")
                  .get()
                  .then(takeCareOfCurrentSnapshot)
                  .then(() => {
                    return m.currentlyIn.currentDoc.collection("categories").onSnapshot(snapshot =>
                      takeCareOfCurrentSnapshot(snapshot)
                    );
                  })
                  .then(() => {
                    return "Ready for trigger"
                  })
                return "doc";
              }
              return "kkkkkk";
            })
            .catch(error => {
              console.error("Error at InventoryExplorer",error)
              return "?JJJJJJJ";
            })


          // .then(() => {
          //   return "Ready for trigger"
          // })
          return "ollll";
        })
      }
    }

    function takeCareOfCurrentSnapshot(snapshot){
    const data = [];
      snapshot.forEach(doc => {
        console.log("m docdata:", doc.data());
        const dataPush = doc.data();
        dataPush.docId = doc.id;
        data.push(dataPush);
      });
      if(data){
        m.currentlyIn.libraryCollection = new InventoryCollectionProper();
      }
      //https://www.squash.io/how-to-use-async-await-with-a-foreach-loop-in-javascript/
      return Promise.all(data.map(async (inventoryData) => {
        let objectConstructor = null;
        if(inventoryData.inventoryType === "category"){
          objectConstructor = Category;
        }else{
          objectConstructor = Product;
        }
        const found = new objectConstructor(inventoryData);
        console.log("foundItem (InventoryExplorer)", found);
        return m.currentlyIn.libraryCollection.add(found);
      }));
    }



  function remove(item){
    return m.currentlyIn.currentDoc.collection("categories")
      .doc(item.docId).delete().then(() => {
      console.log("Document successfully deleted!");
      return "Document successfully deleted!"
    }).catch((error) => {
      console.error("Error removing document: ", error);
        return "Error removing document: " + error;
      });
  }

  function addNew(oldNew){

    if(oldNew.constructor === Array){
      const oldVersion = oldNew[0];
      const newVersion = oldNew[1];

      console.log("<<<<<<", oldVersion);
      console.log(">>>>>>", newVersion);

      const diffrences = {};
      for(const fieldKey in newVersion){
        if(oldVersion[fieldKey] !== newVersion[fieldKey]) {
          diffrences[fieldKey] = newVersion[fieldKey];
        }
      }

      console.log("<><><>", oldVersion.docId, diffrences);
      const path = m.currentlyIn.currentDoc.collection("categories").doc(oldVersion.docId);
      console.log("path", path.path);

      return m.currentlyIn.currentDoc.collection("categories")
        .doc(oldVersion.docId)
        .update(diffrences)
        .then((docRef) => {
          console.log("checkForNoticescheckForNotices", diffrences, newVersion);

          if(oldVersion.constructorSaved.type === STORAGE_TYPES.PRODUCT_GENERIC){
            checkForNotices(newVersion);
          }
          return "Ready for update completed"
        })
    }else{
      const newItem = new InventoryItem(oldNew);
      // debugger
      // oldNew = Object.assign(oldNew.constructorSaved, oldNew);

      console.log("newItem = new InventoryItem(oldNew)", newItem);
      const imgFile = newItem.product.imageURL;
      newItem.product.imageURL = null;

      return m.currentlyIn.currentDoc.collection("categories")
        .add(newItem.getAsData())
        .then((docRef) => {

          if(newItem.inventoryType === STORAGE_TYPES.PRODUCT_GENERIC){
            // TODO: docRef gives `Paused on exception
            // TypeError: doc is undefined`

            // return checkForNotices(docRef);
            // console.log("checkForNotices Data newItem.getAsData()", "newItem.getAsData()");
            // console.log("checkForNotices Data", newItem.getAsData());

            checkForNotices(newItem.getAsData());
          }

          return docRef;
        })
        .then((docRef) => {
          return docRef.get();
        })
        .then((doc) => {
          console.log("doc.data());", doc.data());
          storage.child('inventoryItems').child(doc.id)

            .put(imgFile)
            .then(snapshot => {
              // Get the image URL
              return snapshot.ref.getDownloadURL();
            })
            .then(url => {
              // return m.currentlyIn.currentDoc.doc(doc.id).update({imageURL: url});
              return m.currentlyIn.currentDoc.collection("categories").doc(doc.id).update({imageURL: url});
            })
            .then(() => {
              console.log('Inventory updated');
            })
            .catch(error => {
              console.error('Error adding image: ', error);
            });
        })
        .catch((error) => {
          console.error("Error", error);
        });

    }
      //   TODO: Notify if failed, etc
  }

  function checkForNotices(asData){
    // TODO: Also trigger for add
    console.log("in checkForNotices()");

    // const dataPush = doc.data();
    // dataPush.docId = doc.id;
    console.log("checkForNotices Data", asData);

    if(asData.numInStock === 0){
    // .doc(createdAuthAccount.user.uid).set(newAccount)

      notifications.doc(asData.docId).set(
          {
            level: "out_of_stock",
            docId: "GET_WORKING",
            title: asData.title,
            numInStock: asData.numInStock,
            reorderLevel: asData.reorderLevel,
            lastUpdated: asData.lastUpdated,
          }
        )
        .then((docRef) => {

        })
    }

    // return doc;
    return asData;
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

