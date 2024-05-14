// "Generic" class to extend for product types
import {STORAGE_TYPES} from "src/models/InventoryItem";

export default class Product {
  static type = STORAGE_TYPES.PRODUCT_GENERIC;
  static cardDetailsComponent = "EditItemCard";

  constructor(title, description, imageURL, productId, numInStock, docId, reorderLevel = 0) {
    this.constructorSaved = this.constructor;


    if(typeof title === "object"){//Check if sending via data
      docId        = title.docId;
      description  = title.description;
      imageURL     = title.imageURL;
      productId    = title.productId;
      numInStock   = title.numInStock;
      reorderLevel = title.reorderLevel;
      // REMEMBER, ALWAYS NEEDS TO BE LAST
      title       = title.title;
      console.log("title.numInStock",title);
    }

    this.title        = title;
    this.description  = description;
    this.imageSrc     = imageURL;
    this.productId    = productId;
    this.numInStock   = numInStock;
    this.docId        = docId;
    this.reorderLevel = reorderLevel;
  }

}
