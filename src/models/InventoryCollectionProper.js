import {InventoryItem, STORAGE_TYPES } from "src/models/InventoryItem.js"
import { inventory, auth, storage } from 'src/models/Firebase.js'
import Category from "src/models/Category";
import Product from "src/models/Product";


export default function InventoryCollectionProper(arr = []) {
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


    arr.updateOrAddValue = function (itemOld, itemNew) {
        if(typeof itemOld === 'undefined'){
            this.add(itemNew);
            return;
        }

        console.log("updateValue called", this.filter(i => i.title === itemOld.title));

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
      const filteredArray = this.filter(i => types.includes(i.constructor.type.toLowerCase()));
      console.log("types = ", types);
      return filteredArray;
    }

    return arr;
}
