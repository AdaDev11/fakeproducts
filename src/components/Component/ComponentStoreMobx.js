import { action, makeAutoObservable, observable } from "mobx";

class StoreLimit {
    products = [];

    constructor() {
        makeAutoObservable(this, {
            products: observable,
            limitFetch: action,
        });
    }

    limitFetch() {
        fetch('https://fakestoreapi.com/products?limit=5')
            .then(res => res.json())
            .then(json => {
                this.products = json;
                console.log(json)
            })
            .catch((error) => console.error("Failed to fetch products:", error));
    }

}

const storeLimit = new StoreLimit();
export default storeLimit;