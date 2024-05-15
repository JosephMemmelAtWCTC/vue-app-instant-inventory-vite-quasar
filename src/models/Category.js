import {STORAGE_TYPES} from "src/models/InventoryItem";

export default class Category { //Rename to Group?
        static type = STORAGE_TYPES.CATEGORY;
        static cardDetailsComponent = "EditCategoryCard";

        title = "";
        description = "";
        imageSrc = "";

        items = [];//TODO: Store titles of all children products when added

        createdOn = -1;


        constructor(title, description, imageURL, docId, items = [], createdOn) {
            this.constructorSaved = this.constructor;

            if(typeof title === "object"){//Check if sending via data
              description = title.description;
              imageURL    = title.imageURL;
              items       = [];
              docId       = title.docId;
              createdOn   = title.createdOn;
              // REMEMBER, ALWAYS NEEDS TO BE LAST
              title       = title.title;
            }

            this.title       = title;
            this.description = description;
            this.imageSrc    = imageURL;
            this.items       = this.items.concat(items);
            this.docId       = docId;
            this.createdOn   = createdOn;
        }
}
