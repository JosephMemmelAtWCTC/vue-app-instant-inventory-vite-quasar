export default class StoreItem {
    static type = "StoreItem";
    static cardDetailsComponent = "EditItemCard";

    product = {};

    title = "";
    description = "";
    imageSrc = "";

    constructor(product, numInStock, reorderLevel, lastUpdated= Date.now()) {

        this.product      = product;

        this.numInStock = numInStock;
        this.reorderLevel = reorderLevel;

        this.lastUpdated  = lastUpdated;
    }

    get hasLowStock(){
        return this.numInStock <= this.reorderLevel;
    }
}
