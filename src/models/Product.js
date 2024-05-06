// "Generic" class to extend for product types
import {STORAGE_TYPES} from "src/models/InventoryItem";

export default class Product {
  static type = STORAGE_TYPES.PRODUCT_GENERIC;
  static cardDetailsComponent = "EditItemCard";

  constructor(title, description, imageURL, productId) {
      this.constructorSaved = this.constructor;


      if(typeof title === "object"){//Check if sending via data
        description = title.description;
        imageURL    = title.imageURL;
        productId   = title.productId;
        title       = title.title;
      }

        this.title        = title;
        this.description  = description;
        this.imageSrc     = imageURL;
        this.productId    = productId;
    }

}
