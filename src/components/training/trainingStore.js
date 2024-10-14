import { action, makeAutoObservable, observable } from "mobx";

class TrainingStore {
    products = [];

    constructor() {
        makeAutoObservable(this, {
            products: observable,
            getFetch: action,
        });
    }

    getFetch() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => this.products = json)
            .catch((error) => console.error("Failed to fetch products:", error));
    }

}

const trainingStore = new TrainingStore();
export default trainingStore;