import React from "react";
import storeLimit from "./ComponentStoreMobx";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import './Component.css';

const Component = observer(() => {

    useEffect(() => {
        storeLimit.limitFetch();
        console.log("storeLimit " + storeLimit.limitFetch());
        console.log('storeLimit products ' + storeLimit.products);
    }, []);

    return (
        <div className="container-fluid">

            <div className="row contentDiv">

                {storeLimit.products && storeLimit.products.length > 0 ? (
                    storeLimit.products.map((product) => (
                        <div key={product.id} className="col-md-4 productDiv" style={{ width: '240px', height: '400px', backgroundColor: '#5678', padding: '12px', margin: '12px', border: '1px solid #5678', borderRadius: '10px' }}>
                            <div className="card">
                                <img src={product.images} className="card-img-top" style={{ width: '10rem', height: '10rem' }} />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ width: '200px', height: '100px' }}>{product.title}</h5>
                                    <p className="card-text">{product.category}</p>
                                    <p className="card-text">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}

            </div>

        </div>
    )
})

export default Component;