// "Generic" class to extend for product types
export default class Product {
    constructor(title, description, imageURL, productId) {
        this.title        = title;
        this.description  = description;
        this.imageSrc     = imageURL;
        this.productId    = productId;
    }
}