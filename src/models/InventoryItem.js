export const STORAGE_TYPES = {
  PRODUCT_GENERIC: "generic_product",
  CATEGORY: "category"
};
export function InventoryItem(item){

    const STOCKED_LEVEL_STATUSES = {
        UNSET       : 'Unset',
        IN_STOCK    : 'Stocked',
        LOW_STOCK   : 'Under refill level',
        OUT_OF_STOCK: '0 items remaining'
        //Overstocked?
    };

    const REORDER_MESSAGE_THRESHOLD = {
        LOW_STOCK   : 'Under refill level',
        OUT_OF_STOCK: '0 items remaining',
        NONE        : 'No warning',
        //Overstocked?InventoryItem.js
    };

    // set the default status
    item.reorderMessageWhen = REORDER_MESSAGE_THRESHOLD.LOW_STOCK;

    // methods

    //Update message thresholds

    item.needsMessage = function(){
        switch(this.reorderMessageWhen){
            case REORDER_MESSAGE_THRESHOLD.LOW_STOCK:
                return item.hasLowStock;
            case REORDER_MESSAGE_THRESHOLD.OUT_OF_STOCK:
                return false;
            case REORDER_MESSAGE_THRESHOLD.NONE:
            default:
                return false;
        }
        // return  === STOCKED_LEVEL_STATUSES.LOW_STOCK || STOCKED_LEVEL_STATUSES.OUT_OF_STOCK;
    }

    item.getAsData = function(){

      const dataItem = {
        reorderMessageCode: this.reorderMessageWhen,
        inventoryType: item.product? STORAGE_TYPES.PRODUCT_GENERIC: STORAGE_TYPES.CATEGORY,
      }

      if(dataItem.inventoryType === STORAGE_TYPES.CATEGORY){
        console.log("item = ",item);
        dataItem.description = item.description;
        dataItem.imageURL    = item.imageSrc;
        dataItem.items       = [];
        dataItem.title       = item.title;
      }

      return dataItem;
    }

    return item;
}

export default {InventoryItem, STORAGE_TYPES}
