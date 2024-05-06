import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import { inventory, auth, storage } from 'src/models/Firebase.js'


export default function InventoryCollection(arr = []) {


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
      inventory.collection(item.product? "products" : "categories")
        .doc(item.docId).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }

    arr.removeAllOfType = function(type){
      for(let i = 0; i < this.length; i++){
        const element = arr[i];
        console.log("element", element);
        if(element.constructor.type === type){
          console.log("removing...");
          arr.remove(element);
          i--;
        }
      }
    }

    arr.addNew = function (newItem) {
      this.add(newItem);

      console.log("newItem in this.add(newItem) =",newItem);

      const asData = newItem.getAsData();
      this.splice(this.length-1, 1);

      inventory.collection(asData.inventoryType===STORAGE_TYPES.CATEGORY ? "categories" : "products") //TODO: move to store name inside instead of calculate here
        .add(asData)
        .then(function(docRef) {
          console.log("docRef", docRef);

          // docRef.id
        })
        .catch(function(error) {
          console.error("Error ", error);

          // let the user know...
          // TODO: let the user know
        });
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

      inventory.collection(oldVersion.constructorSaved.name.toLowerCase()===STORAGE_TYPES.CATEGORY ? "categories" : "products")
        .doc(oldVersion.docId)
        .update(diffrences)


    //   TODO: Notify if failed, etc

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
