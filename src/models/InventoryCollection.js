import InventoryItem from "src/models/InventoryItem.js"
import Category from "src/models/Category";
import { inventory, auth, storage } from 'src/models/Firebase.js'


export default function InventoryCollection(arr = []) {

    arr.add = function (item) {
      const newItem = new InventoryItem(item);
        this.push(newItem);

      inventory
        .add(newItem)
        .then(function(docRef) {
          console.log("Document written:", docRef);

          // docRef.id
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);

          // let the user know...
          // TODO: let the user know
        });

        // return this for chaining
        return this;
    }

    arr.remove = function (item) {
        console.log("arr.remove = ", item);
        this.splice(this.indexOf(item), 1)

        return this;
    }

    arr.addNew = function (newItem) {
      this.add(newItem);
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
      const filteredArray = this.filter(i => types.includes(i.constructor.name));
      // this.forEach(i => console.log(types.includes(i.constructor.name)));
      this.forEach(i => console.log(i.constructor.name));
      console.log("types = ", types);
      return filteredArray;
    }

    return arr;
}
