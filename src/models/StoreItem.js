export default class StoreItem {
    static type = "StoreItem";
    static cardDetailsComponent = "editItemCard";

    product = null;

    constructor(product, inStockLevel, reorderLevel, lastUpdated= Date.now()) {
        this.product      = product;

        this.inStockLevel = inStockLevel;
        this.reorderLevel = reorderLevel;

        this.lastUpdated  = lastUpdated;
    }

    get hasLowStock(){
        return this.inStockLevel <= this.reorderLevel;
    }
}