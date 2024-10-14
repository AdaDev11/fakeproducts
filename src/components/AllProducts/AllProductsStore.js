import { action, makeAutoObservable, observable } from "mobx";

class AllProductsStore {
    products = []

    constructor() {
        makeAutoObservable(this, {
            products: observable,
            allFetch: action,
        });
    }

    allFetch() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                this.products = json;
                console.log(json)
            })
            .catch((error) => console.error("Failed to fetch products:", error));
    }

}

const allProductsStore = new AllProductsStore();
export default allProductsStore;