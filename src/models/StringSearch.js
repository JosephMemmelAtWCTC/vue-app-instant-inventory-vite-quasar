import {STORAGE_TYPES} from "src/models/InventoryItem";

export default class StringSearch{
  static type = STORAGE_TYPES.SEARCH_PRODUCT_GENERIC;
  static cardDetailsComponent = "GotoItemCard";

  constructor(id, data) {
    this.id = id;
    this.forId = data.forId ?? '';
    this.searchTerms = data.searchTerms ?? [];
    this.itemType = data.itemType ?? '';
    this.parentLocation = data.parentLocation ?? '';
    this.parentCategoryName = data.parentCategoryName ?? '';
    this.imageURL = data.imageURL;
    this.title = data.title ?? '';
    this.cardDetailsComponent = "GotoItemCard";
    this.constructorSaved = this.constructor;
//TODO: Make better


    this.getAsData = ()=>{
      // console.log("!!!!!!!!!!!!!!!!", this);
      return {
        id: this.id,
        // forId: this.forId,
        searchTerms: this.searchTerms,
        itemType: this.itemType,
        parentLocation: this.parentLocation,
        parentCategoryName: this.parentCategoryName,
        imageURL: this.imageURL,
        title: this.title,
        cardDetailsComponent: this.cardDetailsComponent,
        // constructorSaved: this.constructorSaved,
      }
    }
  }

}
