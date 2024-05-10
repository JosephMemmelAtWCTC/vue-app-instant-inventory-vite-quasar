import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import { inventory, auth, storage } from 'src/models/Firebase.js'
import Category from "src/models/Category";
import Product from "src/models/Product";


export default function InventoryCollection(arr = []) {
  let currentInventory = inventory;


    arr.add = function (item) {
      const newItem = new InventoryItem(item);
        this.push(newItem);

        // return this for chaining
        return this;
    }

    arr.remove = function (item) {
      console.log("arr.remove = ", item);
      this.splice(this.indexOf(item), 1)
      return this;
    }

    arr.delete = function (item) {
      currentInventory.collection(item.product? "products" : "categories")
        .doc(item.docId).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }

    arr.removeAllOfType = function(type){
      for(let i = 0; i < this.length; i++){
        const element = arr[i];
        // console.log("element", element);
        if(element.constructor.type === type){
          // console.log("removing...");
          arr.remove(element);
          i--;
        }
      }
    }

    arr.addNew = function (newItem) {
      // this.add(newItem);

      console.log("newItem in this.add(newItem) =",newItem);

      // const asData = newItem.getAsData();
      // this.splice(this.length-1, 1);
      //
      // currentInventory.collection(asData.inventoryType===STORAGE_TYPES.CATEGORY ? "categories" : "products") //TODO: move to store name inside instead of calculate here
      //   .add(asData)
      //   .then(function(docRef) {
      //     console.log("docRef", docRef);
      //
      //     // docRef.id
      //   })
      //   .catch(function(error) {
      //     console.error("Error ", error);
      //
      //     // TODO: let the user know
      //   });
    }

    arr.update = function (oldNew){
      const oldVersion = oldNew[0];
      const newVersion = oldNew[1];
      console.log("<<<<<<", oldVersion);
      console.log(">>>>>>", newVersion);

      //   TODO: Only send updates to changed fields

      const diffrences = {};
      for(const fieldKey in newVersion){
        if(oldVersion[fieldKey] !== newVersion[fieldKey]) {
          diffrences[fieldKey] = newVersion[fieldKey];
        }
      }

      console.log("<><><>", diffrences);
      // console.log("to", oldVersion.constructorSaved.name, STORAGE_TYPES.CATEGORY.toLowerCase());

      currentInventory.collection(oldVersion.constructorSaved.name.toLowerCase()===STORAGE_TYPES.CATEGORY ? "categories" : "products")
        .doc(oldVersion.docId)
        .update(diffrences)


    //   TODO: Notify if failed, etc

    }

    function onInventorySnapshot(categoriesQuerySnapshot, objectConstructor){
      console.log("Start of onInventorySnapshot");
    // TODO: Move to inventoryCollection
      arr.removeAllOfType(objectConstructor.type);
      const data = [];
      categoriesQuerySnapshot.forEach(doc => {
        const dataPush = doc.data();
        dataPush.docId = doc.id;
        data.push(dataPush);
      });
      data.forEach((inventoryData, i) => {
        console.log("inventoryItemData, i", inventoryData);
        const found = new objectConstructor(inventoryData);
        // const foundCategory = new Category(data.title, data.description, data.imageURL, data.items);
        arr.add(found);
        console.log("foundItem", found)
      });
    }


    let categoriesCollection = null;
    let productsCollection = null;

    arr.setFirebaseDoc = function(path){
      console.log("Settings firebaseDoc to ", path);

      if(path){
        categoriesCollection = currentInventory.collection('categories');
        productsCollection = currentInventory.collection('products');
      }else{
        categoriesCollection = currentInventory.collection('categories');
        productsCollection = currentInventory.collection('products');
      }

      categoriesCollection
        .onSnapshot(snapshot => {
          onInventorySnapshot(snapshot, Category);
        })
      productsCollection
        .onSnapshot(snapshot => {
          onInventorySnapshot(snapshot, Product);
        })
    }

    arr.navigateTo = async function(docId, navigationType){
      if(navigationType === "relative"){
        // categoriesCollection.doc(docId).get().then(docRef => {
        //   console.log("relative docRef = ", docRef.data());

        currentInventory = categoriesCollection.doc(docId)

        currentInventory.get().then(document => {
          arr.breadCrumbs = {
            path: document.data().title,
          }
        });


        currentInventory.collection('categories')
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                console.log("docdata:", doc.data());
              });
              onInventorySnapshot(snapshot, Category);
            })
            .catch(error => {
              return
            });
          // })
          // .catch(error => {
          //   console.error("Error getting document:", error);
          // });
      }
    }

    arr.breadCrumbs = {
        path: currentInventory.title,
    }








    arr.updateOrAddValue = function (itemOld, itemNew) {
        if(typeof itemOld === 'undefined'){
            this.add(itemNew);
            return;
        }

        console.log("updateValue called",this.filter(i => i.title === itemOld.title));

        // FindIndex works for some reason over indexOf & filter
        const existingIndex = this.findIndex(i => i.title === itemOld.title);
        if(existingIndex === -1){
            // if(itemNew.itemConstructorType === ""){
            itemNew = Object.assign(itemNew.constructor, itemNew);
            // }
            console.log("arr.add(itemNew);", itemNew);
            // arr.add(Object.assign(new Category(), itemNew));
            arr.add(itemNew);
        }else{
            this[existingIndex] = itemNew;
        }
        return this;
    }

    arr.filterByType = function(types){
      const filteredArray = this.filter(i => types.includes(i.constructor.name.toLowerCase()));
      console.log("types = ", types);
      return filteredArray;
    }

    return arr;
}
