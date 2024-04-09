export default function InventoryItem(item){
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

    return item;
}