import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import {
  inventory,
  auth,
  storage,
  db,
  INVENTORY_DOC_KEY,
  notifications, records, searches_titles, searches_productIds, storageInventoryPictures
} from 'src/models/Firebase.js'
import Category from "src/models/Category";
import Product from "src/models/Product";
import InventoryCollectionProper from "src/models/InventoryCollectionProper";
import {Record, RECORD_TYPES, RECORD_ONS} from "src/models/Record";
import StringSearch from "src/models/StringSearch";
import {collection, query, where, getDocs} from "firebase/firestore";
import {/*generateNGrams,*/ generateSaveSubstrings, sanitize} from "src/models/NGramController";

function InventoryExplorer() {

  const m = {
    // getAllNumOfCategories: async function () {
    //   return await getAllNumOfCategories;
    // },
    navigateTo: navigateTo,
    refresh: refresh,
    currentlyIn: {
      currentDocId: null,
      breadcrumbs: [],
      currentDoc: inventory,
      libraryCollection: new InventoryCollectionProper(),
      addNew: addNew,
      remove: remove,
    },
    setUser: setUser,
    logRecord: logRecord,
    searchTest: searchTest,
  }


    let fullUserDetails = null;
    function setUser(fullUserDetailsSet){
      fullUserDetails = fullUserDetailsSet;
    }

    function logRecord(recordType, recordOn, forID, forName, changes){
      const record = new Record(recordType, recordOn, forID, forName, fullUserDetails.email, fullUserDetails.uid, changes)
      return records.add(record.getAsData());
    }

    async function searchTest(substring) {
      const results = [];
      substring = sanitize(substring);

      console.log(generateSaveSubstrings(substring, STORAGE_TYPES.PRODUCT_GENERIC));


      if(substring.length > 0){
        // let possibleNgrams = generateNGrams(substring, STORAGE_TYPES.PRODUCT_GENERIC);
        // console.log("substring", substring, possibleNgrams)
        let searchForSubstrings = [];
        searchForSubstrings = generateSaveSubstrings(substring, STORAGE_TYPES.PRODUCT_GENERIC)
        const query = searches_titles.where("searchTerms", "array-contains-any", searchForSubstrings);
        // return await query.get().then((querySnapshot) => {
        const querySnapshot = await query.get();
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          results.push(new StringSearch(doc.id, doc.data()));
        })
        console.log("results", results.length, results);
        return results;
        // .catch((error) => {
        //   console.log("Error getting documents: ", error);
        // });
      }else{
        return [];
      }

    }



    function updateSearch(data, doc, breadcrumbs){
      console.log("function updateSearch(data)", data, breadcrumbs);

      let newSearchItem = new StringSearch(doc.id,{
          title: data.title,
          searchTerms: [],
          itemType: STORAGE_TYPES.PRODUCT_GENERIC,
          parentLocation: doc.ref.parent.path,
          breadcrumbs: breadcrumbs,
          parentCategoryName: doc.ref.parent.id,
          imageURL: data.imageURL,
        });

        //Add to search lists
        // Title
        newSearchItem.searchTerms = generateSaveSubstrings(data.title, STORAGE_TYPES.PRODUCT_GENERIC);
        // console.log("!!3333!!",newSearchItem.getAsData());
        const saveAsData = newSearchItem.getAsData();
        searches_titles.doc(saveAsData.id).set(saveAsData);

        // // Product Id
        // newSearchItem.searchTerms = generateNGrams(data.productId, STORAGE_TYPES.PRODUCT_GENERIC);
        // searches_productIds.add(newSearchItem);



    }

    function refresh(){
    //   TODO: Implement
    }

    function navigateTo(navToParams){
      console.log("navigateTo (inventoryExplorer): navToParams:", navToParams);
      let navType = navToParams.navType;
      let docId = navToParams.docId;
      let breadcrumbs;
      let generatedFullPath = "/inventory";

      if(navType === "absolute"){
        if(navToParams.breadcrumbs){
          breadcrumbs = navToParams.breadcrumbs
        }else{
          breadcrumbs = [];
        }

        // Generate path from breadcrumbs
        // TODO: Split up to avoid checking each time if first or switching up "inventory" & "category"
        for (let i = 0; i < breadcrumbs.length; i++) {
          generatedFullPath += `${i===0?'':'/categories'}/`+breadcrumbs[i].docId;
        }
        if(breadcrumbs.length === 0 && docId.length > 0){
          generatedFullPath += `/${docId}`;
        }
        m.currentlyIn.breadcrumbs = breadcrumbs;
        m.currentlyIn.currentDoc = db.doc(generatedFullPath);


      }else if(navType === "relative"){
        if(navToParams.breadCrumbIndex){ // Going into the breadcrumbs based on index
          m.currentlyIn.breadcrumbs = m.currentlyIn.breadcrumbs.slice(0, navToParams.breadCrumbIndex+1)

          let pathStr = m.currentlyIn.currentDoc.path;
          // find the nth instance
          // let m.currentlyIn.currentDoc.path.match((/\//g)).length; //https://stackoverflow.com/a/881111
          let nthIndex = 0;
          for(let i = 0; i < navToParams.breadCrumbIndex*2; i++){
            nthIndex = pathStr.indexOf('/', nthIndex+1);
          }

          pathStr = pathStr.substring(0, nthIndex);
          m.currentlyIn.currentDoc = db.doc(pathStr);
          console.log("}{}{}{}{}{}{}",pathStr);

        }else{ // Going into child
          m.currentlyIn.currentDoc = m.currentlyIn.currentDoc.collection("categories").doc(docId);
        }
      }else{
        console.error('navType was else! ', navType);
      }

      // m.currentlyIn.breadcrumbs = navToParams.breadcrumbs.splice(0,parentLocation.match((/\//g)).length - 3 ); //https://stackoverflow.com/a/881111
        //
        // }else{
        //   console.log("parentLocation B");
        //   // Generate breadcrumbs
        //   console.log("parentLocation breadcrumbs",parentLocation);
        //   const generatedBreadcrumbs = parentLocation.replaceAll("/categories","").split("/");
        //   generatedBreadcrumbs.shift(); // Remove first ()
        //   generatedBreadcrumbs[generatedBreadcrumbs.length - 1] += "/";
        //
        //   m.currentlyIn.breadcrumbs = generatedBreadcrumbs;
        // }
        // if(navToParams.docId){
        //   navToParams = navToParams.docId;
        // }else{
        // }
        // console.log("navigateTo (inventoryExplorer): navToParams:", navToParams);
        // if(!navToParams){
        //   console.log("AAAAA",m.currentlyIn.breadcrumbs)
        //   navToParams = m.currentlyIn.breadcrumbs[m.currentlyIn.breadcrumbs.length-1];
        //   // m.currentlyIn.breadcrumbs = m.currentlyIn.breadcrumbs.pop();
        //   console.log("BBBBB",m.currentlyIn.breadcrumbs)
        //
        // }

      // console.log("navigateTo (inventoryExplorer): navToParams:", navToParams);
      // if(navToParams === m.currentlyIn.currentDocId) {
      //   console.log("FAILING: Tried to duplicate category/id path");
      //   // return "FAILING: Tried to duplicate category/id path";
      //   return Promise.reject("FAILING: Tried to duplicate category/id path");
      // }


      return m.currentlyIn.currentDoc.get().then(snapshot =>{
        console.log("navigateTo (inventoryExplorer): m.currentlyIn.currentDoc.path:", m.currentlyIn.currentDoc.path);
        return m.currentlyIn.currentDoc.get()
          .then(doc => {
            console.log("doc.data()",doc.data())
            if(navType === "relative" && !navToParams.breadCrumbIndex && doc.data()){
              m.currentlyIn.breadcrumbs.push({title: doc.data().title, docId: doc.id});
            }else{
              console.log("DOC!!!!!!!!!!!!!!!!!!!!!!!!", doc);
            }

            // const dataPush = doc.data();
            // dataPush.navToParams = doc.id;
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
                .then(snapshot => {
                  return takeCareOfCurrentSnapshot(snapshot);
                })
                .then(() => {
                  return m.currentlyIn.currentDoc.collection("categories").onSnapshot(snapshot => {
                    takeCareOfCurrentSnapshot(snapshot);
                  });
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
      });
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
      logRecord(RECORD_TYPES.DELETE, RECORD_ONS.INVENTORY, item.docId, item.title, {
        kind: item.hasOwnProperty('items')? STORAGE_TYPES.CATEGORY : STORAGE_TYPES.PRODUCT_GENERIC,
      });

      return "Document successfully deleted!"
    }).catch((error) => {
      console.error("Error removing document: ", error);
      return "Error removing document: " + error;
    })
    .then(() => {
    //   Remove image document
      storageInventoryPictures.child(item.docId).delete().then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
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
          logRecord(RECORD_TYPES.UPDATE, RECORD_ONS.INVENTORY, oldVersion.docId, newVersion.title, {
            changedStockLevel: newVersion.numInStock - oldVersion.numInStock,
          });
          return "Ready for update completed"
        })
    }else{
      const newItem = new InventoryItem(oldNew);
      // debugger
      // oldNew = Object.assign(oldNew.constructorSaved, oldNew);

      console.log("newItem = new InventoryItem(oldNew)", newItem);

      newItem.createdOn = Date.now();


      let imgFile = null;
      console.log("newItem.inventoryType", newItem.inventoryType, STORAGE_TYPES.PRODUCT_GENERIC)

      // if(newItem.inventoryType === STORAGE_TYPES.PRODUCT_GENERIC){
      // if(newItem.constructorSaved.type === STORAGE_TYPES.PRODUCT_GENERIC){
      if(newItem.product){

        console.log("newItem.inventor2yType", newItem.inventoryType, STORAGE_TYPES.PRODUCT_GENERIC)

        if(newItem.product.reorderLevel === undefined){
          newItem.reorderLevel = 0;
        }

        imgFile = newItem.product.imageURL;
        newItem.product.imageURL = null;
      }

      return m.currentlyIn.currentDoc.collection("categories")
        .add(newItem.getAsData())
        .then((docRef) => {

          if(newItem.inventoryType === STORAGE_TYPES.PRODUCT_GENERIC){
            return checkForNotices(newItem.getAsData());
          }

          return docRef;
        })
        .then((docRef) => {
          return docRef.get();
        })
        .then((doc) => {
          if(imgFile === null){
            return "Not storing img in storage";
          }
          console.log("doc.data());", doc.data());
          return storageInventoryPictures.child(doc.id)

            .put(imgFile)
            .then(snapshot => {
              // Get the image URL
              return snapshot.ref.getDownloadURL();
            })
            .then(url => {
              return m.currentlyIn.currentDoc.collection("categories").doc(doc.id).update({imageURL: url})
                .then(() => {
                  return m.currentlyIn.currentDoc.collection("categories").doc(doc.id).get()
                    .then((updatedDoc => {
                      console.log("updatedDoc", updatedDoc.data());
                      const updatedData = updatedDoc.data();
                      // Fire and forget, TODO: Make not forget
                      logRecord(RECORD_TYPES.NEW, RECORD_ONS.INVENTORY, updatedData.id, updatedData.forName, {
                        added: updatedData.numInStock,
                        kind: imgFile === null? STORAGE_TYPES.CATEGORY : STORAGE_TYPES.PRODUCT_GENERIC,
                      });
                      updateSearch(updatedData, updatedDoc, m.currentlyIn.breadcrumbs);
                      return "";
                  }))
                })})
            .catch(error => {
              console.error('Error adding image: ', error);
              return "Error adding image: "+error;
            });
        })
        .catch((error) => {
          console.error("Error", error);
          return "Error: "+error;
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
            // docId: "GET_WORKING",
            title: asData.title,
            numInStock: asData.numInStock,
            reorderLevel: asData.reorderLevel,
            lastUpdated: asData.lastUpdated,
            image: asData.imageSrc,
          }
        )
        .then((docRef) => {
          return docRef;
        })
    }else if(asData.numInStock <= asData.reorderLevel){
      notifications.doc(asData.docId).set(
        {
          level: "reorder_level_reached",
          // docId: "GET_WORKING",
          title: asData.title,
          numInStock: asData.numInStock,
          reorderLevel: asData.reorderLevel,
          lastUpdated: asData.lastUpdated,
          image: asData.imageSrc,
        }
      )
      .then((docRef) => {
        return docRef;
      })
    }else{
      notifications.doc(asData.docId).delete()
        .then(() => {
          console.log("Notification deleted");
          return "Notification deleted";
        })
        .catch((error) => {
          console.error("Error deleting notification", error);
          return "Error"+error;
        });

    }

    // return doc;
    return asData;
  }


  return m;
}

export default InventoryExplorer;

