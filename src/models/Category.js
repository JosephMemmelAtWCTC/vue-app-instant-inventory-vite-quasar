import {STORAGE_TYPES} from "src/models/InventoryItem";

export default class Category { //Rename to Group?
        static type = STORAGE_TYPES.CATEGORY;
        static cardDetailsComponent = "EditCategoryCard";

        title = "";
        description = "";
        imageSrc = "";

        items = [];


        constructor(title, description, imageURL, items = []) {
            this.constructorSaved = this.constructor;

            if(typeof title === "object"){//Check if sending via data
              description = title.description;
              imageURL    = title.imageURL;
              items       = [];
              title       = title.title;
            }

            this.title       = title;
            this.description = description;
            this.imageSrc    = imageURL;
            this.items       = this.items.concat(items);
        }

        // get hasLowStock(){
        //     for(let i = 0; i < this.items.length; i++) {
        //         if(this.items[i].hasLowStock){
        //             return true;
        //         }
        //     //     TODO: Make it store just a copy and have a different way to update
        //     }
        //     return false;
        // }
        //
        // get itemCount(){
        //     let count = 0;
        //     for(const item in this.items) {
        //         count += item.itemCount;
        //     }
        //     return count;
        // }
        // get uniqueItemCount(){
        //     let count = 0;
        //     for(const item in this.items) {
        //         count += item.uniqueItemCount;
        //     }
        //     return count;
        // }
}
