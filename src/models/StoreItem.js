export default class StoreItem {
    static type = "StoreItem";
    static cardDetailsComponent = "EditItemCard";

    product = {};

    title = "";
    description = "";
    imageSrc = "";

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
