import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import trainingStore from './trainingStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Training = observer(() => {

    useEffect(() => {
        trainingStore.getFetch();
        console.log(trainingStore.products);
    }, []);

    return (
        <div className="container-fluid">
            <div className="row contentDiv">
                {trainingStore.products && trainingStore.products.length > 0 ? 
                (
                    trainingStore.products.map((product) => (
                        <div key={product.id} className="col-md-4 productDiv" style={{ width: '240px', height: '400px', backgroundColor: '#5678', padding: '12px', margin: '12px', border: '1px solid #5678', borderRadius: '10px' }}>
                            <div className="card">
                                <img src={product.image} className="card-img-top" style={{ width: '10rem', height: '10rem' }} />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ width: '200px', height: '100px' }}>{product.title}</h5>
                                    <p className="card-text">{product.category}</p>
                                    <p className="card-text">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No products available</h1>
                )}
            </div>

        </div>
    );
});

export default Training;
