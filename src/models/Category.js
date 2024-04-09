export default class Category { //Rename to Group?
        static type = "Category";
        static cardDetailsComponent = "EditCategoryCard";

        items = [];
        title = "";

        constructor(title, description, imageURL, items = []) {
            this.constructorSaved = this.constructor;

            this.title       = title;
            this.description = description;
            this.imageSrc    = imageURL;
            this.items       = this.items.concat(items)
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